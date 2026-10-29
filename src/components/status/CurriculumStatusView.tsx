/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Curriculum Status & Engineering Transparency Matrix
 */

import React from 'react';
import { TRACKS } from '../../data/curriculumData.ts';
import { 
  FileCheck2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ShieldCheck,
  Terminal,
  Code2
} from 'lucide-react';

export const CurriculumStatusView: React.FC = () => {
  const completeCount = TRACKS.filter(t => t.status === 'Complete').length;
  const partialCount = TRACKS.filter(t => t.status === 'Partially Complete').length;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col font-mono">
      <div className="space-y-1 shrink-0">
        <div className="flex items-center gap-2">
          <FileCheck2 className="w-5 h-5 text-emerald-400" />
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
            Curriculum Status & Implementation Roadmap
          </h1>
        </div>
        <p className="text-xs text-slate-400">
          Strict compliance with Section 36 Rule 3: "No false completion claims. Maintain a clear list of completed, partial, and planned tracks."
        </p>
      </div>

      {/* Overview Metric Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
          <div className="text-[10px] text-slate-400 uppercase">TOTAL TRACK CATALOG</div>
          <div className="text-xl font-bold text-slate-100 mt-1">35 Tracks Architected</div>
        </div>
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20">
          <div className="text-[10px] text-emerald-400 uppercase">FULLY COMPLETED CORE TRACKS</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">{completeCount} Tracks (100% Operational)</div>
        </div>
        <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/20">
          <div className="text-[10px] text-amber-400 uppercase">PARTIALLY COMPLETE / SYLLABUS</div>
          <div className="text-xl font-bold text-amber-300 mt-1">{partialCount} Tracks (Documented Roadmap)</div>
        </div>
      </div>

      {/* 35 Tracks Full Matrix Table */}
      <div className="flex-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            TRACK IMPLEMENTATION MATRIX (35 TECHNICAL DISCIPLINES)
          </h2>
          <span className="text-xs text-slate-400">Curriculum v1.0.0</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="divide-y divide-slate-800/60 text-xs">
            {TRACKS.map(track => {
              const isComplete = track.status === 'Complete';
              return (
                <div key={track.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-950/30 px-2 rounded">
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-200 flex items-center gap-2">
                      <span>{track.title}</span>
                      <span className="text-[10px] text-slate-500">({track.category})</span>
                    </div>
                    <div className="text-[11px] text-slate-400">{track.tagline}</div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 text-[11px]">
                    <span className="text-slate-400">~{track.estimatedHours} hrs</span>
                    <span className="text-slate-400">{track.executionEngine}</span>
                    <span className={`px-2 py-0.5 rounded border font-bold text-[10px] uppercase ${
                      isComplete 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}>
                      {track.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
