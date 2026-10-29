/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Gamified Toast Notification Container
 */

import React from 'react';
import { useAcademy } from '../../context/AcademyContext.tsx';
import { Award, Zap, CheckCircle2, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useAcademy();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full font-mono pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`p-3.5 rounded-xl border shadow-2xl pointer-events-auto flex items-start justify-between gap-3 backdrop-blur-md transition-all animate-in slide-in-from-bottom-2 ${
            toast.type === 'achievement'
              ? 'bg-[#0f1d13]/95 border-emerald-500/80 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
              : toast.type === 'xp'
              ? 'bg-[#0b1726]/95 border-cyan-500/80 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
              : toast.type === 'alert'
              ? 'bg-[#240b0b]/95 border-red-500/80 text-red-300'
              : 'bg-[#150f24]/95 border-purple-500/80 text-purple-300'
          }`}
        >
          <div className="flex items-start gap-2.5">
            {toast.type === 'achievement' && <Award className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
            {toast.type === 'xp' && <Zap className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />}
            {toast.type === 'alert' && <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />}
            {toast.type === 'info' && <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />}

            <div>
              <div className="font-bold text-xs tracking-wider uppercase">{toast.title}</div>
              <div className="text-[11px] text-slate-300 mt-0.5 leading-snug">{toast.message}</div>
            </div>
          </div>

          <button
            onClick={() => dismissToast(toast.id)}
            className="text-slate-400 hover:text-slate-200 p-0.5 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
