/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Left Cyber Operations Sidebar
 */

import React from 'react';
import { useAcademy, ActiveView } from '../../context/AcademyContext.tsx';
import { 
  Terminal, 
  Code2, 
  Server, 
  ShieldAlert, 
  Network, 
  Cpu, 
  Layers, 
  Database, 
  Activity, 
  Sparkles, 
  FolderKanban, 
  FileCheck2, 
  Settings, 
  Boxes, 
  HardDrive, 
  KeyRound, 
  Radio, 
  Monitor,
  Flame
} from 'lucide-react';

interface NavGroup {
  label: string;
  items: {
    id: ActiveView;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    badgeColor?: string;
  }[];
}

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView } = useAcademy();

  const navGroups: NavGroup[] = [
    {
      label: 'OPERATIONS',
      items: [
        { id: 'command-center', title: 'Command Center', icon: Radio },
      ],
    },
    {
      label: 'CODE & LANGUAGES',
      items: [
        { id: 'languages', title: '35-Language Academy', icon: Code2, badge: '35 Tracks', badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
        { id: 'coding-lab', title: 'Interactive Coding Lab', icon: Terminal, badge: 'Sandbox', badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' },
      ],
    },
    {
      label: 'SYSTEMS & PLATFORMS',
      items: [
        { id: 'systems-os', title: 'Linux / Win / Mac', icon: Monitor },
        { id: 'terminal-ssh', title: 'SSH & Remote Admin', icon: KeyRound, badge: 'Live SSH', badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
        { id: 'networking', title: 'Network Simulator', icon: Network },
        { id: 'cybersecurity', title: 'Cybersecurity Lab', icon: ShieldAlert, badge: 'Defense', badgeColor: 'bg-red-500/10 text-red-400 border-red-500/30' },
      ],
    },
    {
      label: 'INFRASTRUCTURE LABS',
      items: [
        { id: 'servers', title: 'Server Engineering', icon: Server },
        { id: 'docker', title: 'Docker Lab', icon: Boxes },
        { id: 'proxmox', title: 'Proxmox & Virtualization', icon: Layers },
        { id: 'storage-backup', title: 'Storage & Recovery', icon: HardDrive },
        { id: 'monitoring', title: 'Monitoring & Metrics', icon: Activity },
      ],
    },
    {
      label: 'AI & CLUSTERS',
      items: [
        { id: 'ai-engineering', title: 'AI Engineering Academy', icon: Sparkles, badge: 'RAG/LLM', badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
        { id: 'gpu-lab', title: 'GPU & VRAM Lab', icon: Cpu },
        { id: 'cluster-builder', title: 'Cluster Builder', icon: Network },
        { id: 'datacenter-lab', title: 'Data Center Simulator', icon: Server, badge: '42U Racks', badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
        { id: 'ai-factory', title: 'AI Factory Capstone', icon: Flame, badge: '16 Phases', badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
      ],
    },
    {
      label: 'PROJECTS & SPECS',
      items: [
        { id: 'projects', title: 'Project Workshop', icon: FolderKanban },
        { id: 'curriculum-status', title: 'Curriculum Status', icon: FileCheck2 },
        { id: 'settings', title: 'System Settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 border-r border-slate-800/80 bg-[#070b12] flex flex-col h-[calc(100vh-4rem)] overflow-y-auto select-none shrink-0">
      <div className="p-3 space-y-6">
        {navGroups.map(group => (
          <div key={group.label}>
            <div className="px-3 mb-1.5 text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
              {group.label}
            </div>
            <div className="space-y-0.5">
              {group.items.map(item => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-mono transition-all text-left group ${
                      isActive
                        ? 'bg-emerald-500/15 text-emerald-300 font-semibold border-l-2 border-emerald-400'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'
                      }`} />
                      <span className="truncate">{item.title}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.2 rounded border font-mono shrink-0 ml-1.5 ${
                        item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Terminal Prompt Footer */}
      <div className="mt-auto p-3 border-t border-slate-800/60 bg-[#060910]">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-emerald-400 font-bold">NODE-01</span>
          </div>
          <span>OPERATIONAL</span>
        </div>
        <div className="text-[10px] font-mono text-slate-400 mt-1 truncate">
          ssh://operator@tinydc.internal
        </div>
      </div>
    </aside>
  );
};
