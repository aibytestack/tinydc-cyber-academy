/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Multi-Computer Cluster Builder & Task Scheduler
 */

import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext.tsx';
import { ClusterNode } from '../../types/academy.ts';
import { 
  Network, 
  Cpu, 
  Server, 
  Layers, 
  Play, 
  Plus, 
  CheckCircle2, 
  Activity, 
  Zap, 
  RotateCcw,
  AlertTriangle
} from 'lucide-react';

export const ClusterBuilder: React.FC = () => {
  const { awardXp } = useAcademy();

  const [nodes, setNodes] = useState<ClusterNode[]>([
    { id: 'node-head', hostname: 'ray-head-01', role: 'coordinator', os: 'Ubuntu 24.04', ip: '10.0.1.5', cpuCores: 16, ramGb: 64, status: 'healthy', cpuUtilization: 14, ramUtilization: 28 },
    { id: 'node-w1', hostname: 'compute-worker-01', role: 'compute-worker', os: 'Ubuntu 24.04', ip: '10.0.1.6', cpuCores: 64, ramGb: 256, status: 'healthy', cpuUtilization: 42, ramUtilization: 55 },
    { id: 'node-w2', hostname: 'compute-worker-02', role: 'compute-worker', os: 'Ubuntu 24.04', ip: '10.0.1.7', cpuCores: 64, ramGb: 256, status: 'healthy', cpuUtilization: 38, ramUtilization: 52 },
    { id: 'node-gpu1', hostname: 'gpu-worker-01', role: 'gpu-worker', os: 'Ubuntu 24.04', ip: '10.0.2.50', cpuCores: 32, ramGb: 128, gpuModel: '4x RTX 4090', vramGb: 96, status: 'healthy', cpuUtilization: 68, ramUtilization: 72 },
  ]);

  const [jobQueue, setJobQueue] = useState<number>(0);
  const [completedJobs, setCompletedJobs] = useState<number>(1420);
  const [isDispatching, setIsDispatching] = useState<boolean>(false);

  const totalCores = nodes.reduce((acc, n) => acc + n.cpuCores, 0);
  const totalRam = nodes.reduce((acc, n) => acc + n.ramGb, 0);
  const totalVram = nodes.reduce((acc, n) => acc + (n.vramGb || 0), 0);

  const handleDispatchBatch = () => {
    setIsDispatching(true);
    setJobQueue(500);

    const interval = setInterval(() => {
      setJobQueue(prev => {
        if (prev <= 50) {
          clearInterval(interval);
          setIsDispatching(false);
          setCompletedJobs(c => c + 500);
          awardXp(120, 'Dispatched batch workload across multi-node cluster');
          return 0;
        }
        return prev - 50;
      });
    }, 200);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
              Multi-Computer Cluster Builder & Distributed Schedulers
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Pool hardware resources across distinct physical machines using Ray, Slurm, and message brokers.
          </p>
        </div>

        <button
          onClick={handleDispatchBatch}
          disabled={isDispatching}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.3)]"
        >
          <Play className="w-3.5 h-3.5 fill-slate-950" />
          <span>{isDispatching ? `PROCESSING QUEUE (${jobQueue})...` : 'DISPATCH 500 JOBS'}</span>
        </button>
      </div>

      {/* Aggregate Hardware Capacity Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
          <div className="text-[10px] text-slate-400 uppercase">ACTIVE CLUSTER NODES</div>
          <div className="text-xl font-bold text-slate-100 mt-1">{nodes.length} Physical Nodes</div>
        </div>
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
          <div className="text-[10px] text-slate-400 uppercase">AGGREGATE CPU CORES</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">{totalCores} Total Cores</div>
        </div>
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
          <div className="text-[10px] text-slate-400 uppercase">DISTRIBUTED RAM</div>
          <div className="text-xl font-bold text-cyan-400 mt-1">{totalRam} GB Pooled</div>
        </div>
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
          <div className="text-[10px] text-slate-400 uppercase">CLUSTER ACCELERATOR VRAM</div>
          <div className="text-xl font-bold text-purple-400 mt-1">{totalVram} GB VRAM</div>
        </div>
      </div>

      {/* Educational Notice on Distributed Memory */}
      <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 text-xs text-amber-200 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">CRITICAL DISTRIBUTED ARCHITECTURE PRINCIPLE: </span>
          Multiple computers connected over Ethernet do NOT automatically merge into one giant shared memory space. RAM across separate machines is isolated. To compute across nodes, applications must use distributed task dispatchers (Ray, Slurm), message queues (RabbitMQ, Redis), or distributed parallel frameworks (MPI, PyTorch DDP).
        </div>
      </div>

      {/* Nodes Table & Task Dispatch Status */}
      <div className="flex-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400" />
            REGISTERED CLUSTER WORKERS
          </h2>
          <span className="text-xs text-emerald-400 font-bold">{completedJobs.toLocaleString()} Total Jobs Processed</span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2.5">
          {nodes.map(node => (
            <div
              key={node.id}
              className="p-3.5 rounded-lg border border-slate-800 bg-black/60 flex items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <div className="font-bold text-slate-100 flex items-center gap-2">
                    <span>{node.hostname}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded border uppercase font-bold bg-slate-800 text-slate-400 border-slate-700">
                      {node.role}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">{node.ip} // {node.os}</div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-[11px] text-slate-300">
                <span>{node.cpuCores} Cores</span>
                <span>{node.ramGb} GB RAM</span>
                {node.vramGb && <span className="text-purple-400 font-bold">{node.vramGb} GB VRAM</span>}
                <span className="text-emerald-400 font-bold">READY</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
