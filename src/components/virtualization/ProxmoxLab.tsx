/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Proxmox VE & Hypervisor Virtualization Academy
 */

import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext.tsx';
import { 
  Layers, 
  Server, 
  Cpu, 
  HardDrive, 
  Network, 
  Plus, 
  CheckCircle2, 
  Activity, 
  ShieldCheck,
  RotateCcw,
  Zap
} from 'lucide-react';

interface SimulatedVM {
  vmid: number;
  name: string;
  type: 'qemu' | 'lxc';
  node: string;
  status: 'running' | 'stopped';
  cores: number;
  memoryMb: number;
  diskGb: number;
  ip: string;
}

export const ProxmoxLab: React.FC = () => {
  const { awardXp } = useAcademy();

  const [vms, setVms] = useState<SimulatedVM[]>([
    { vmid: 100, name: 'api-gateway-vm', type: 'qemu', node: 'pve-node-01', status: 'running', cores: 8, memoryMb: 16384, diskGb: 100, ip: '10.0.1.10' },
    { vmid: 101, name: 'database-primary', type: 'qemu', node: 'pve-node-01', status: 'running', cores: 16, memoryMb: 32768, diskGb: 500, ip: '10.0.1.20' },
    { vmid: 102, name: 'lxc-dns-dhcp', type: 'lxc', node: 'pve-node-02', status: 'running', cores: 2, memoryMb: 2048, diskGb: 20, ip: '10.0.0.2' },
    { vmid: 103, name: 'ai-vllm-worker', type: 'qemu', node: 'pve-node-02', status: 'running', cores: 32, memoryMb: 65536, diskGb: 800, ip: '10.0.2.50' },
  ]);

  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newVmName, setNewVmName] = useState<string>('k8s-worker-01');
  const [newVmCores, setNewVmCores] = useState<number>(4);
  const [newVmRamGb, setNewVmRamGb] = useState<number>(8);

  const handleCreateVm = (e: React.FormEvent) => {
    e.preventDefault();
    const nextId = Math.max(...vms.map(v => v.vmid)) + 1;
    const newVm: SimulatedVM = {
      vmid: nextId,
      name: newVmName,
      type: 'qemu',
      node: 'pve-node-01',
      status: 'running',
      cores: newVmCores,
      memoryMb: newVmRamGb * 1024,
      diskGb: 50,
      ip: `10.0.1.${nextId - 50}`,
    };
    setVms(prev => [...prev, newVm]);
    setShowCreateModal(false);
    awardXp(150, `Provisioned virtual machine ${newVmName} (VMID ${nextId})`);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-orange-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
              Proxmox VE & Hypervisor Virtualization Lab
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Type 1 KVM hypervisors, LXC containers, virtual bridges (`vmbr0`), ZFS storage pools, and 3-node HA quorum.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(249,115,22,0.3)]"
        >
          <Plus className="w-4 h-4" />
          <span>CREATE VM / LXC</span>
        </button>
      </div>

      {/* Cluster Quorum Status Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {['pve-node-01 (Master)', 'pve-node-02 (Compute)', 'pve-node-03 (Witness)'].map((node, i) => (
          <div key={i} className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-bold text-slate-200">{node}</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold">QUORUM OK</span>
          </div>
        ))}
      </div>

      {/* Virtual Machines & Containers Inventory Table */}
      <div className="flex-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            PROXMOX VE GUEST INVENTORY
          </h2>
          <span className="text-xs text-slate-400 font-bold">{vms.length} Active Guests</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-2.5">
            {vms.map(vm => (
              <div
                key={vm.vmid}
                className="p-3.5 rounded-lg border border-slate-800 bg-black/60 flex items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-orange-400 w-12">{vm.vmid}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <div>
                    <div className="font-bold text-slate-100 flex items-center gap-2">
                      <span>{vm.name}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded border uppercase font-bold bg-slate-800 text-slate-400 border-slate-700">
                        {vm.type}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {vm.node} // {vm.ip}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-[11px] text-slate-300">
                  <span className="hidden sm:inline">{vm.cores} vCPUs</span>
                  <span className="hidden sm:inline">{vm.memoryMb / 1024} GB RAM</span>
                  <span className="hidden md:inline">{vm.diskGb} GB ZFS</span>
                  <span className="text-emerald-400 font-bold">ONLINE</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Bridge Network: vmbr0 (Default 10G Trunk)</span>
          <span className="text-orange-400 font-bold">Proxmox VE 8.2 Enterprise</span>
        </div>
      </div>

      {/* Create VM Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full space-y-4 font-mono shadow-2xl">
            <h3 className="font-bold text-base text-slate-100 border-b border-slate-800 pb-3">
              Provision New Proxmox Virtual Machine (KVM)
            </h3>

            <form onSubmit={handleCreateVm} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400">VM Hostname:</label>
                <input
                  type="text"
                  value={newVmName}
                  onChange={e => setNewVmName(e.target.value)}
                  className="w-full p-2 bg-black/60 border border-slate-700 rounded text-slate-200"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400">vCPU Cores:</label>
                  <input
                    type="number"
                    min="1"
                    max="64"
                    value={newVmCores}
                    onChange={e => setNewVmCores(Number(e.target.value))}
                    className="w-full p-2 bg-black/60 border border-slate-700 rounded text-slate-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">RAM (GB):</label>
                  <input
                    type="number"
                    min="2"
                    max="512"
                    value={newVmRamGb}
                    onChange={e => setNewVmRamGb(Number(e.target.value))}
                    className="w-full p-2 bg-black/60 border border-slate-700 rounded text-slate-200"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-slate-950 font-bold rounded hover:bg-orange-400 cursor-pointer"
                >
                  Provision VM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
