/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Monitoring & Observability HUD (Prometheus/Grafana)
 */

import React, { useState, useEffect } from 'react';
import { useAcademy } from '../../context/AcademyContext.tsx';
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Zap, 
  Thermometer, 
  AlertTriangle, 
  CheckCircle2, 
  Layers
} from 'lucide-react';

export const MonitoringHUD: React.FC = () => {
  const [metrics, setMetrics] = useState({
    cpuLoad: 42,
    ramLoad: 58,
    gpuTemp: 64,
    gpuVram: 72,
    networkGbps: 18.4,
    diskIops: 2450,
  });

  // Subtle real-time fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics(prev => ({
        cpuLoad: Math.min(95, Math.max(20, prev.cpuLoad + (Math.random() * 6 - 3))),
        ramLoad: Math.min(90, Math.max(45, prev.ramLoad + (Math.random() * 2 - 1))),
        gpuTemp: Math.min(85, Math.max(50, prev.gpuTemp + (Math.random() * 2 - 1))),
        gpuVram: Math.min(96, Math.max(40, prev.gpuVram + (Math.random() * 4 - 2))),
        networkGbps: Number((prev.networkGbps + (Math.random() * 1.5 - 0.75)).toFixed(1)),
        diskIops: Math.round(prev.diskIops + (Math.random() * 100 - 50)),
      }));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
              Monitoring & Observability Operations HUD
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Prometheus node-exporter telemetry, NVIDIA DCGM GPU metrics, and Grafana system thresholds.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>SCRAPE INTERVAL: 1.0s (PROMETHEUS V2.54)</span>
        </div>
      </div>

      {/* Primary Telemetry Gauges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* CPU */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
          <div className="text-[10px] text-slate-400 uppercase flex items-center justify-between">
            <span>CLUSTER CPU</span>
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-slate-100">{metrics.cpuLoad.toFixed(0)}%</div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full transition-all" style={{ width: `${metrics.cpuLoad}%` }} />
          </div>
        </div>

        {/* RAM */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
          <div className="text-[10px] text-slate-400 uppercase flex items-center justify-between">
            <span>SYSTEM RAM</span>
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-xl font-bold text-slate-100">{metrics.ramLoad.toFixed(0)}%</div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-cyan-400 h-full transition-all" style={{ width: `${metrics.ramLoad}%` }} />
          </div>
        </div>

        {/* GPU Temp */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
          <div className="text-[10px] text-slate-400 uppercase flex items-center justify-between">
            <span>GPU TEMP</span>
            <Thermometer className="w-3.5 h-3.5 text-red-400" />
          </div>
          <div className="text-xl font-bold text-slate-100">{metrics.gpuTemp.toFixed(0)}°C</div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-red-400 h-full transition-all" style={{ width: `${(metrics.gpuTemp / 90) * 100}%` }} />
          </div>
        </div>

        {/* GPU VRAM */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
          <div className="text-[10px] text-slate-400 uppercase flex items-center justify-between">
            <span>GPU VRAM</span>
            <Zap className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-xl font-bold text-slate-100">{metrics.gpuVram.toFixed(0)}%</div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-purple-400 h-full transition-all" style={{ width: `${metrics.gpuVram}%` }} />
          </div>
        </div>

        {/* Network */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
          <div className="text-[10px] text-slate-400 uppercase flex items-center justify-between">
            <span>THROUGHPUT</span>
            <Wifi className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-xl font-bold text-slate-100">{metrics.networkGbps} Gbps</div>
          <div className="text-[10px] text-slate-500">100G RoCEv2 Fabric</div>
        </div>

        {/* Disk IOPS */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
          <div className="text-[10px] text-slate-400 uppercase flex items-center justify-between">
            <span>DISK IOPS</span>
            <HardDrive className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-slate-100">{metrics.diskIops.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500">ZFS ARC Cache Hit: 99.2%</div>
        </div>
      </div>

      {/* Alert Manager Status */}
      <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ACTIVE PROMETHEUS ALERT RULES (0 FIRING / 18 PASSING)
          </span>
          <span className="text-[10px] text-emerald-400 font-bold">ALL SYSTEMS NORMAL</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded bg-black/60 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-300">DiskSpaceExhaustionAlert</span>
            <span className="text-emerald-400 text-[10px] font-bold">PASSING (&lt; 85%)</span>
          </div>
          <div className="p-3 rounded bg-black/60 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-300">GpuOverheatThrottleAlert</span>
            <span className="text-emerald-400 text-[10px] font-bold">PASSING (&lt; 82°C)</span>
          </div>
          <div className="p-3 rounded bg-black/60 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-300">ServiceOutageFailoverAlert</span>
            <span className="text-emerald-400 text-[10px] font-bold">PASSING (0 drops)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
