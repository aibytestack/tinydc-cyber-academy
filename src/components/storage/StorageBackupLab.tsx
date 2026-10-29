/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Storage, Backups & Disaster Recovery Lab
 */

import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext.tsx';
import { 
  HardDrive, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  FileCheck,
  ArrowRight
} from 'lucide-react';

export const StorageBackupLab: React.FC = () => {
  const { awardXp } = useAcademy();

  const [snapshots, setSnapshots] = useState([
    { id: 'snap-20261029-0400', time: 'Today 04:00 UTC', size: '1.4 GB', integrity: 'VERIFIED', type: 'Hourly Differential' },
    { id: 'snap-20261029-0000', time: 'Today 00:00 UTC', size: '42.8 GB', integrity: 'VERIFIED', type: 'Daily Full ZFS' },
    { id: 'snap-20261028-0000', time: 'Yesterday 00:00 UTC', size: '42.1 GB', integrity: 'VERIFIED', type: 'Daily Full ZFS' },
  ]);

  const [drillRunning, setDrillRunning] = useState<boolean>(false);
  const [drillStatus, setDrillStatus] = useState<string>('Ready to test automated recovery drill.');

  const handleRunRecoveryDrill = () => {
    setDrillRunning(true);
    setDrillStatus('1. Provisioning isolated ephemeral recovery sandbox...');
    
    setTimeout(() => {
      setDrillStatus('2. Mounting target snapshot snap-20261029-0400 with zfs receive...');
    }, 500);

    setTimeout(() => {
      setDrillStatus('3. Executing SHA256 checksum audit on PostgreSQL databases and model weights...');
    }, 1000);

    setTimeout(() => {
      setDrillStatus('RECOVERY TEST PASSED: 100% data integrity verified. RTO: 3.2 minutes (Target <= 15 min).');
      setDrillRunning(false);
      awardXp(120, 'Successfully executed Disaster Recovery Restore Drill');
    }, 1600);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col font-mono">
      <div className="space-y-1 shrink-0">
        <div className="flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-amber-400" />
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
            Storage Architecture & Disaster Recovery Lab
          </h1>
        </div>
        <p className="text-xs text-slate-400">
          ZFS RAIDZ2 pools, 3-2-1 backup strategy, immutable snapshot replication, and automated recovery validation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3-2-1 Strategy Card */}
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3 text-xs">
          <div className="font-bold text-emerald-400 text-sm flex items-center gap-1.5 uppercase">
            <ShieldCheck className="w-4 h-4" />
            3-2-1 BACKUP STANDARD
          </div>
          <div className="space-y-2 text-slate-300">
            <div className="p-2.5 rounded bg-black/60 border border-slate-800">
              <span className="text-amber-400 font-bold">3 COPIES:</span> 1 Primary Production copy + 2 Independent Backups.
            </div>
            <div className="p-2.5 rounded bg-black/60 border border-slate-800">
              <span className="text-cyan-400 font-bold">2 MEDIA TYPES:</span> Local NVMe ZFS Mirror + SAN / LTO Tape / TrueNAS Vault.
            </div>
            <div className="p-2.5 rounded bg-black/60 border border-slate-800">
              <span className="text-purple-400 font-bold">1 OFF-SITE:</span> Encrypted remote replica or air-gapped immutable target.
            </div>
          </div>
        </div>

        {/* Snapshot Catalog */}
        <div className="lg:col-span-2 p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider">
              ZFS SNAPSHOT CATALOG (POOL: zfs-vault-01)
            </h3>
            <span className="text-xs text-emerald-400 font-bold">ZFS SEND/RECEIVE ENABLED</span>
          </div>

          <div className="space-y-2 text-xs">
            {snapshots.map(s => (
              <div key={s.id} className="p-3 rounded-lg bg-black/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-200">{s.id}</div>
                  <div className="text-[10px] text-slate-400">{s.time} // {s.type}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-slate-300">{s.size}</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {s.integrity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-3">
            <div className="p-3 rounded bg-black/90 border border-slate-800 text-xs text-slate-300">
              {drillStatus}
            </div>
            <button
              onClick={handleRunRecoveryDrill}
              disabled={drillRunning}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded transition-all cursor-pointer shadow-[0_0_12px_rgba(245,158,11,0.25)] flex items-center justify-center gap-1.5"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${drillRunning ? 'animate-spin' : ''}`} />
              <span>{drillRunning ? 'REHEARSING RESTORE DRILL...' : 'EXECUTE DISASTER RECOVERY DRILL'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
