/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Visual Network Topology Simulator & Packet Tracer
 */

import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext.tsx';
import { NetworkNode, NetworkLink } from '../../types/academy.ts';
import { 
  Network, 
  Router, 
  Server, 
  ShieldCheck, 
  Play, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Wifi, 
  Cpu,
  ArrowRight,
  Zap
} from 'lucide-react';

export const NetworkSimulator: React.FC = () => {
  const { awardXp, completeMission } = useAcademy();

  const [nodes, setNodes] = useState<NetworkNode[]>([
    { id: 'gw-router', label: 'Edge Router (Core-01)', type: 'router', ip: '10.0.0.1', subnetMask: '255.255.255.0', gateway: '0.0.0.0', mac: '00:1A:2B:3C:4D:01', services: ['BGP', 'OSPF', 'NAT'], status: 'online', x: 260, y: 50 },
    { id: 'firewall', label: 'Enterprise Firewall', type: 'firewall', ip: '10.0.0.254', subnetMask: '255.255.255.0', gateway: '10.0.0.1', mac: '00:1A:2B:3C:4D:02', services: ['Stateful Inspection', 'IDS/IPS'], status: 'online', x: 260, y: 150 },
    { id: 'core-switch', label: 'Core Switch (ToR-A)', type: 'switch', ip: '10.0.0.250', subnetMask: '255.255.255.0', gateway: '10.0.0.1', mac: '00:1A:2B:3C:4D:03', services: ['802.1Q VLANs', 'LACP'], status: 'online', x: 260, y: 250 },
    { id: 'dns-server', label: 'BIND9 DNS Core', type: 'dns', ip: '10.0.0.2', subnetMask: '255.255.255.0', gateway: '10.0.0.1', mac: '00:1A:2B:3C:4D:04', services: ['DNS:53', 'DHCP:67'], status: 'online', x: 60, y: 250 },
    { id: 'srv-web-01', label: 'srv-web-01 (API Gateway)', type: 'server', ip: '10.0.1.10', subnetMask: '255.255.255.0', gateway: '10.0.0.1', mac: '00:1A:2B:3C:4D:10', services: ['Nginx:443', 'REST API'], status: 'online', x: 60, y: 380 },
    { id: 'srv-db-01', label: 'srv-db-01 (PostgreSQL)', type: 'server', ip: '10.0.1.20', subnetMask: '255.255.255.0', gateway: '10.0.0.1', mac: '00:1A:2B:3C:4D:20', services: ['PostgreSQL:5432'], status: 'online', x: 260, y: 380 },
    { id: 'srv-gpu-01', label: 'srv-gpu-01 (AI Compute)', type: 'gpu-node', ip: '10.0.2.50', subnetMask: '255.255.255.0', gateway: '10.0.0.1', mac: '00:1A:2B:3C:4D:50', services: ['vLLM:8000', 'CUDA 12.4'], status: 'online', x: 460, y: 380 },
  ]);

  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(nodes[4]); // default srv-web-01
  const [sourceNodeId, setSourceNodeId] = useState<string>('srv-web-01');
  const [targetNodeId, setTargetNodeId] = useState<string>('srv-db-01');
  const [isTracing, setIsTracing] = useState<boolean>(false);
  const [traceLogs, setTraceLogs] = useState<string[]>([
    'Network topology initialized. 7 nodes active across 3 subnets.',
    'Select source and target nodes and click "TRACE PACKET" to simulate packet travel.',
  ]);

  const handleTracePacket = () => {
    setIsTracing(true);
    const sourceNode = nodes.find(n => n.id === sourceNodeId);
    const targetNode = nodes.find(n => n.id === targetNodeId);

    if (!sourceNode || !targetNode) return;

    setTraceLogs([
      `[TRACE START] Sending TCP SYN packet from ${sourceNode.label} (${sourceNode.ip}) -> ${targetNode.label} (${targetNode.ip})`,
    ]);

    setTimeout(() => {
      setTraceLogs(prev => [
        ...prev,
        `[HOP 1] ARP resolution: Target IP ${targetNode.ip} is on local bridge. Forwarding via Core Switch (MAC: ${targetNode.mac}).`,
      ]);
    }, 400);

    setTimeout(() => {
      setTraceLogs(prev => [
        ...prev,
        `[HOP 2] Firewall packet inspection: Stateful rule checked. Ingress permitted on port. Latency: 0.18ms.`,
      ]);
    }, 800);

    setTimeout(() => {
      setTraceLogs(prev => [
        ...prev,
        `[HOP 3] Packet delivered to destination ${targetNode.label}. TCP SYN-ACK handshake established!`,
        `[SUMMARY] Round-Trip Time (RTT): 0.36ms | Jitter: 0.02ms | Packet Loss: 0%`,
      ]);
      setIsTracing(false);
      awardXp(75, 'Verified network routing trace');
    }, 1200);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-blue-400" />
            <h1 className="text-xl sm:text-2xl font-mono font-bold text-slate-100">
              Visual Network Simulator & Packet Tracer
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Interactive topology designer, subnet routing, ARP table inspection, and packet traversal drills.
          </p>
        </div>

        {/* Trace Controller Bar */}
        <div className="flex items-center gap-2 font-mono text-xs bg-slate-900 p-2 rounded-lg border border-slate-800">
          <span className="text-slate-400 text-[10px]">SRC:</span>
          <select 
            value={sourceNodeId} 
            onChange={e => setSourceNodeId(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200"
          >
            {nodes.map(n => <option key={n.id} value={n.id}>{n.label.split(' ')[0]}</option>)}
          </select>

          <span className="text-slate-400 text-[10px]">DST:</span>
          <select 
            value={targetNodeId} 
            onChange={e => setTargetNodeId(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200"
          >
            {nodes.map(n => <option key={n.id} value={n.id}>{n.label.split(' ')[0]}</option>)}
          </select>

          <button
            onClick={handleTracePacket}
            disabled={isTracing}
            className="px-3 py-1 bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold rounded flex items-center gap-1 cursor-pointer transition-all shadow-[0_0_10px_rgba(59,130,246,0.3)]"
          >
            <Play className="w-3 h-3 fill-slate-950" />
            <span>{isTracing ? 'TRACING...' : 'TRACE PACKET'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        {/* Visual Topology Canvas (2 Cols) */}
        <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-[#070c16] relative overflow-hidden flex flex-col p-4 shadow-xl">
          <div className="text-[10px] font-mono font-bold text-slate-500 tracking-wider mb-2 flex items-center justify-between">
            <span>NETWORK TOPOLOGY DIAGRAM (10.0.0.0/21)</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              ALL LINKS OPERATIONAL
            </span>
          </div>

          {/* SVG Map */}
          <div className="flex-1 relative border border-slate-800/60 rounded-lg bg-[#050811] bg-cyber-grid flex items-center justify-center p-4">
            <svg className="w-full h-full max-h-[420px]" viewBox="0 0 540 450">
              {/* Connection Links */}
              <line x1="260" y1="70" x2="260" y2="150" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="260" y1="170" x2="260" y2="250" stroke="#3b82f6" strokeWidth="2" />
              <line x1="60" y1="250" x2="260" y2="250" stroke="#10b981" strokeWidth="2" />
              <line x1="260" y1="270" x2="60" y2="380" stroke="#10b981" strokeWidth="2" />
              <line x1="260" y1="270" x2="260" y2="380" stroke="#10b981" strokeWidth="2" />
              <line x1="260" y1="270" x2="460" y2="380" stroke="#a855f7" strokeWidth="2" />

              {/* Animated packet during trace */}
              {isTracing && (
                <circle cx="260" cy="270" r="6" fill="#00ff88" className="animate-ping" />
              )}

              {/* Nodes */}
              {nodes.map(n => {
                const isSelected = selectedNode?.id === n.id;
                return (
                  <g 
                    key={n.id} 
                    transform={`translate(${n.x}, ${n.y})`}
                    onClick={() => setSelectedNode(n)}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx="0"
                      cy="0"
                      r="22"
                      className={`transition-all ${
                        isSelected 
                          ? 'fill-slate-900 stroke-emerald-400 stroke-2 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]'
                          : 'fill-slate-900 stroke-slate-700 stroke-1 hover:stroke-cyan-400'
                      }`}
                    />
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      className="text-[10px] fill-slate-300 font-mono font-bold pointer-events-none"
                    >
                      {n.type === 'router' ? 'RT' : n.type === 'switch' ? 'SW' : n.type === 'firewall' ? 'FW' : n.type === 'dns' ? 'DNS' : n.type === 'gpu-node' ? 'GPU' : 'SRV'}
                    </text>
                    <text
                      x="0"
                      y="34"
                      textAnchor="middle"
                      className="text-[9px] fill-slate-400 font-mono pointer-events-none"
                    >
                      {n.ip}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Packet Trace Log Output */}
          <div className="mt-3 p-3 rounded bg-black/60 border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1 max-h-32 overflow-y-auto">
            {traceLogs.map((log, i) => (
              <div key={i} className="leading-tight">{log}</div>
            ))}
          </div>
        </div>

        {/* Node Properties & Subnet Inspector (1 Col) */}
        {selectedNode ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between font-mono">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">NODE INSPECTOR</span>
                  <h3 className="text-base font-bold text-slate-100">{selectedNode.label}</h3>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {selectedNode.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">IP Address:</span>
                  <span className="text-emerald-400 font-bold">{selectedNode.ip}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Subnet Mask:</span>
                  <span className="text-slate-300">{selectedNode.subnetMask}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Default Gateway:</span>
                  <span className="text-slate-300">{selectedNode.gateway}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Hardware MAC:</span>
                  <span className="text-slate-300">{selectedNode.mac}</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="text-[11px] text-slate-400 font-bold">Active Daemons & Protocols:</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.services.map(s => (
                    <span key={s} className="px-2 py-1 rounded bg-slate-800 text-[10px] text-cyan-300 border border-slate-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <button
                onClick={() => {
                  setTargetNodeId(selectedNode.id);
                  handleTracePacket();
                }}
                className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 fill-slate-950" />
                <span>PING THIS NODE</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex items-center justify-center text-xs font-mono text-slate-500">
            Select a device on the diagram to inspect properties.
          </div>
        )}
      </div>
    </div>
  );
};
