/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - GPU VRAM Engineering & AI Optimization Lab
 */

import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext.tsx';
import { calculateVramRequirement, PrecisionFormat } from '../../utils/vramCalculator.ts';
import { 
  Cpu, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Sliders, 
  Layers, 
  Gauge, 
  Zap,
  Info
} from 'lucide-react';

export const GPULaboratory: React.FC = () => {
  const { awardXp } = useAcademy();

  const [paramBillion, setParamBillion] = useState<number>(7);
  const [precision, setPrecision] = useState<PrecisionFormat>('Q4_K_M');
  const [contextTokens, setContextTokens] = useState<number>(4096);
  const [batchSize, setBatchSize] = useState<number>(1);
  const [targetVramGb, setTargetVramGb] = useState<number>(24); // 24GB RTX 4090 default
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [trainingMethod, setTrainingMethod] = useState<'none' | 'lora' | 'qlora' | 'full'>('none');

  const result = calculateVramRequirement({
    parameterCountBillion: paramBillion,
    precision,
    contextWindowTokens: contextTokens,
    batchSize,
    isTrainingOrFineTuning: isTraining,
    trainingMethod,
    targetVramGb,
  });

  const gpuPresets = [
    { label: 'RTX 3060 (12 GB)', vram: 12 },
    { label: 'RTX 4080 (16 GB)', vram: 16 },
    { label: 'RTX 4090 (24 GB)', vram: 24 },
    { label: 'Dual RTX 4090 (48 GB)', vram: 48 },
    { label: 'Apple M3 Max (36 GB)', vram: 36 },
    { label: 'Apple M2 Ultra (128 GB)', vram: 128 },
    { label: 'NVIDIA A100 (80 GB)', vram: 80 },
    { label: '8x H100 SXM5 (640 GB)', vram: 640 },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col font-mono">
      {/* Header */}
      <div className="space-y-1 shrink-0">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-purple-400" />
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
            GPU VRAM Engineering & AI Architecture Lab
          </h1>
        </div>
        <p className="text-xs text-slate-400">
          Precision memory calculations for LLM inference, continuous batching, KV cache sizing, and LoRA fine-tuning.
        </p>
      </div>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto">
        {/* Left Column: Parameter Configuration Sliders (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                MODEL & WORKLOAD PARAMETERS
              </span>
              <span className="text-xs text-purple-400 font-bold">
                {paramBillion}B Parameters
              </span>
            </div>

            {/* Model Size Selector */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Model Family & Size:</span>
                <span className="text-emerald-400 font-bold">{paramBillion} Billion Params</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {[7, 8, 13, 34, 70].map(size => (
                  <button
                    key={size}
                    onClick={() => setParamBillion(size)}
                    className={`py-2 rounded text-xs border font-bold transition-all cursor-pointer ${
                      paramBillion === size
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {size}B
                  </button>
                ))}
              </div>
            </div>

            {/* Precision / Quantization Format */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Weight Quantization Precision:</span>
                <span className="text-cyan-400 font-bold">{precision}</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {(['FP16', 'BF16', 'INT8', 'Q5_K_M', 'Q4_K_M', 'Q3_K_M'] as PrecisionFormat[]).map(p => (
                  <button
                    key={p}
                    onClick={() => setPrecision(p)}
                    className={`py-2 rounded text-[11px] border font-bold transition-all cursor-pointer ${
                      precision === p
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Context Window Length */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Context Window Tokens:</span>
                <span className="text-purple-400 font-bold">{contextTokens.toLocaleString()} tokens</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[2048, 4096, 8192, 16384].map(ctx => (
                  <button
                    key={ctx}
                    onClick={() => setContextTokens(ctx)}
                    className={`py-2 rounded text-xs border font-bold transition-all cursor-pointer ${
                      contextTokens === ctx
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {ctx / 1024}K
                  </button>
                ))}
              </div>
            </div>

            {/* Target Hardware Presets */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Target GPU Hardware Pool:</span>
                <span className="text-amber-400 font-bold">{targetVramGb} GB VRAM</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {gpuPresets.map(preset => (
                  <button
                    key={preset.label}
                    onClick={() => setTargetVramGb(preset.vram)}
                    className={`p-2 rounded text-[10px] border text-left font-bold transition-all cursor-pointer ${
                      targetVramGb === preset.vram
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: VRAM Allocation Telemetry (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Gauge className="w-4 h-4 text-cyan-400" />
                VRAM ALLOCATION METRICS
              </span>
              <span className={`text-xs px-2 py-0.5 rounded font-bold border uppercase ${
                result.status === 'optimal'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : result.status === 'marginal'
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'bg-red-500/20 text-red-400 border-red-500/40'
              }`}>
                {result.status === 'optimal' ? 'OPTIMAL' : result.status === 'marginal' ? 'MARGINAL' : 'CUDA OOM'}
              </span>
            </div>

            {/* Total VRAM Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Total VRAM Consumed:</span>
                <span className="font-bold text-slate-100">
                  {result.totalVramRequiredGb} GB / {result.availableVramGb} GB
                </span>
              </div>
              <div className="h-4 bg-slate-950 rounded-full border border-slate-800 overflow-hidden flex">
                <div 
                  className="bg-emerald-500 h-full transition-all" 
                  style={{ width: `${Math.min(100, (result.weightMemoryGb / result.availableVramGb) * 100)}%` }} 
                  title={`Weights: ${result.weightMemoryGb} GB`}
                />
                <div 
                  className="bg-purple-500 h-full transition-all" 
                  style={{ width: `${Math.min(100, (result.kvCacheMemoryGb / result.availableVramGb) * 100)}%` }} 
                  title={`KV Cache: ${result.kvCacheMemoryGb} GB`}
                />
                <div 
                  className="bg-cyan-500 h-full transition-all" 
                  style={{ width: `${Math.min(100, (result.activationMemoryGb / result.availableVramGb) * 100)}%` }} 
                  title={`Activations: ${result.activationMemoryGb} GB`}
                />
                <div 
                  className="bg-slate-500 h-full transition-all" 
                  style={{ width: `${Math.min(100, (result.cudaContextOverheadGb / result.availableVramGb) * 100)}%` }} 
                  title={`CUDA Overhead: ${result.cudaContextOverheadGb} GB`}
                />
              </div>
            </div>

            {/* Breakdown Items */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Model Weights ({precision}):
                </span>
                <span className="text-slate-200 font-bold">{result.weightMemoryGb} GB</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  KV Cache ({contextTokens} tokens):
                </span>
                <span className="text-slate-200 font-bold">{result.kvCacheMemoryGb} GB</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  Activation Memory:
                </span>
                <span className="text-slate-200 font-bold">{result.activationMemoryGb} GB</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                  CUDA / PyTorch Runtime:
                </span>
                <span className="text-slate-200 font-bold">{result.cudaContextOverheadGb} GB</span>
              </div>
            </div>

            {/* Recommendation Box */}
            <div className={`p-4 rounded-lg border text-xs leading-relaxed space-y-1.5 ${
              result.status === 'optimal'
                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                : result.status === 'marginal'
                ? 'bg-amber-950/20 border-amber-500/30 text-amber-300'
                : 'bg-red-950/20 border-red-500/30 text-red-300'
            }`}>
              <div className="font-bold flex items-center gap-1.5 uppercase">
                {result.status === 'optimal' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                ENGINEERING DIAGNOSIS
              </div>
              <p className="text-[11px] leading-relaxed">
                {result.recommendation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
