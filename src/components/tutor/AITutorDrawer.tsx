/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Cyber AI Tutor & Technical Mentor
 */

import React, { useState, useEffect, useRef } from 'react';
import { useAcademy } from '../../context/AcademyContext.tsx';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  HelpCircle, 
  RotateCcw, 
  Terminal, 
  Code2, 
  ShieldCheck, 
  Lightbulb,
  CheckCircle2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  source?: 'local-knowledge-engine';
  timestamp: string;
}

export const AITutorDrawer: React.FC = () => {
  const { isTutorOpen, setIsTutorOpen, tutorInitialPrompt } = useAcademy();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'tutor',
      text: 'Greetings, Operative. I am the Tiny DC Cyber Academy AI Instructor.\n\nAsk me any concept, paste broken code for debugging assistance, request a technical explanation, or ask for a practice problem.',
      timestamp: '06:00 UTC',
    },
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tutorInitialPrompt) {
      handleSendPrompt(tutorInitialPrompt);
    }
  }, [tutorInitialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSendPrompt = async (promptToSend: string) => {
    const text = promptToSend.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `${Date.now()}-user`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [
          ...prev,
          {
            id: `${Date.now()}-tutor`,
            sender: 'tutor',
            text: data.reply,
            source: data.source,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        throw new Error('API request returned non-200');
      }
    } catch (err) {
      // Deterministic emergency fallback in case network proxy is unavailable
      setMessages(prev => [
        ...prev,
        {
          id: `${Date.now()}-tutor`,
          sender: 'tutor',
          text: `[Offline Instructor Response]\n\nI have analyzed your query regarding "${text}".\n\nEnsure you:\n1. Check exit codes and log files in /var/log.\n2. Confirm memory limits and avoid OOM allocation errors.\n3. Verify function parameter signatures and edge case handling.`,
          source: 'local-knowledge-engine',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendPrompt(inputText);
  };

  if (!isTutorOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-[#080d16] border-l border-slate-800 z-50 flex flex-col shadow-2xl font-mono">
      {/* Drawer Header */}
      <div className="h-14 border-b border-slate-800 px-4 flex items-center justify-between bg-slate-900/60">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-100">Tiny DC AI Instructor</div>
            <div className="text-[10px] text-purple-400">Always Available // Offline Capable</div>
          </div>
        </div>

        <button
          onClick={() => setIsTutorOpen(false)}
          className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          title="Close AI Tutor"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Prompts Bar */}
      <div className="p-2 border-b border-slate-800 bg-black/40 flex gap-1.5 overflow-x-auto text-[10px]">
        <button
          onClick={() => handleSendPrompt('Explain the difference between Type 1 and Type 2 hypervisors.')}
          className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 whitespace-nowrap cursor-pointer"
        >
          Hypervisors
        </button>
        <button
          onClick={() => handleSendPrompt('How do I calculate KV Cache VRAM memory for an LLM?')}
          className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 whitespace-nowrap cursor-pointer"
        >
          VRAM Math
        </button>
        <button
          onClick={() => handleSendPrompt('What is the difference between an SSH snapshot and an independent backup?')}
          className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 whitespace-nowrap cursor-pointer"
        >
          Snapshots vs Backups
        </button>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`p-3 rounded-lg max-w-[90%] whitespace-pre-wrap leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-purple-600 text-white rounded-br-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[9px] text-slate-400 mt-1 px-1">
              {msg.timestamp} {msg.source && `(${msg.source})`}
            </span>
          </div>
        ))}
        {isThinking && (
          <div className="flex items-center gap-2 text-purple-400 text-xs py-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
            <span>Analyzing system parameters...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-slate-800 bg-slate-900/60 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Ask AI Tutor for guidance or debug help..."
          className="flex-1 bg-black/60 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isThinking}
          className="p-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-slate-950 font-bold rounded-lg cursor-pointer transition-all"
        >
          <Send className="w-4 h-4 fill-slate-950" />
        </button>
      </form>
    </div>
  );
};
