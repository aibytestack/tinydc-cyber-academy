/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Settings & Local-First Data Management
 */

import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext.tsx';
import { 
  Settings, 
  Download, 
  Upload, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Eye, 
  ShieldAlert, 
  X,
  CheckCircle2
} from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const { 
    setActiveView, 
    exportProgressJson, 
    importProgressJson, 
    resetProgress, 
    soundEnabled, 
    setSoundEnabled,
    reducedMotion,
    setReducedMotion,
    highContrast,
    setHighContrast
  } = useAcademy();

  const [importText, setImportText] = useState<string>('');
  const [importStatus, setImportStatus] = useState<string>('');

  const handleDownloadBackup = () => {
    const json = exportProgressJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tinydc_cyber_academy_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!importText.trim()) return;
    const ok = importProgressJson(importText);
    if (ok) {
      setImportStatus('Backup successfully imported! Progress restored.');
      setImportText('');
    } else {
      setImportStatus('Failed to import backup. Please check JSON syntax.');
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto h-[calc(100vh-4rem)] flex flex-col font-mono overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 shrink-0">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-emerald-400" />
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
            System Settings & Progress Management
          </h1>
        </div>
        <button
          onClick={() => setActiveView('command-center')}
          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs cursor-pointer"
        >
          Close
        </button>
      </div>

      {/* Local-First Persistence & Backups */}
      <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-4">
        <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider flex items-center gap-2">
          <Download className="w-4 h-4 text-cyan-400" />
          LOCAL-FIRST PROGRESS BACKUP & RESTORATION
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          All your ranks, completed coding missions, projects, and XP are stored locally on your device without requiring third-party cloud accounts. You can download an encrypted JSON backup file or restore your profile at any time.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={handleDownloadBackup}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.3)]"
          >
            <Download className="w-4 h-4" />
            <span>EXPORT PROGRESS BACKUP (.JSON)</span>
          </button>
        </div>

        {/* Import JSON Area */}
        <div className="space-y-2 pt-3 border-t border-slate-800/80">
          <label className="text-xs text-slate-400">Paste Backup JSON Content to Restore:</label>
          <textarea
            value={importText}
            onChange={e => setImportText(e.target.value)}
            placeholder="Paste your JSON backup data here..."
            className="w-full h-24 p-3 bg-black/60 border border-slate-800 rounded text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
          />
          <div className="flex items-center justify-between">
            <button
              onClick={handleImport}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded transition-all cursor-pointer flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>IMPORT & RESTORE PROGRESS</span>
            </button>
            {importStatus && (
              <span className="text-xs text-cyan-400 font-bold">{importStatus}</span>
            )}
          </div>
        </div>
      </div>

      {/* Accessibility & Interface Preferences */}
      <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-4">
        <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider flex items-center gap-2">
          <Eye className="w-4 h-4 text-purple-400" />
          ACCESSIBILITY & INTERFACE CONTROLS
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-slate-800">
            <div>
              <div className="font-bold text-slate-200">Terminal Sound Effects</div>
              <div className="text-[11px] text-slate-400">Play auditory feedback cues on mission clears and terminal outputs.</div>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-3 py-1.5 rounded font-bold border transition-all ${
                soundEnabled ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500' : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {soundEnabled ? 'ENABLED' : 'MUTED'}
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-slate-800">
            <div>
              <div className="font-bold text-slate-200">Reduced Motion Mode</div>
              <div className="text-[11px] text-slate-400">Disable pulsing animations and packet trace transitions.</div>
            </div>
            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              className={`px-3 py-1.5 rounded font-bold border transition-all ${
                reducedMotion ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500' : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {reducedMotion ? 'ENABLED' : 'STANDARD'}
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone: Factory Reset */}
      <div className="p-5 rounded-xl border border-red-500/30 bg-red-950/20 space-y-3">
        <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          DANGER ZONE // PROFILE FACTORY RESET
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Resetting will clear all your earned XP, unlocked achievements, completed lessons, and returned rank to Recruit (Level 1). This operation is permanent.
        </p>
        <button
          onClick={() => {
            if (confirm('Are you sure you want to reset all Tiny DC Cyber Academy progress?')) {
              resetProgress();
            }
          }}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-slate-950 font-bold text-xs rounded transition-all cursor-pointer"
        >
          CONFIRM FACTORY RESET
        </button>
      </div>
    </div>
  );
};
