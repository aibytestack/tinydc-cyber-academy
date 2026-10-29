/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Server Engineering Academy
 */

import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext.tsx';
import { 
  Server, 
  Cpu, 
  HardDrive, 
  Zap, 
  Fan, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  FileCode,
  Wrench
} from 'lucide-react';

export const ServerAcademy: React.FC = () => {
  const { awardXp } = useAcademy();
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      step: 1,
      title: '1. Hardware Anatomy & BIOS/UEFI',
      desc: 'Dual socket AMD EPYC / Intel Xeon, ECC DDR5 registered memory channels, PCIe Gen5 bifurcation, and IPMI / iDRAC out-of-band management.',
      checklist: ['Configure UEFI boot order', 'Enable AMD-V / Intel VT-d hardware virtualization', 'Configure IPMI dedicated static IP on VLAN 10'],
    },
    {
      step: 2,
      title: '2. Storage Architecture & RAID Configurations',
      desc: 'NVMe U.3 vs SATA SSDs. Compare hardware RAID controllers (RAID 10 vs RAID 5) with software ZFS RAIDZ2 pools for data integrity.',
      checklist: ['Create ZFS root mirror on dual boot NVMe drives', 'Enable SMART daily background health check daemon', 'Configure read/write endurance alerts at 80% wear'],
    },
    {
      step: 3,
      title: '3. Operating System Provisioning & Network Bonding',
      desc: 'Automate Ubuntu Server installation via cloud-init. Configure LACP 802.3ad dual 10G interface bonding (bond0) for fault tolerance.',
      checklist: ['Set static IPv4 and IPv6 gateway', 'Configure Netplan yaml with bond0 mode 4', 'Verify redundant switch link failover'],
    },
    {
      step: 4,
      title: '4. Systemd Service Daemon Authoring',
      desc: 'Create production systemd service unit files with restart policies, sandboxed permissions, and resource constraints.',
      checklist: ['Author /etc/systemd/system/tinydc-agent.service', 'Set Restart=always and RestartSec=5s', 'Enable and start service daemon'],
    },
    {
      step: 5,
      title: '5. Runbook Generation & Disaster Recovery Drill',
      desc: 'Author a standardized server maintenance runbook detailing emergency power shutdown, degraded drive hot-swaps, and kernel upgrades.',
      checklist: ['Test simulated drive failure recovery', 'Validate offline cold-boot recovery in < 5 minutes', 'Sign off on server readiness certificate'],
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col font-mono">
      <div className="space-y-1 shrink-0">
        <div className="flex items-center gap-2">
          <Server className="w-5 h-5 text-emerald-400" />
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
            Server Engineering & Hardware Lifecycle Academy
          </h1>
        </div>
        <p className="text-xs text-slate-400">
          From unboxing bare-metal chassis and configuring IPMI/RAID to authoring systemd daemons and high-availability runbooks.
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto">
        {/* Left Column: 5-Phase Server Lifecycle (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-4">
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-2">
              Server Lifecycle Engineering Milestones
            </h2>

            <div className="space-y-3">
              {steps.map(s => {
                const isCurrent = activeStep === s.step;
                return (
                  <div
                    key={s.step}
                    onClick={() => setActiveStep(s.step)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-emerald-950/30 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                        : 'bg-black/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-emerald-400">{s.title}</span>
                      <span className="text-[10px] text-slate-500">Phase {s.step}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Active Phase Checklist & Artifact (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] text-emerald-400 uppercase font-bold">CURRENT RUNBOOK</span>
              <h3 className="text-sm font-bold text-slate-100">{steps[activeStep - 1].title}</h3>
            </div>

            <div className="space-y-2.5">
              {steps[activeStep - 1].checklist.map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-black/60 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                awardXp(100, `Completed server milestone ${activeStep}`);
                if (activeStep < steps.length) setActiveStep(activeStep + 1);
              }}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded transition-all cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.3)]"
            >
              COMPLETE & CERTIFY STAGE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
