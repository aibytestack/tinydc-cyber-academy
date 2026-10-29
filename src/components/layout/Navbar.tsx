/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Top Command Navbar
 */

import React from 'react';
import { useAcademy } from '../../context/AcademyContext.tsx';
import { getNextRankProgress } from '../../utils/progression.ts';
import { 
  Server, 
  Terminal, 
  Shield, 
  Bot, 
  Volume2, 
  VolumeX, 
  Settings, 
  Award, 
  Flame, 
  Zap, 
  Search,
  Activity
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    user, 
    activeView, 
    setActiveView, 
    isTutorOpen, 
    setIsTutorOpen, 
    soundEnabled, 
    setSoundEnabled 
  } = useAcademy();

  const rankProgress = getNextRankProgress(user.xp);

  return (
    <header className="h-16 border-b border-slate-800 bg-[#090f18]/90 backdrop-blur-md sticky top-0 z-40 px-4 flex items-center justify-between">
      {/* Brand & Identity */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setActiveView('command-center')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
          title="Return to Command Center"
        >
          <div className="w-9 h-9 rounded bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm text-slate-100 tracking-wider">
                TINY <span className="text-emerald-400">DC</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                CYBER ACADEMY
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-tight hidden sm:block">
              Learn the Code. Master the Systems. Build the Future.
            </p>
          </div>
        </button>
      </div>

      {/* Center Rank & XP Status HUD */}
      <div className="hidden md:flex items-center gap-6">
        {/* Rank Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded bg-slate-900/80 border border-slate-800">
          <Award className="w-4 h-4 text-emerald-400" />
          <div className="text-left">
            <div className="text-[11px] font-mono font-bold text-emerald-300">
              LVL {user.rankLevel} : {user.rank.toUpperCase()}
            </div>
            <div className="w-32 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-0.5">
              <div 
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${rankProgress.percent}%` }}
              />
            </div>
          </div>
          <span className="text-[10px] font-mono text-slate-400 ml-1">
            {rankProgress.percent}%
          </span>
        </div>

        {/* Experience Points */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/60 border border-slate-800 text-xs font-mono text-cyan-400">
          <Zap className="w-3.5 h-3.5 fill-cyan-400/20" />
          <span className="font-bold">{user.xp.toLocaleString()}</span>
          <span className="text-slate-500 text-[10px]">XP</span>
        </div>

        {/* Learning Streak */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/60 border border-slate-800 text-xs font-mono text-amber-400">
          <Flame className="w-3.5 h-3.5 fill-amber-400/20" />
          <span className="font-bold">{user.streakDays}</span>
          <span className="text-slate-500 text-[10px]">DAYS</span>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        {/* AI Tutor Button */}
        <button
          onClick={() => setIsTutorOpen(!isTutorOpen)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium transition-all ${
            isTutorOpen 
              ? 'bg-purple-600/30 text-purple-300 border border-purple-500/60 shadow-[0_0_10px_rgba(168,85,247,0.3)]' 
              : 'bg-slate-900 text-slate-300 hover:text-purple-300 border border-slate-800 hover:border-purple-500/40'
          }`}
          title="Open Tiny DC AI Tutor"
        >
          <Bot className="w-3.5 h-3.5 text-purple-400" />
          <span>AI TUTOR</span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-1.5 rounded text-slate-400 hover:text-slate-200 bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors"
          title={soundEnabled ? 'Mute Interface Audio' : 'Enable Interface Audio'}
          aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Settings Button */}
        <button
          onClick={() => setActiveView('settings')}
          className={`p-1.5 rounded transition-colors ${
            activeView === 'settings'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900/80 border border-slate-800 hover:border-slate-700'
          }`}
          title="Platform Settings & Backup"
          aria-label="Settings and progress backup"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
