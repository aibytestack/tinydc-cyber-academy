/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - SSH & Remote Administration Terminal Lab
 */

import React, { useState, useRef, useEffect } from 'react';
import { useAcademy } from '../../context/AcademyContext.tsx';
import { executeBashCommand } from '../../utils/codeRunner.ts';
import { 
  Terminal as TerminalIcon, 
  KeyRound, 
  ShieldCheck, 
  Server, 
  RotateCcw, 
  Sparkles, 
  HelpCircle,
  Play,
  ArrowRight
} from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'system' | 'error';
  text: string;
  timestamp?: string;
}

export const SSHTerminalLab: React.FC = () => {
  const { awardXp, completeMission, openTutorWithPrompt } = useAcademy();
  const [cwd, setCwd] = useState<string>('/home/operator');
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: '1', type: 'system', text: 'Tiny DC Cyber Academy - Remote Administration Environment (v2.4)' },
    { id: '2', type: 'system', text: 'All operations logged for audit compliance. Type "help" for command matrix.' },
    { id: '3', type: 'output', text: 'Last login: Thu Oct 29 06:12:00 2026 from 10.0.1.4 (ED25519 key authentication)' },
  ]);
  const [inputCommand, setInputCommand] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputCommand.trim();
    if (!cmd) return;

    // Add command to history
    setHistory(prev => [
      ...prev,
      { id: `${Date.now()}-cmd`, type: 'command', text: `operator@tinydc-node-01:${cwd}$ ${cmd}` },
    ]);
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    setInputCommand('');

    // Handle clear
    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    // Special SSH keygen simulation
    if (cmd.startsWith('ssh-keygen')) {
      setTimeout(() => {
        setHistory(prev => [
          ...prev,
          { 
            id: `${Date.now()}-out`, 
            type: 'output', 
            text: `Generating public/private ed25519 key pair.\nYour identification has been saved in /home/operator/.ssh/id_ed25519\nYour public key has been saved in /home/operator/.ssh/id_ed25519.pub\nThe key fingerprint is:\nSHA256:d8C9xL20mqZa71PqVbN82... operator@tinydc\nThe key's randomart image is:\n+--[ED25519 256]--+\n|  .o. .          |\n|   .o+ .         |\n|   .+.o          |\n|   . o =         |\n|    . * S        |\n|     = O .       |\n|    + X =        |\n|   . = @ +       |\n|    . + E        |\n+----[SHA256]-----+` 
          },
        ]);
        awardXp(50, 'Generated secure ED25519 SSH Keypair');
      }, 200);
      return;
    }

    // Execute through virtual shell
    const result = executeBashCommand(cmd, cwd);
    setCwd(result.newCwd);

    setTimeout(() => {
      setHistory(prev => [
        ...prev,
        { id: `${Date.now()}-out`, type: result.exitCode === 0 ? 'output' : 'error', text: result.output },
      ]);

      if (cmd.startsWith('ssh ')) {
        awardXp(100, 'Connected to remote node via SSH');
      }
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputCommand(commandHistory[nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputCommand('');
      } else {
        setHistoryIndex(nextIndex);
        setInputCommand(commandHistory[nextIndex] || '');
      }
    }
  };

  const handleQuickCommand = (cmd: string) => {
    setInputCommand(cmd);
    inputRef.current?.focus();
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl sm:text-2xl font-mono font-bold text-slate-100">
              SSH & Remote Systems Terminal
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Interactive command shell. Master key-based authentication, config aliasing, and remote server tunnels.
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            onClick={() => handleQuickCommand('ssh operator@10.0.1.20')}
            className="px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 flex items-center gap-1.5 cursor-pointer"
          >
            <Server className="w-3.5 h-3.5 text-cyan-400" />
            <span>ssh srv-db-01</span>
          </button>
          <button
            onClick={() => handleQuickCommand('ssh-keygen -t ed25519 -C "operator@tinydc"')}
            className="px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-slate-700 flex items-center gap-1.5 cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
            <span>Generate ED25519 Key</span>
          </button>
          <button
            onClick={() => handleQuickCommand('cat /var/log/auth.log | grep Accepted')}
            className="px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-purple-300 border border-slate-700 flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>Audit Auth Log</span>
          </button>
        </div>
      </div>

      {/* Terminal Screen Container */}
      <div 
        onClick={() => inputRef.current?.focus()}
        className="flex-1 rounded-xl border border-slate-800 bg-[#050911] shadow-2xl flex flex-col overflow-hidden relative scanlines font-mono cursor-text"
      >
        {/* Terminal Title Bar */}
        <div className="h-9 bg-[#0b101c] border-b border-slate-800 px-4 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            <span className="text-[11px] text-slate-400 ml-2 font-bold">
              operator@tinydc-node-01: {cwd} (OpenSSH 9.6p1)
            </span>
          </div>
          <span className="text-[10px] text-slate-400">TTY: /dev/pts/0</span>
        </div>

        {/* Terminal Output Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 text-xs">
          {history.map(item => (
            <div key={item.id} className="whitespace-pre-wrap leading-relaxed">
              {item.type === 'command' && (
                <div className="text-emerald-400 font-bold">{item.text}</div>
              )}
              {item.type === 'output' && (
                <div className="text-slate-300">{item.text}</div>
              )}
              {item.type === 'system' && (
                <div className="text-cyan-400/80 font-semibold">{item.text}</div>
              )}
              {item.type === 'error' && (
                <div className="text-red-400">{item.text}</div>
              )}
            </div>
          ))}

          {/* Active Input Line */}
          <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-1">
            <span className="text-emerald-400 font-bold shrink-0">
              operator@tinydc-node-01:{cwd}$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputCommand}
              onChange={e => setInputCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoFocus
              className="flex-1 bg-transparent text-slate-100 focus:outline-none font-mono text-xs caret-emerald-400"
            />
          </form>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};
