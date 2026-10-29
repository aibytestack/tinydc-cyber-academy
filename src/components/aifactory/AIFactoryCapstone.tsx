/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - The 16-Phase AI Factory Capstone Builder
 */

import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext.tsx';
import { AI_FACTORY_PHASES } from '../../data/aiFactoryData.ts';
import { AIFactoryPhase } from '../../types/academy.ts';
import { 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  FileCode, 
  Award, 
  Layers, 
  Cpu, 
  Server, 
  ShieldCheck, 
  Zap,
  Activity,
  Check
} from 'lucide-react';

export const AIFactoryCapstone: React.FC = () => {
  const { awardXp, completeProject } = useAcademy();

  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const [completedPhases, setCompletedPhases] = useState<Record<number, boolean>>({
    1: true,
    2: true,
  });

  const activePhase: AIFactoryPhase = AI_FACTORY_PHASES[activePhaseIndex] || AI_FACTORY_PHASES[0];
  const totalCompleted = Object.values(completedPhases).filter(Boolean).length;
  const progressPercent = Math.round((totalCompleted / AI_FACTORY_PHASES.length) * 100);

  const handleCertifyPhase = () => {
    setCompletedPhases(prev => ({ ...prev, [activePhase.phase]: true }));
    awardXp(activePhase.xpReward, `Completed AI Factory Phase ${activePhase.phase}: ${activePhase.title}`);

    if (totalCompleted + 1 === AI_FACTORY_PHASES.length) {
      completeProject('ai-factory-capstone', 1000);
    } else if (activePhaseIndex < AI_FACTORY_PHASES.length - 1) {
      setActivePhaseIndex(activePhaseIndex + 1);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
              The AI Factory Capstone Architecture
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Design, deploy, and operate a full-scale AI factory from bare metal and GPUs to distributed training and autonomous agents.
          </p>
        </div>

        {/* Global Progress Metric */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs">
          <Award className="w-4 h-4 text-amber-400" />
          <div className="text-left">
            <div className="text-[10px] text-slate-400">CAPSTONE COMPLETION</div>
            <div className="text-amber-300 font-bold">{totalCompleted} of 16 Phases ({progressPercent}%)</div>
          </div>
        </div>
      </div>

      {/* 16-Phase Horizontal Track Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800 shrink-0">
        {AI_FACTORY_PHASES.map((p, idx) => {
          const isDone = completedPhases[p.phase];
          const isSelected = activePhaseIndex === idx;
          return (
            <button
              key={p.phase}
              onClick={() => setActivePhaseIndex(idx)}
              className={`px-3 py-1.5 rounded text-xs whitespace-nowrap transition-all border font-bold flex items-center gap-1.5 cursor-pointer shrink-0 ${
                isSelected
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.25)]'
                  : isDone
                  ? 'bg-emerald-950/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              {isDone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <span>{p.phase}</span>}
              <span>P{p.phase}</span>
            </button>
          );
        })}
      </div>

      {/* Main Phase Stage (2 Columns) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        {/* Left Column: Phase Architecture Specification (7 Cols) */}
        <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between overflow-y-auto space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  PHASE {activePhase.phase} // {activePhase.category.toUpperCase()}
                </span>
                <h2 className="text-lg font-bold text-slate-100">{activePhase.title}</h2>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                ~{activePhase.durationHours} Hours
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activePhase.description}
            </p>

            {/* Architectural Decisions & Blueprint */}
            <div className="space-y-2 p-4 rounded-lg bg-black/60 border border-slate-800">
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase">
                <Layers className="w-4 h-4" />
                SYSTEM ARCHITECTURE BLUEPRINT
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 pl-4 list-disc">
                {activePhase.architectureDetails.map((detail, i) => (
                  <li key={i} className="leading-relaxed">{detail}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <FileCode className="w-4 h-4 text-cyan-400" />
              <span>Deliverable: <span className="text-slate-200 font-bold">{activePhase.deliverable}</span></span>
            </div>
            <span className="text-xs text-emerald-400 font-bold">+{activePhase.xpReward} XP</span>
          </div>
        </div>

        {/* Right Column: Engineering Acceptance Checklist (5 Cols) */}
        <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between overflow-y-auto space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider">
                  ACCEPTANCE CHECKLIST
                </h3>
              </div>
              <span className="text-xs text-slate-400">Phase Review</span>
            </div>

            <div className="space-y-2.5">
              {activePhase.checklistItems.map(item => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg border border-slate-800 bg-black/40 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-200 leading-snug">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={handleCertifyPhase}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.3)] cursor-pointer"
            >
              <span>CERTIFY PHASE {activePhase.phase} & ADVANCE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
