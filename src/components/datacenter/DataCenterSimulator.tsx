/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Data Center Floor Simulator & 42U Server Racks
 */

import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext.tsx';
import { DATACENTER_RACKS, INCIDENT_SCENARIOS, RackUnitDevice, ServerRack } from '../../data/datacenterData.ts';
import { 
  Server, 
  Activity, 
  Flame, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Cpu, 
  HardDrive, 
  Fan, 
  Thermometer, 
  Wrench, 
  ArrowRight,
  ShieldAlert,
  Play,
  RotateCcw
} from 'lucide-react';

export const DataCenterSimulator: React.FC = () => {
  const { awardXp, completeMission } = useAcademy();

  const [activeRackId, setActiveRackId] = useState<'Rack A' | 'Rack B' | 'Rack C' | 'Rack D'>('Rack A');
  const [selectedDevice, setSelectedDevice] = useState<RackUnitDevice>(DATACENTER_RACKS[0].devices[2]); // srv-web-01 default
  const [activeIncidentId, setActiveIncidentId] = useState<string | null>(null);
  const [incidentResolvedMap, setIncidentResolvedMap] = useState<Record<string, boolean>>({});
  const [remediating, setRemediating] = useState<boolean>(false);

  const currentRack: ServerRack = DATACENTER_RACKS.find(r => r.id === activeRackId) || DATACENTER_RACKS[0];
  const activeIncident = INCIDENT_SCENARIOS.find(inc => inc.id === activeIncidentId);

  const handleExecuteRemediation = (incident: typeof INCIDENT_SCENARIOS[0]) => {
    setRemediating(true);
    setTimeout(() => {
      setIncidentResolvedMap(prev => ({ ...prev, [incident.id]: true }));
      setRemediating(false);
      awardXp(incident.xpReward, `Remediated ${incident.title}`);
    }, 1200);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col font-mono">
      {/* Header & Data Center Environmental Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
              Tiny DC Data Center Floor Simulator
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Virtual 42U equipment racks, power telemetry, high-density AI nodes, and live operational outage drills.
          </p>
        </div>

        {/* Global Facility Telemetry Strip */}
        <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-800 p-2.5 rounded-lg text-xs">
          <div className="flex items-center gap-1.5 text-amber-300">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>18.3 kW Total Load</span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-300">
            <Thermometer className="w-4 h-4 text-cyan-400" />
            <span>21.2°C Ambient</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>PUE 1.14 (Ultra Efficient)</span>
          </div>
        </div>
      </div>

      {/* Rack Switcher Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
        {DATACENTER_RACKS.map(rack => (
          <button
            key={rack.id}
            onClick={() => {
              setActiveRackId(rack.id);
              if (rack.devices.length > 0) setSelectedDevice(rack.devices[0]);
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
              activeRackId === rack.id
                ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {rack.title.split(':')[0]}: {rack.title.split(':')[1]}
          </button>
        ))}
      </div>

      {/* Main Floor & Inspector Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        {/* Left Column: 42U Physical Rack Visualization (7 Cols) */}
        <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-[#070b14] p-5 flex flex-col justify-between overflow-hidden shadow-2xl relative">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3 shrink-0">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">CHASSIS BAY</span>
              <h3 className="text-sm font-bold text-slate-100">{currentRack.title}</h3>
            </div>
            <div className="text-xs text-slate-400">
              Draw: <span className="text-amber-400 font-bold">{currentRack.powerDrawKw} kW</span> / {currentRack.maxPowerKw} kW
            </div>
          </div>

          {/* 42U Server Rack Graphical Chassis */}
          <div className="flex-1 overflow-y-auto p-3 bg-black/60 border-2 border-slate-800 rounded-lg flex flex-col space-y-2">
            {/* Top of rack label */}
            <div className="text-[10px] text-slate-600 text-center uppercase tracking-widest font-bold">
              [ 42U TOP-OF-RACK CABLE TRAY & AIR BAFFLE ]
            </div>

            {/* Devices inside rack */}
            {currentRack.devices.map(device => {
              const isSelected = selectedDevice?.id === device.id;
              return (
                <div
                  key={device.id}
                  onClick={() => setSelectedDevice(device)}
                  className={`p-3 rounded border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'bg-[#0d1524] border-slate-700/80 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-slate-500 w-8">
                      U{device.uSlot}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#00ff88] animate-pulse"></span>
                    <div>
                      <div className="font-bold text-xs text-slate-200">{device.name}</div>
                      <div className="text-[10px] text-slate-400">{device.ip} // {device.os}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="text-slate-400 hidden sm:inline">{device.powerWatts}W</span>
                    <span className="text-cyan-400">{device.tempCelsius}°C</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase font-bold">
                      {device.uHeight}U
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Unused empty slot visualizer */}
            <div className="p-2 border border-dashed border-slate-800/80 rounded text-center text-[10px] text-slate-600 select-none">
              U01 - U16 AVAILABLE BLANK SLOTS (EXPANSION READY)
            </div>
          </div>
        </div>

        {/* Right Column: Device Telemetry & Incident Dispatcher (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4 overflow-y-auto">
          {/* Device Inspector Card */}
          {selectedDevice && (
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">SELECTED HARDWARE NODE</span>
                  <h3 className="text-sm font-bold text-slate-100">{selectedDevice.name}</h3>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase font-bold">
                  {selectedDevice.status}
                </span>
              </div>

              {/* Hardware Specifications */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-emerald-400" /> Processor:
                  </span>
                  <span className="text-slate-200 font-bold">{selectedDevice.cpu}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" /> RAM Memory:
                  </span>
                  <span className="text-slate-200 font-bold">{selectedDevice.ramGb} GB ECC</span>
                </div>
                {selectedDevice.gpu && (
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-purple-400" /> Accelerators:
                    </span>
                    <span className="text-purple-300 font-bold">{selectedDevice.gpu}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <HardDrive className="w-3.5 h-3.5 text-amber-400" /> Raw Storage:
                  </span>
                  <span className="text-slate-200 font-bold">{selectedDevice.storageTb} TB NVMe</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5 text-red-400" /> Thermals:
                  </span>
                  <span className="text-slate-200 font-bold">{selectedDevice.tempCelsius}°C</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Fan className="w-3.5 h-3.5 text-blue-400" /> Cooling Fans:
                  </span>
                  <span className="text-slate-200 font-bold">{selectedDevice.fanRpm} RPM</span>
                </div>
              </div>
            </div>
          )}

          {/* Incident Scenarios Section */}
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider">
                  LIVE OUTAGE DISPATCHER
                </h3>
              </div>
              <span className="text-xs text-slate-400">6 Scenarios</span>
            </div>

            <div className="space-y-2.5">
              {INCIDENT_SCENARIOS.slice(0, 3).map(inc => {
                const isResolved = incidentResolvedMap[inc.id];
                return (
                  <div
                    key={inc.id}
                    className={`p-3 rounded-lg border transition-all ${
                      isResolved
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                        : 'bg-black/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-xs text-slate-200">{inc.title}</div>
                      <span className="text-[10px] text-cyan-400 font-bold">+{inc.xpReward} XP</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">{inc.symptom}</div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500">{inc.affectedRack} // {inc.affectedDevice}</span>
                      {isResolved ? (
                        <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> RESOLVED
                        </span>
                      ) : (
                        <button
                          onClick={() => handleExecuteRemediation(inc)}
                          disabled={remediating}
                          className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-slate-950 font-bold text-[10px] rounded transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Wrench className="w-3 h-3" />
                          <span>{remediating ? 'APPLYING FIX...' : 'REMEDIATE'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
