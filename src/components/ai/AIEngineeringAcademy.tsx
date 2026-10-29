/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - AI Engineering Academy & RAG Pipeline Simulator
 */

import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext.tsx';
import { 
  Sparkles, 
  Bot, 
  Database, 
  Layers, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Cpu, 
  ShieldCheck,
  Play
} from 'lucide-react';

export const AIEngineeringAcademy: React.FC = () => {
  const { awardXp } = useAcademy();
  const [ragQuery, setRagQuery] = useState<string>('How do I configure ZFS recordsize for LLM model weights?');
  const [ragStep, setRagStep] = useState<number>(0);
  const [isSimulatingRAG, setIsSimulatingRAG] = useState<boolean>(false);

  const ragStages = [
    {
      title: '1. Ingestion & Semantic Chunking',
      desc: 'The technical markdown document is sliced into overlapping 512-token chunks with 50-token window overlap to maintain context across boundaries.',
      output: 'Extracted Chunk #412: "For LLM Safetensors storage pools, configure recordsize=1M on the dataset to maximize sequential NVMe read bandwidth."',
    },
    {
      title: '2. Vector Embedding Generation',
      desc: 'Chunks pass through a 384-dimensional embedding model (e.g., bge-small-en-v1.5), generating floating point coordinate vectors representing semantic meaning.',
      output: 'Vector Coordinate: [-0.0412, 0.0891, 0.0124, -0.0541, ..., 0.0210] (Norm: 1.000)',
    },
    {
      title: '3. Vector Database Cosine Search',
      desc: 'The query embedding is compared against 50,000 document vectors using Cosine Similarity Dot Product. Top-K closest matches are returned.',
      output: 'Match #1: zfs_storage_guide.md (Cosine Similarity: 0.892) | Match #2: nvme_tuning.md (Similarity: 0.741)',
    },
    {
      title: '4. Grounded Prompt Synthesis with Citations',
      desc: 'Retrieved chunks are injected into the system prompt context. The LLM generates an exact technical answer with verified citations and zero hallucination.',
      output: 'Answer: To optimize ZFS for LLM weights, execute `zfs set recordsize=1M zfs-pool/models`. Safetensors files benefit from larger block sizes to saturate PCIe Gen5 read bandwidth. [Source: zfs_storage_guide.md:42]',
    },
  ];

  const handleRunRAGSimulation = () => {
    setIsSimulatingRAG(true);
    setRagStep(1);

    setTimeout(() => setRagStep(2), 600);
    setTimeout(() => setRagStep(3), 1200);
    setTimeout(() => {
      setRagStep(4);
      setIsSimulatingRAG(false);
      awardXp(100, 'Executed RAG Pipeline Retrieval Simulation');
    }, 1800);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col font-mono">
      <div className="space-y-1 shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
            AI Engineering & Retrieval-Augmented Generation (RAG)
          </h1>
        </div>
        <p className="text-xs text-slate-400">
          Transformers, attention mechanics, context windows, vector databases, and autonomous tool-using agents.
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto">
        {/* Left Column: Interactive RAG Flow Simulator (7 Cols) */}
        <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-400" />
              INTERACTIVE RAG PIPELINE SIMULATOR
            </h2>
            <span className="text-[10px] text-purple-400 font-bold">5-Stage Retrieval Engine</span>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-300">Learner Query to Knowledge Base:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={ragQuery}
                onChange={e => setRagQuery(e.target.value)}
                className="flex-1 px-3 py-2 bg-black/60 border border-slate-700 rounded text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleRunRAGSimulation}
                disabled={isSimulatingRAG}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-slate-950 font-bold text-xs rounded transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>{isSimulatingRAG ? 'RETRIEVING...' : 'TEST RAG'}</span>
              </button>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {ragStages.map((stage, i) => {
              const isPast = ragStep > i;
              const isCurrent = ragStep === i + 1;
              return (
                <div
                  key={i}
                  className={`p-3.5 rounded-lg border transition-all text-xs ${
                    isPast || isCurrent
                      ? 'bg-purple-950/20 border-purple-500/50 text-slate-200'
                      : 'bg-black/30 border-slate-800/80 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className={isPast || isCurrent ? 'text-purple-300' : 'text-slate-500'}>
                      {stage.title}
                    </span>
                    {isPast && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <p className="text-[11px] mt-1 leading-relaxed text-slate-400">{stage.desc}</p>
                  {(isPast || isCurrent) && (
                    <div className="mt-2 p-2 rounded bg-black/80 border border-purple-500/30 text-[10px] text-emerald-300">
                      {stage.output}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: AI Agent Sandboxing Principles (5 Cols) */}
        <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4 text-xs">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-slate-200 font-bold">
            <Bot className="w-4 h-4 text-emerald-400" />
            <span>AUTONOMOUS AGENTS & TOOL SANDBOXING</span>
          </div>

          <div className="space-y-3 text-slate-300">
            <div className="p-3 rounded-lg bg-black/60 border border-slate-800 space-y-1">
              <div className="font-bold text-emerald-400 text-xs">Principle of Least Privilege:</div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Never grant autonomous LLM agents unrestricted bash execution. Define tightly structured JSON tools with schema validation (e.g. restart_service(name: enum)).
              </p>
            </div>

            <div className="p-3 rounded-lg bg-black/60 border border-slate-800 space-y-1">
              <div className="font-bold text-amber-400 text-xs">Human-in-the-Loop Approval:</div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Read-only operations (telemetry, log queries) run automatically. Destructive changes (reboots, partition wipes, firewall alterations) require explicit human approval modals.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-black/60 border border-slate-800 space-y-1">
              <div className="font-bold text-cyan-400 text-xs">Deterministic Tool Validation:</div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Validate function arguments with Pydantic schemas before subprocess invocation to prevent prompt injection parameter attacks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
