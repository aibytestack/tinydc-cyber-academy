/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Main Command Center Dashboard
 */

import React from 'react';
import { useAcademy } from '../../context/AcademyContext.tsx';
import { MISSIONS } from '../../data/missionsData.ts';
import { TRACKS } from '../../data/curriculumData.ts';
import { getNextRankProgress } from '../../utils/progression.ts';
import { 
  Terminal, 
  Server, 
  Cpu, 
  ShieldAlert, 
  Network, 
  Sparkles, 
  Flame, 
  Zap, 
  Award, 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Radio, 
  Activity, 
  Database,
  Layers,
  ChevronRight
} from 'lucide-react';

export const CommandCenter: React.FC = () => {
  const { user, setActiveView, setSelectedTrackId, setSelectedLessonId, completeMission } = useAcademy();
  const rankProgress = getNextRankProgress(user.xp);

  const activeTrack = TRACKS.find(t => t.id === user.activeTrackId) || TRACKS[0];
  const nextLesson = activeTrack.lessons.find(l => !user.completedLessons.includes(l.id)) || activeTrack.lessons[0];

  const handleContinueLearning = () => {
    setSelectedTrackId(activeTrack.id);
    if (nextLesson) {
      setSelectedLessonId(nextLesson.id);
    }
    setActiveView('coding-lab');
  };

  const skillEntries = [
    { key: 'programming', label: 'Programming', color: 'bg-emerald-400', value: user.skills.programming },
    { key: 'systems', label: 'Systems & OS', color: 'bg-cyan-400', value: user.skills.systems },
    { key: 'networking', label: 'Networking', color: 'bg-blue-400', value: user.skills.networking },
    { key: 'cybersecurity', label: 'Cybersecurity', color: 'bg-red-400', value: user.skills.cybersecurity },
    { key: 'software_engineering', label: 'Software Eng', color: 'bg-indigo-400', value: user.skills.software_engineering },
    { key: 'ai_engineering', label: 'AI Engineering', color: 'bg-purple-400', value: user.skills.ai_engineering },
    { key: 'infrastructure', label: 'Infrastructure', color: 'bg-amber-400', value: user.skills.infrastructure },
    { key: 'distributed_computing', label: 'Distributed Compute', color: 'bg-pink-400', value: user.skills.distributed_computing },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* 1. Hero Welcome & Operational Status */}
      <div className="relative overflow-hidden rounded-xl border border-emerald-500/30 bg-gradient-to-r from-[#0c1523] via-[#0a121d] to-[#070b13] p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-mono font-semibold tracking-widest text-emerald-400 uppercase">
                OPERATIONAL STATUS: ACTIVE // CALLSIGN: {user.callsign}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight font-mono">
              Tiny DC <span className="text-emerald-400">Cyber Academy</span>
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Learn the Code. Master the Systems. Build the Future. Hands-on laboratory training spanning programming, server engineering, autonomous AI models, and multi-computer data centers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleContinueLearning}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>CONTINUE LEARNING</span>
            </button>
            <button
              onClick={() => setActiveView('datacenter-lab')}
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-sm transition-all cursor-pointer"
            >
              <Server className="w-4 h-4 text-cyan-400" />
              <span>ENTER DATA CENTER</span>
            </button>
          </div>
        </div>

        {/* Status Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80 font-mono">
          <div className="space-y-0.5">
            <div className="text-[11px] text-slate-400">CURRENT RANK</div>
            <div className="text-base font-bold text-emerald-300 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>{user.rank}</span>
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-[11px] text-slate-400">EXPERIENCE POINTS</div>
            <div className="text-base font-bold text-cyan-300 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>{user.xp.toLocaleString()} XP</span>
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-[11px] text-slate-400">ACTIVE STREAK</div>
            <div className="text-base font-bold text-amber-300 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>{user.streakDays} Days</span>
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-[11px] text-slate-400">COMPLETED MISSIONS</div>
            <div className="text-base font-bold text-purple-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>{user.completedMissions.length} Cleared</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Grid: Mission Control & Skill Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Mission Control (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">
                TACTICAL MISSION DISPATCH
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">
              6 Real-World Incident Scenarios
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MISSIONS.slice(0, 4).map(mission => {
              const isCleared = user.completedMissions.includes(mission.id);
              return (
                <div
                  key={mission.id}
                  className={`p-4 rounded-lg border transition-all ${
                    isCleared 
                      ? 'bg-emerald-950/20 border-emerald-500/30' 
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${
                      mission.difficulty === 'beginner' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : mission.difficulty === 'intermediate'
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                        : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                    }`}>
                      {mission.difficulty}
                    </span>
                    <span className="text-xs font-mono text-cyan-400 font-semibold">
                      +{mission.xpReward} XP
                    </span>
                  </div>

                  <h3 className="font-mono font-bold text-sm text-slate-100 mt-2 line-clamp-1">
                    {mission.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {mission.description}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {mission.durationMinutes} min
                    </span>
                    {isCleared ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> CLEARED
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          if (mission.id === 'm-01' || mission.id === 'm-02') setActiveView('terminal-ssh');
                          else if (mission.id === 'm-03') setActiveView('cybersecurity');
                          else if (mission.id === 'm-04') setActiveView('networking');
                          else if (mission.id === 'm-05') setActiveView('gpu-lab');
                          else setActiveView('datacenter-lab');
                        }}
                        className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                      >
                        ENGAGE <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skill Progression Radar (1 Col) */}
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">
                  SKILL PROGRESSION
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-400">Mastery %</span>
            </div>

            <div className="space-y-3 font-mono">
              {skillEntries.map(s => (
                <div key={s.key} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">{s.label}</span>
                    <span className="text-slate-400 font-bold">{s.value}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ${s.color}`}
                      style={{ width: `${s.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Next promotion:</span>
            <span className="text-emerald-400 font-bold">{rankProgress.nextRank?.title || 'MAX RANK'}</span>
          </div>
        </div>
      </div>

      {/* 3. Quick Access Launchpads */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">
            PRIMARY OPERATIONS LAUNCHPAD
          </h2>
          <span className="text-xs font-mono text-slate-400">Click to deploy</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono">
          <button
            onClick={() => setActiveView('languages')}
            className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 hover:border-emerald-500/40 text-left transition-all group cursor-pointer"
          >
            <Terminal className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-slate-200">Coding Lab</div>
            <div className="text-[10px] text-slate-400 mt-0.5">35 Languages</div>
          </button>

          <button
            onClick={() => setActiveView('terminal-ssh')}
            className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 hover:border-cyan-500/40 text-left transition-all group cursor-pointer"
          >
            <Cpu className="w-5 h-5 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-slate-200">SSH Lab</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Remote Keys</div>
          </button>

          <button
            onClick={() => setActiveView('networking')}
            className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 hover:border-blue-500/40 text-left transition-all group cursor-pointer"
          >
            <Network className="w-5 h-5 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-slate-200">Network Sim</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Routing & Pings</div>
          </button>

          <button
            onClick={() => setActiveView('gpu-lab')}
            className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 hover:border-purple-500/40 text-left transition-all group cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-slate-200">GPU VRAM</div>
            <div className="text-[10px] text-slate-400 mt-0.5">LLM Calculator</div>
          </button>

          <button
            onClick={() => setActiveView('datacenter-lab')}
            className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 hover:border-emerald-500/40 text-left transition-all group cursor-pointer"
          >
            <Server className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-slate-200">Data Center</div>
            <div className="text-[10px] text-slate-400 mt-0.5">42U Rack Sim</div>
          </button>

          <button
            onClick={() => setActiveView('ai-factory')}
            className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 hover:border-amber-500/40 text-left transition-all group cursor-pointer"
          >
            <Flame className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-slate-200">AI Factory</div>
            <div className="text-[10px] text-slate-400 mt-0.5">16-Phase Capstone</div>
          </button>
        </div>
      </div>
    </div>
  );
};
