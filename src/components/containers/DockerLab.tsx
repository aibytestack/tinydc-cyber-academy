/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Docker & Containerization Laboratory
 */

import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext.tsx';
import { 
  Boxes, 
  Terminal, 
  Play, 
  RotateCcw, 
  Square, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  ArrowRight,
  Activity
} from 'lucide-react';

interface SimulatedContainer {
  id: string;
  name: string;
  image: string;
  status: 'running' | 'stopped' | 'restarting';
  ports: string;
  cpuPercent: number;
  memUsageMb: number;
  uptime: string;
}

export const DockerLab: React.FC = () => {
  const { awardXp } = useAcademy();

  const [containers, setContainers] = useState<SimulatedContainer[]>([
    { id: 'c1a2b3', name: 'tinydc-api', image: 'tinydc-api:v1.2', status: 'running', ports: '8080->8080', cpuPercent: 4.2, memUsageMb: 148, uptime: '3 days' },
    { id: 'd4e5f6', name: 'tinydc-postgres', image: 'postgres:16-alpine', status: 'running', ports: '5432->5432', cpuPercent: 1.8, memUsageMb: 280, uptime: '3 days' },
    { id: 'a7b8c9', name: 'tinydc-redis', image: 'redis:7.2-alpine', status: 'running', ports: '6379->6379', cpuPercent: 0.5, memUsageMb: 34, uptime: '3 days' },
    { id: 'f0e1d2', name: 'vllm-inference', image: 'vllm/vllm-openai:v0.6', status: 'running', ports: '8000->8000', cpuPercent: 48.0, memUsageMb: 7200, uptime: '12 hours' },
  ]);

  const [selectedLogs, setSelectedLogs] = useState<string>('Select a container to inspect stdout/stderr stream.');

  const handleContainerAction = (id: string, action: 'stop' | 'start' | 'logs') => {
    const c = containers.find(item => item.id === id);
    if (!c) return;

    if (action === 'logs') {
      setSelectedLogs(`[LOGS for ${c.name} (${c.image})]\n2026-10-29 06:10:01 INFO: Server started listening on ${c.ports}\n2026-10-29 06:10:02 INFO: Connected to internal cluster network bridge.\n2026-10-29 06:12:40 INFO: Healthcheck probe succeeded (200 OK) in 1.4ms.`);
    } else if (action === 'stop') {
      setContainers(prev => prev.map(item => item.id === id ? { ...item, status: 'stopped', cpuPercent: 0 } : item));
    } else if (action === 'start') {
      setContainers(prev => prev.map(item => item.id === id ? { ...item, status: 'running', cpuPercent: 3.5 } : item));
      awardXp(50, `Restarted container ${c.name}`);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col font-mono">
      <div className="space-y-1 shrink-0">
        <div className="flex items-center gap-2">
          <Boxes className="w-5 h-5 text-cyan-400" />
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
            Docker & Container Engineering Laboratory
          </h1>
        </div>
        <p className="text-xs text-slate-400">
          Container lifecycles, cgroup resource isolation, bridge networks, and multi-service Compose orchestration.
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        {/* Left Column: Container Dashboard (7 Cols) */}
        <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between overflow-y-auto space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              RUNNING CONTAINERS (DOCKER ENGINE 27.2)
            </h2>
            <span className="text-[10px] text-slate-400">
              {containers.filter(c => c.status === 'running').length} / {containers.length} Online
            </span>
          </div>

          <div className="space-y-2.5">
            {containers.map(c => (
              <div 
                key={c.id} 
                className="p-3.5 rounded-lg border border-slate-800 bg-black/60 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${c.status === 'running' ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'}`} />
                  <div>
                    <div className="font-bold text-slate-100">{c.name}</div>
                    <div className="text-[10px] text-slate-400">{c.image} // {c.ports}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right text-[11px] hidden sm:block">
                    <div className="text-slate-300">{c.memUsageMb} MB</div>
                    <div className="text-[10px] text-slate-500">{c.cpuPercent}% CPU</div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleContainerAction(c.id, 'logs')}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[10px] cursor-pointer"
                    >
                      LOGS
                    </button>
                    {c.status === 'running' ? (
                      <button
                        onClick={() => handleContainerAction(c.id, 'stop')}
                        className="p-1 bg-red-950 text-red-300 hover:bg-red-900 border border-red-700/60 rounded cursor-pointer"
                        title="Stop Container"
                      >
                        <Square className="w-3 h-3" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleContainerAction(c.id, 'start')}
                        className="p-1 bg-emerald-950 text-emerald-300 hover:bg-emerald-900 border border-emerald-700/60 rounded cursor-pointer"
                        title="Start Container"
                      >
                        <Play className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
            <span className="text-emerald-400 font-bold">CONTAINER TIP:</span> Mount persistent data to named Docker volumes rather than host root directories to ensure portable backups.
          </div>
        </div>

        {/* Right Column: Live Stream Logs & Dockerfile Pruning (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4 overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              CONTAINER STDOUT LOG STREAM
            </h3>
          </div>

          <div className="flex-1 p-3 rounded bg-black/90 border border-slate-800 text-xs text-slate-300 whitespace-pre-wrap overflow-y-auto min-h-[160px]">
            {selectedLogs}
          </div>

          <div className="p-4 rounded-lg bg-black/60 border border-slate-800 space-y-2 text-xs">
            <div className="text-cyan-400 font-bold flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              MULTI-STAGE IMAGE PRUNING DRILL
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Standard build: 1.2 GB (contains node, npm, python build tools). Multi-stage distroless build: 38 MB (96.8% footprint reduction).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
