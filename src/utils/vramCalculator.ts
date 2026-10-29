/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - GPU VRAM & AI Compute Calculator
 */

export type PrecisionFormat = 'FP16' | 'BF16' | 'INT8' | 'Q5_K_M' | 'Q4_K_M' | 'Q3_K_M';

export interface VRAMEstimateRequest {
  parameterCountBillion: number; // e.g. 7 for 7B, 70 for 70B
  precision: PrecisionFormat;
  contextWindowTokens: number;   // e.g. 2048, 4096, 8192, 32768
  batchSize: number;             // e.g. 1, 4, 8
  isTrainingOrFineTuning?: boolean; // fine-tuning adds optimizer states & activations
  trainingMethod?: 'full' | 'lora' | 'qlora' | 'none';
  targetVramGb: number;          // user's GPU VRAM in GB
}

export interface VRAMEstimateResult {
  weightMemoryGb: number;
  kvCacheMemoryGb: number;
  activationMemoryGb: number;
  cudaContextOverheadGb: number;
  trainingOverheadGb: number;
  totalVramRequiredGb: number;
  availableVramGb: number;
  freeVramGb: number;
  status: 'optimal' | 'marginal' | 'oom';
  recommendation: string;
}

const BYTES_PER_WEIGHT: Record<PrecisionFormat, number> = {
  FP16: 2.0,
  BF16: 2.0,
  INT8: 1.05,
  Q5_K_M: 0.65,
  Q4_K_M: 0.55,
  Q3_K_M: 0.45,
};

/**
 * Calculates estimated VRAM requirement with engineering precision.
 */
export function calculateVramRequirement(params: VRAMEstimateRequest): VRAMEstimateResult {
  const {
    parameterCountBillion,
    precision,
    contextWindowTokens,
    batchSize,
    isTrainingOrFineTuning = false,
    trainingMethod = 'none',
    targetVramGb,
  } = params;

  // 1. Model Weights Memory: params * bytes_per_weight
  const bytesPerWeight = BYTES_PER_WEIGHT[precision] || 2.0;
  const rawWeightGb = (parameterCountBillion * 1e9 * bytesPerWeight) / (1024 ** 3);
  const weightMemoryGb = Math.round(rawWeightGb * 100) / 100;

  // 2. KV Cache Memory (Key-Value Cache for Generation)
  // Approximate standard GQA / MHA: ~0.065 MB per token per batch in FP16 for ~7B
  const kvFactor = parameterCountBillion > 30 ? 0.12 : 0.065;
  const rawKvMb = kvFactor * contextWindowTokens * Math.max(1, batchSize);
  const kvCacheMemoryGb = Math.round((rawKvMb / 1024) * 100) / 100;

  // 3. Activation Memory
  const rawActGb = Math.max(0.5, (contextWindowTokens / 4096) * (batchSize * 0.4));
  const activationMemoryGb = Math.round(rawActGb * 100) / 100;

  // 4. CUDA Runtime & PyTorch context overhead
  const cudaContextOverheadGb = 1.25;

  // 5. Training / Fine-tuning overhead (AdamW states, gradients)
  let trainingOverheadGb = 0;
  if (isTrainingOrFineTuning && trainingMethod !== 'none') {
    if (trainingMethod === 'full') {
      // Full fine-tuning requires 4x-6x model size (optim states + gradients)
      trainingOverheadGb = Math.round(weightMemoryGb * 4.0 * 100) / 100;
    } else if (trainingMethod === 'lora') {
      // LoRA stores frozen base model + low-rank adapter optim states
      trainingOverheadGb = Math.round(weightMemoryGb * 0.45 * 100) / 100;
    } else if (trainingMethod === 'qlora') {
      // QLoRA 4-bit base + 16-bit LoRA adapter states
      trainingOverheadGb = Math.round((weightMemoryGb * 0.35 + 1.2) * 100) / 100;
    }
  }

  const totalVramRequiredGb = Math.round(
    (weightMemoryGb + kvCacheMemoryGb + activationMemoryGb + cudaContextOverheadGb + trainingOverheadGb) * 100
  ) / 100;

  const freeVramGb = Math.round((targetVramGb - totalVramRequiredGb) * 100) / 100;

  let status: 'optimal' | 'marginal' | 'oom' = 'optimal';
  let recommendation = 'Configuration fits within memory headroom for stable inference.';

  if (freeVramGb < 0) {
    status = 'oom';
    recommendation = `CUDA Out of Memory! Required ${totalVramRequiredGb} GB exceeds available ${targetVramGb} GB by ${Math.abs(freeVramGb)} GB. Lower batch size, reduce context length, switch to Q4_K_M quantization, or enable CPU offloading.`;
  } else if (freeVramGb < 1.5) {
    status = 'marginal';
    recommendation = `Marginal headroom (${freeVramGb} GB left). Longer prompts or sudden context growth may trigger CUDA OOM. Consider decreasing context limit or quantization.`;
  }

  return {
    weightMemoryGb,
    kvCacheMemoryGb,
    activationMemoryGb,
    cudaContextOverheadGb,
    trainingOverheadGb,
    totalVramRequiredGb,
    availableVramGb: targetVramGb,
    freeVramGb,
    status,
    recommendation,
  };
}
