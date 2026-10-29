import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateVramRequirement } from './vramCalculator.ts';

test('calculates 7B FP16 model requirement and fits 24GB GPU', () => {
  const result = calculateVramRequirement({
    parameterCountBillion: 7,
    precision: 'FP16',
    contextWindowTokens: 4096,
    batchSize: 1,
    targetVramGb: 24,
  });

  // 7B * 2 bytes = ~13GB base weights
  assert.ok(result.weightMemoryGb > 12 && result.weightMemoryGb < 14);
  assert.ok(result.totalVramRequiredGb > 14 && result.totalVramRequiredGb < 17);
  assert.equal(result.status, 'optimal');
  assert.ok(result.freeVramGb > 7);
});

test('detects CUDA OOM when loading 70B FP16 model onto 24GB GPU', () => {
  const result = calculateVramRequirement({
    parameterCountBillion: 70,
    precision: 'FP16',
    contextWindowTokens: 4096,
    batchSize: 1,
    targetVramGb: 24,
  });

  // 70B in FP16 is ~130GB, exceeds 24GB
  assert.equal(result.status, 'oom');
  assert.ok(result.freeVramGb < 0);
  assert.match(result.recommendation, /CUDA Out of Memory/);
});

test('70B Q4_K_M fits into high-memory node or dual GPU', () => {
  const result = calculateVramRequirement({
    parameterCountBillion: 70,
    precision: 'Q4_K_M',
    contextWindowTokens: 4096,
    batchSize: 1,
    targetVramGb: 48,
  });

  // 70B * 0.55 = ~35.8GB weights + overhead < 48GB
  assert.equal(result.status, 'optimal');
  assert.ok(result.freeVramGb > 4);
});
