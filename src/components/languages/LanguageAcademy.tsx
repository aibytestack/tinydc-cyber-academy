/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - 35-Language Technical Academy
 */

import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext.tsx';
import { TRACKS } from '../../data/curriculumData.ts';
import { TrackCategory, TrackStatus } from '../../types/academy.ts';
import { 
  Search, 
  Code2, 
  Terminal, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  Play, 
  Filter, 
  Cpu, 
  Layers, 
  Database,
  Shield
} from 'lucide-react';

export const LanguageAcademy: React.FC = () => {
  const { setSelectedTrackId, setSelectedLessonId, setActiveView } = useAcademy();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const categories = [
    'All',
    'Programming Languages',
    'Scripting & Shell',
    'Systems & Low-Level',
    'Data & Query Languages',
    'Markup & Configuration',
    'Infrastructure as Code',
    'Security & Patterns',
  ];

  const filteredTracks = TRACKS.filter(track => {
    const matchesSearch = track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          track.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          track.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          track.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || track.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || track.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleLaunchTrack = (trackId: string, lessonId?: string) => {
    setSelectedTrackId(trackId);
    if (lessonId) {
      setSelectedLessonId(lessonId);
    } else {
      const track = TRACKS.find(t => t.id === trackId);
      if (track && track.lessons.length > 0) {
        setSelectedLessonId(track.lessons[0].id);
      }
    }
    setActiveView('coding-lab');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-emerald-400" />
          <h1 className="text-xl sm:text-2xl font-mono font-bold text-slate-100">
            35-Track Technical Language Academy
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 font-mono">
          Programming, query languages, shells, markup formats, and infrastructure definition languages.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search languages (Python, Rust, Bash, SQL, Dockerfile, Regex)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 focus:outline-none focus:border-emerald-500/50"
        >
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={e => setSelectedStatus(e.target.value)}
          className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 focus:outline-none focus:border-emerald-500/50"
        >
          <option value="All">All Statuses</option>
          <option value="Complete">Complete (15 Core Tracks)</option>
          <option value="Partially Complete">Partially Complete</option>
        </select>
      </div>

      {/* Track Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTracks.map(track => {
          const isComplete = track.status === 'Complete';
          return (
            <div
              key={track.id}
              className={`flex flex-col justify-between p-5 rounded-xl border transition-all ${
                isComplete 
                  ? 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/40 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                  : 'bg-slate-900/30 border-slate-800/60 opacity-90'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {track.category}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                    isComplete
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}>
                    {track.status}
                  </span>
                </div>

                <h3 className="font-mono font-bold text-base text-slate-100 mt-3 flex items-center justify-between">
                  <span>{track.title}</span>
                </h3>
                <p className="text-xs text-emerald-400/90 font-mono mt-1">
                  {track.tagline}
                </p>
                <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                  {track.description}
                </p>

                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    ~{track.estimatedHours} hrs
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                    {track.lessons.length > 0 ? `${track.lessons.length} Active Lessons` : 'Syllabus Ready'}
                  </span>
                </div>

                {track.lessons.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                      Interactive Lessons:
                    </div>
                    {track.lessons.map(lesson => (
                      <button
                        key={lesson.id}
                        onClick={() => handleLaunchTrack(track.id, lesson.id)}
                        className="w-full text-left p-2 rounded bg-slate-800/50 hover:bg-emerald-950/30 border border-slate-700/60 hover:border-emerald-500/30 text-xs font-mono text-slate-300 hover:text-emerald-300 flex items-center justify-between group transition-colors"
                      >
                        <span className="truncate">{lesson.order}. {lesson.title}</span>
                        <Play className="w-3 h-3 text-emerald-400 opacity-60 group-hover:opacity-100 shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-5 pt-3">
                <button
                  onClick={() => handleLaunchTrack(track.id)}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isComplete 
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.25)]' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <span>{track.lessons.length > 0 ? 'LAUNCH INTERACTIVE LAB' : 'EXPLORE SYLLABUS'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
