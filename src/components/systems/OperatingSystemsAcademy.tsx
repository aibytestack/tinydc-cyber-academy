/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Operating Systems Academy (Linux, Windows, macOS)
 */

import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext.tsx';
import { 
  Monitor, 
  Terminal, 
  Layers, 
  ShieldCheck, 
  HardDrive, 
  Cpu, 
  FileText, 
  KeyRound, 
  Activity,
  ArrowRight
} from 'lucide-react';

export const OperatingSystemsAcademy: React.FC = () => {
  const { setActiveView } = useAcademy();
  const [activeOS, setActiveOS] = useState<'linux' | 'windows' | 'macos'>('linux');

  const osData = {
    linux: {
      title: 'Linux Systems Administration (Ubuntu 24.04 LTS)',
      subtitle: 'The backbone of cloud infrastructure, container runtimes, and high-performance computing.',
      icon: Terminal,
      color: 'emerald',
      topics: [
        {
          name: 'Filesystem Hierarchy & FHS',
          desc: '/etc (configuration), /var/log (system logs), /proc (virtual kernel process files), /dev (device nodes).',
        },
        {
          name: 'Systemd Init & Service Management',
          desc: 'Manage daemons with systemctl start/stop/restart, inspect logs with journalctl -u <service> -f.',
        },
        {
          name: 'Users, Groups & Sudo Privileges',
          desc: 'POSIX permissions: user, group, others (chmod 750, chown -R operator:adm), /etc/sudoers validation with visudo.',
        },
        {
          name: 'Networking, Interfaces & UFW',
          desc: 'Inspect IP configuration with `ip addr`, listening sockets with `ss -tulpn`, and firewall with `ufw status`.',
        },
        {
          name: 'Storage, Partitions & LVM',
          desc: 'Block devices with lsblk, filesystem mounting with /etc/fstab, and Logical Volume Management (PV/VG/LV).',
        },
      ],
      commands: [
        { cmd: 'systemctl status <svc>', desc: 'Inspect systemd service daemon health and recent log output.' },
        { cmd: 'journalctl -xeu <svc>', desc: 'Examine detailed kernel and daemon diagnostic logs.' },
        { cmd: 'ss -tulpn', desc: 'Display listening TCP/UDP ports with corresponding process IDs.' },
        { cmd: 'df -h && free -m', desc: 'Display human-readable disk partition and RAM utilization.' },
        { cmd: 'chmod 600 ~/.ssh/id_ed25519', desc: 'Restrict private SSH key permissions to owner read/write only.' },
      ],
    },
    windows: {
      title: 'Windows Server & Enterprise Administration',
      subtitle: 'PowerShell object pipelines, Active Directory, NTFS permissions, and Hyper-V virtualization.',
      icon: Monitor,
      color: 'blue',
      topics: [
        {
          name: 'PowerShell Object Pipelines',
          desc: 'Cmdlets output structured .NET objects rather than plain text byte streams, enabling direct property access.',
        },
        {
          name: 'Active Directory Domain Services (AD DS)',
          desc: 'Centralized directory service for user authentication, Kerberos tickets, and Group Policy Objects (GPOs).',
        },
        {
          name: 'Windows Services & Task Scheduler',
          desc: 'Background service lifecycle management with Get-Service and Start-Service, plus scheduled automation.',
        },
        {
          name: 'NTFS Security & ACLs',
          desc: 'Access Control Lists (ACLs) defining granular Read, Write, Execute, and Modify permissions on drives.',
        },
        {
          name: 'WSL2 (Windows Subsystem for Linux)',
          desc: 'Run a real Linux kernel alongside Windows using Hyper-V lightweight virtualization technology.',
        },
      ],
      commands: [
        { cmd: 'Get-Service | Where-Object Status -eq "Running"', desc: 'Filter running Windows background services.' },
        { cmd: 'Get-Process | Sort-Object CPU -Descending | Select -First 5', desc: 'Identify top 5 CPU-intensive processes.' },
        { cmd: 'Test-NetConnection -ComputerName 10.0.1.20 -Port 5432', desc: 'Verify network connectivity and TCP port handshake.' },
        { cmd: 'Get-EventLog -LogName System -Newest 20', desc: 'Inspect recent Windows Event Viewer system crash logs.' },
      ],
    },
    macos: {
      title: 'macOS Systems & Apple Silicon Architecture',
      subtitle: 'Darwin Unix kernel, Zsh shell, launchd daemons, APFS snapshots, and Unified Memory AI inference.',
      icon: Layers,
      color: 'purple',
      topics: [
        {
          name: 'Darwin UNIX & Zsh',
          desc: 'macOS is certified UNIX (SUSv3 compliant). Zsh is the default shell with Homebrew package management.',
        },
        {
          name: 'Launchd Service Architecture',
          desc: 'macOS replaces init/systemd/cron with launchd, configured via XML property lists in ~/Library/LaunchAgents.',
        },
        {
          name: 'APFS (Apple File System)',
          desc: 'Copy-on-write filesystem with instant local snapshots, space sharing, and hardware encryption.',
        },
        {
          name: 'Apple Silicon & Unified Memory Architecture (UMA)',
          desc: 'CPU and GPU share up to 128GB of high-bandwidth memory (up to 800 GB/s), allowing giant LLMs to run without PCIe transfers.',
        },
      ],
      commands: [
        { cmd: 'launchctl list | grep tinydc', desc: 'Inspect active launchd background daemon processes.' },
        { cmd: 'tmutil listlocalsnapshots /', desc: 'List local APFS Time Machine filesystem snapshots.' },
        { cmd: 'system_profiler SPHardwareDataType', desc: 'Query hardware specs, core counts, and Unified Memory size.' },
        { cmd: 'networksetup -listallhardwareports', desc: 'Inspect physical network interfaces and Wi-Fi adapters.' },
      ],
    },
  };

  const current = osData[activeOS];
  const Icon = current.icon;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
              Operating Systems Academy
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Professional systems administration across Ubuntu Linux, Windows Server, and macOS Apple Silicon.
          </p>
        </div>

        {/* OS Switcher */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveOS('linux')}
            className={`px-3 py-1.5 rounded font-bold transition-all cursor-pointer ${
              activeOS === 'linux' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Linux (Ubuntu 24.04)
          </button>
          <button
            onClick={() => setActiveOS('windows')}
            className={`px-3 py-1.5 rounded font-bold transition-all cursor-pointer ${
              activeOS === 'windows' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Windows Administration
          </button>
          <button
            onClick={() => setActiveOS('macos')}
            className={`px-3 py-1.5 rounded font-bold transition-all cursor-pointer ${
              activeOS === 'macos' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            macOS & Apple Silicon
          </button>
        </div>
      </div>

      {/* Main OS Overview Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto">
        {/* Left Column: Architectural Pillars (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-slate-100">{current.title}</h2>
              <p className="text-xs text-slate-400 mt-1">{current.subtitle}</p>
            </div>

            <div className="space-y-3">
              {current.topics.map((t, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-black/40 border border-slate-800/80 space-y-1">
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    {t.name}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-3">
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Essential Command Reference Table (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-cyan-400" />
                ESSENTIAL COMMAND RUNBOOK
              </h3>
              <span className="text-[10px] text-slate-400">Production Tested</span>
            </div>

            <div className="space-y-2.5">
              {current.commands.map((c, i) => (
                <div key={i} className="p-3 rounded-lg bg-black/80 border border-slate-800 space-y-1">
                  <div className="text-xs font-bold text-cyan-300 font-mono select-all">
                    $ {c.cmd}
                  </div>
                  <div className="text-[11px] text-slate-400 leading-snug">
                    {c.desc}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveView('terminal-ssh')}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-4"
            >
              <Terminal className="w-3.5 h-3.5 fill-slate-950" />
              <span>LAUNCH LIVE TERMINAL LAB</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
