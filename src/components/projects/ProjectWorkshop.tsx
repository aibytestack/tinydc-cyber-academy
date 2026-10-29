/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Project Workshop
 */

import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext.tsx';
import { PROJECTS } from '../../data/projectsData.ts';
import { Project, DifficultyLevel } from '../../types/academy.ts';
import { 
  FolderKanban, 
  CheckCircle2, 
  Clock, 
  FileCode, 
  ArrowRight, 
  Layers, 
  Award,
  Zap,
  Play
} from 'lucide-react';

export const ProjectWorkshop: React.FC = () => {
  const { user, completeProject } = useAcademy();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<Project>(PROJECTS[0]);

  const filteredProjects = PROJECTS.filter(p => {
    return selectedDifficulty === 'all' || p.difficulty === selectedDifficulty;
  });

  const isCompleted = user.completedProjects.includes(activeProject.id);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
              Hands-On Engineering Project Workshop
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Real-world standalone applications: CIDR calculators, REST APIs, RAG pipelines, and multi-node schedulers.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs">
          {['all', 'beginner', 'intermediate', 'advanced', 'expert'].map(diff => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1 rounded capitalize font-bold transition-all cursor-pointer ${
                selectedDifficulty === diff
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Project List (5 Cols) and Active Project Blueprint (7 Cols) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        {/* Left Column: Project Catalog (5 Cols) */}
        <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-900/60 p-4 overflow-y-auto space-y-2.5">
          {filteredProjects.map(p => {
            const isDone = user.completedProjects.includes(p.id);
            const isSelected = activeProject.id === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setActiveProject(p)}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-950/30 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                    : isDone
                    ? 'bg-slate-950/40 border-slate-800'
                    : 'bg-black/40 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[9px] px-1.5 py-0.2 rounded border font-bold uppercase ${
                    p.difficulty === 'beginner' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : p.difficulty === 'intermediate' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                    : p.difficulty === 'advanced' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}>
                    {p.difficulty}
                  </span>
                  <span className="text-xs text-cyan-400 font-bold">+{p.xpReward} XP</span>
                </div>

                <h3 className="text-xs font-bold text-slate-100 mt-2">{p.title}</h3>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> ~{p.estimatedHours} hrs
                  </span>
                  {isDone && (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> VERIFIED
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Project Architectural Specification & Starter Code (7 Cols) */}
        <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between overflow-y-auto space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">
                  PROJECT SPECIFICATION // {activeProject.category.toUpperCase()}
                </span>
                <h2 className="text-base font-bold text-slate-100">{activeProject.title}</h2>
              </div>
              <span className="text-xs font-bold text-cyan-400">+{activeProject.xpReward} XP</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeProject.overview}
            </p>

            <div className="p-3.5 rounded-lg bg-black/60 border border-slate-800 space-y-1.5 text-xs">
              <div className="font-bold text-amber-400 flex items-center gap-1.5 uppercase text-[11px]">
                <Layers className="w-3.5 h-3.5" />
                SYSTEM ARCHITECTURE NOTES
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {activeProject.architectureNotes}
              </p>
            </div>

            {/* Milestones */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                IMPLEMENTATION MILESTONES
              </div>
              <div className="space-y-2">
                {activeProject.milestones.map((m, i) => (
                  <div key={i} className="p-3 rounded-lg bg-black/40 border border-slate-800 text-xs space-y-1">
                    <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{i + 1}. {m.title}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 pl-5">{m.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Starter Code Preview */}
            <div className="space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                <FileCode className="w-3 h-3 text-cyan-400" />
                <span>STARTER FILE: {activeProject.starterCodeFile}</span>
              </div>
              <div className="p-3 rounded bg-black/80 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
                <pre>{activeProject.starterCode}</pre>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
            {isCompleted ? (
              <span className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> PROJECT CERTIFIED COMPLETE
              </span>
            ) : (
              <button
                onClick={() => completeProject(activeProject.id, activeProject.xpReward)}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
              >
                <CheckCircle2 className="w-4 h-4 fill-slate-950" />
                <span>SUBMIT & CERTIFY PROJECT MILESTONES</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
