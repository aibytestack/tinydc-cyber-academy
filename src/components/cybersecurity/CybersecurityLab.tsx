/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Defensive Cybersecurity Laboratory
 */

import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext.tsx';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Terminal, 
  AlertTriangle, 
  CheckCircle2, 
  Bug, 
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const CybersecurityLab: React.FC = () => {
  const { awardXp, completeMission } = useAcademy();
  const [activeTab, setActiveTab] = useState<'sqli' | 'xss' | 'authlog' | 'ufw'>('sqli');

  // SQLi Lab State
  const [sqliInput, setSqliInput] = useState<string>("admin' OR '1'='1");
  const [isParameterized, setIsParameterized] = useState<boolean>(false);
  const [sqliResult, setSqliResult] = useState<string>('');

  // XSS Lab State
  const [xssInput, setXssInput] = useState<string>("<img src=x onerror=alert('PWNED')>");
  const [isSanitized, setIsSanitized] = useState<boolean>(false);

  // UFW Rules State
  const [ufwRules, setUfwRules] = useState<string[]>([
    'ufw default deny incoming',
    'ufw default allow outgoing',
    'ufw allow 22/tcp',
    'ufw allow 443/tcp',
  ]);

  const handleTestSqli = () => {
    if (isParameterized) {
      setSqliResult(`[SECURE EXECUTION] Parameterized query prepared:\nSELECT * FROM users WHERE username = ? AND password = ?\nBinding parameter [0]: "${sqliInput}" (literal string)\nResult: 0 records found. Access Denied.`);
      awardXp(50, 'Verified SQL injection mitigation with prepared statements');
    } else {
      setSqliResult(`[VULNERABLE EXECUTION] Raw string concatenation evaluated:\nSELECT * FROM users WHERE username = '${sqliInput}' AND password = 'password'\nQuery rewritten to: SELECT * FROM users WHERE username = 'admin' OR '1'='1'...\nEXPLOIT SUCCESSFUL! Bypassed authentication as administrator.`);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
              Cybersecurity Laboratory & Defense Drills
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Defensive engineering, input sanitization, log forensics, and zero-trust firewall configurations.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('sqli')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === 'sqli' ? 'bg-red-500/20 text-red-300 font-bold border border-red-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            SQLi Mitigation
          </button>
          <button
            onClick={() => setActiveTab('xss')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === 'xss' ? 'bg-red-500/20 text-red-300 font-bold border border-red-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            XSS Defense
          </button>
          <button
            onClick={() => setActiveTab('authlog')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === 'authlog' ? 'bg-red-500/20 text-red-300 font-bold border border-red-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Auth Log Forensics
          </button>
          <button
            onClick={() => setActiveTab('ufw')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === 'ufw' ? 'bg-red-500/20 text-red-300 font-bold border border-red-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Firewall Hardening
          </button>
        </div>
      </div>

      {/* Main Content Areas */}
      <div className="flex-1 overflow-y-auto">
        {/* Lab 1: SQL Injection Mitigation */}
        {activeTab === 'sqli' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Bug className="w-4 h-4 text-red-400" />
                  <h3 className="font-bold text-sm text-slate-100">SQL Injection Sandbox</h3>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">Mode:</span>
                  <button
                    onClick={() => setIsParameterized(!isParameterized)}
                    className={`px-2.5 py-1 rounded font-bold border transition-all ${
                      isParameterized
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                        : 'bg-red-500/20 text-red-300 border-red-500/50'
                    }`}
                  >
                    {isParameterized ? 'PARAMETERIZED (SECURE)' : 'RAW CONCATENATION (VULNERABLE)'}
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <label className="text-slate-400">Simulated Malicious Username Input:</label>
                <input
                  type="text"
                  value={sqliInput}
                  onChange={e => setSqliInput(e.target.value)}
                  className="w-full px-3 py-2 bg-black/60 border border-slate-700 rounded text-slate-200 font-mono text-xs focus:outline-none focus:border-red-400"
                />
              </div>

              <div className="p-3 rounded bg-black/80 border border-slate-800 text-xs space-y-1">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Query Code Representation:</div>
                <pre className="text-emerald-400 text-xs overflow-x-auto">
                  {isParameterized 
                    ? `db.query('SELECT * FROM users WHERE user = ?', [input]);`
                    : `db.query("SELECT * FROM users WHERE user = '" + input + "'");`}
                </pre>
              </div>

              <button
                onClick={handleTestSqli}
                className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-slate-950 font-bold rounded text-xs transition-all cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              >
                EXECUTE DATABASE QUERY
              </button>
            </div>

            {/* Output & Educational Debrief */}
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-4">
              <div className="flex items-center gap-2 text-slate-200 border-b border-slate-800 pb-3">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm">Query Execution Telemetry</h3>
              </div>

              <div className="p-3 rounded bg-black/80 border border-slate-800 text-xs whitespace-pre-wrap min-h-[140px] text-slate-300">
                {sqliResult || '> Click "EXECUTE DATABASE QUERY" to test input handling.'}
              </div>

              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  THE GOLDEN RULE OF SQL DEFENSE
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Never concatenate untrusted user input into SQL strings. Prepared statements compile the query structure first; user input is then bound strictly as literal data, preventing attackers from modifying the SQL parse tree.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Lab 2: XSS Defense */}
        {activeTab === 'xss' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-sm text-slate-100">Cross-Site Scripting (XSS) Sandbox</h3>
                <button
                  onClick={() => setIsSanitized(!isSanitized)}
                  className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                    isSanitized
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                      : 'bg-red-500/20 text-red-300 border-red-500/50'
                  }`}
                >
                  {isSanitized ? 'SANITIZED (DOMPurify/textContent)' : 'UNSANITIZED (innerHTML)'}
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <label className="text-slate-400">Untrusted HTML/JavaScript Payload:</label>
                <input
                  type="text"
                  value={xssInput}
                  onChange={e => setXssInput(e.target.value)}
                  className="w-full px-3 py-2 bg-black/60 border border-slate-700 rounded text-slate-200 font-mono text-xs focus:outline-none"
                />
              </div>

              <div className="p-4 rounded bg-black/80 border border-slate-800 text-xs space-y-2">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Rendered DOM Preview:</div>
                <div className="p-3 bg-slate-950 rounded border border-slate-800 text-slate-200">
                  {isSanitized ? (
                    <span>{xssInput}</span> // React safe text encoding
                  ) : (
                    <span className="text-red-400">[UNSANITIZED RAW HTML DETECTED] Script tag or event handler executed!</span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3 text-xs">
              <h3 className="font-bold text-sm text-slate-100 border-b border-slate-800 pb-2">
                XSS Prevention Architecture
              </h3>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                XSS occurs when malicious scripts are injected into trusted websites. Modern frameworks (React, Angular) automatically escape variables in templates. When rendering rich HTML, always use an established HTML sanitizer like DOMPurify, and enforce a strong Content-Security-Policy (CSP) HTTP header.
              </p>
            </div>
          </div>
        )}

        {/* Lab 3: Auth Log Forensics */}
        {activeTab === 'authlog' && (
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-100">Forensic Incident Triage: /var/log/auth.log</h3>
              <span className="text-xs px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40">
                ACTIVE BRUTE-FORCE DETECTED
              </span>
            </div>

            <div className="p-4 rounded-lg bg-black/90 border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5 overflow-x-auto max-h-64">
              <div className="text-red-400">Oct 29 06:12:01 srv-db-01 sshd[3102]: Failed password for invalid user root from 198.51.100.24 port 41200 ssh2</div>
              <div className="text-red-400">Oct 29 06:12:02 srv-db-01 sshd[3105]: Failed password for invalid user admin from 198.51.100.24 port 41202 ssh2</div>
              <div className="text-red-400">Oct 29 06:12:03 srv-db-01 sshd[3108]: Failed password for invalid user ubuntu from 198.51.100.24 port 41204 ssh2</div>
              <div className="text-red-400">Oct 29 06:12:04 srv-db-01 sshd[3111]: Failed password for invalid user test from 198.51.100.24 port 41206 ssh2</div>
              <div className="text-emerald-400">Oct 29 06:12:05 srv-db-01 fail2ban.actions[940]: NOTICE [sshd] Ban 198.51.100.24 for 86400 seconds</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
              <div className="p-3 rounded bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[10px]">ATTACKER IP</div>
                <div className="text-red-400 font-bold text-sm">198.51.100.24</div>
              </div>
              <div className="p-3 rounded bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[10px]">FAILED ATTEMPTS</div>
                <div className="text-amber-400 font-bold text-sm">4 in 3 seconds</div>
              </div>
              <div className="p-3 rounded bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[10px]">MITIGATION STATUS</div>
                <div className="text-emerald-400 font-bold text-sm">Fail2ban 24h Ban</div>
              </div>
            </div>
          </div>
        )}

        {/* Lab 4: UFW Linux Firewall Hardening */}
        {activeTab === 'ufw' && (
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-100">UFW (Uncomplicated Firewall) Hardening</h3>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                STATUS: ACTIVE
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="text-slate-400 text-[11px] font-bold">Active Firewall Rules:</div>
              <div className="p-3 rounded bg-black/80 border border-slate-800 space-y-1 text-slate-200">
                {ufwRules.map((r, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-emerald-400">$</span>
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setUfwRules(prev => [...prev, 'ufw deny 3306/tcp']);
                awardXp(50, 'Blocked exposed MySQL port 3306 on external interface');
              }}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded transition-all cursor-pointer"
            >
              + Add Rule: Block Public MySQL Port 3306
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
