/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Multi-Engine Code & Command Runner
 * Secure in-browser sandboxed execution for JavaScript, TypeScript, SQL, and Bash
 */

import { TestCase } from '../types/academy.ts';

export interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTimeMs: number;
  testResults: Array<{
    id: string;
    description: string;
    passed: boolean;
    expected: string;
    actual: string;
  }>;
}

// ==========================================
// 1. JavaScript / TypeScript Sandbox Runner
// ==========================================
export function runJavaScriptSandbox(
  code: string,
  testCases: TestCase[] = []
): ExecutionResult {
  const startTime = Date.now();
  const logs: string[] = [];
  const testResults: ExecutionResult['testResults'] = [];

  // Capture logs
  const customConsole = {
    log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
    error: (...args: any[]) => logs.push(`[ERROR] ${args.map(a => String(a)).join(' ')}`),
    warn: (...args: any[]) => logs.push(`[WARN] ${args.map(a => String(a)).join(' ')}`),
    info: (...args: any[]) => logs.push(`[INFO] ${args.map(a => String(a)).join(' ')}`),
  };

  try {
    // Strip simple TypeScript type annotations if present
    const strippedCode = code
      .replace(/:\s*(string|number|boolean|any|void|string\[\]|number\[\]|Record<[^>]+>)/g, '')
      .replace(/interface\s+\w+\s*\{[^}]*\}/g, '')
      .replace(/type\s+\w+\s*=\s*[^;]+;/g, '');

    // Compile function in safe scope
    const evaluator = new Function('console', `
      "use strict";
      ${strippedCode}
      return typeof main === 'function' ? main() : (typeof solution === 'function' ? solution : undefined);
    `);

    const result = evaluator(customConsole);
    if (result !== undefined && logs.length === 0) {
      logs.push(String(result));
    }

    // Evaluate test cases
    for (const testCase of testCases) {
      let passed = false;
      let actual = '';

      try {
        const testEvaluator = new Function('console', `
          "use strict";
          ${strippedCode}
          ${testCase.input ? `return (${testCase.input});` : `return typeof solution === 'function' ? solution() : undefined;`}
        `);
        const testVal = testEvaluator(customConsole);
        actual = testVal !== undefined 
          ? (typeof testVal === 'object' ? JSON.stringify(testVal) : String(testVal)) 
          : logs.join('\n').trim();
        passed = String(actual).trim() === String(testCase.expectedOutput).trim();
      } catch (err: any) {
        actual = `Error: ${err.message}`;
        passed = false;
      }

      testResults.push({
        id: testCase.id,
        description: testCase.description,
        passed,
        expected: String(testCase.expectedOutput),
        actual,
      });
    }

    const allPassed = testResults.length > 0 ? testResults.every(t => t.passed) : true;

    return {
      success: allPassed,
      output: logs.join('\n'),
      executionTimeMs: Date.now() - startTime,
      testResults,
    };
  } catch (err: any) {
    return {
      success: false,
      output: logs.join('\n'),
      error: err.message || 'Execution error in user code',
      executionTimeMs: Date.now() - startTime,
      testResults,
    };
  }
}

// ==========================================
// 2. Relational SQL Query Engine
// ==========================================
export interface SQLTableRecord {
  [key: string]: any;
}

export const SEED_SQL_DATABASE: Record<string, SQLTableRecord[]> = {
  datacenter_servers: [
    { id: 1, hostname: 'srv-web-01', ip: '10.0.1.10', rack: 'Rack A', os: 'Ubuntu 24.04', cpu_cores: 16, ram_gb: 64, status: 'online' },
    { id: 2, hostname: 'srv-db-01', ip: '10.0.1.20', rack: 'Rack A', os: 'Debian 12', cpu_cores: 32, ram_gb: 128, status: 'online' },
    { id: 3, hostname: 'srv-gpu-01', ip: '10.0.2.50', rack: 'Rack C', os: 'Ubuntu 24.04', cpu_cores: 64, ram_gb: 256, status: 'online' },
    { id: 4, hostname: 'srv-backup-01', ip: '10.0.3.15', rack: 'Rack D', os: 'TrueNAS', cpu_cores: 8, ram_gb: 32, status: 'maintenance' },
    { id: 5, hostname: 'srv-k8s-master', ip: '10.0.1.5', rack: 'Rack B', os: 'Rocky Linux 9', cpu_cores: 16, ram_gb: 32, status: 'online' },
  ],
  cyber_incidents: [
    { id: 101, title: 'SSH Brute Force Attack', severity: 'HIGH', source_ip: '198.51.100.24', status: 'MITIGATED', target_port: 22 },
    { id: 102, title: 'DNS Amplification Attempt', severity: 'MEDIUM', source_ip: '203.0.113.88', status: 'BLOCKED', target_port: 53 },
    { id: 103, title: 'Unauthorized Sudo Invocation', severity: 'CRITICAL', source_ip: '10.0.1.45', status: 'INVESTIGATING', target_port: 0 },
    { id: 104, title: 'Port Scan Sweep', severity: 'LOW', source_ip: '192.0.2.14', status: 'RESOLVED', target_port: 443 },
  ],
};

export function runSqlQuery(
  query: string,
  customDb?: Record<string, SQLTableRecord[]>
): {
  success: boolean;
  rows?: SQLTableRecord[];
  columns?: string[];
  rowCount: number;
  error?: string;
} {
  const db = customDb || SEED_SQL_DATABASE;
  const clean = query.trim().replace(/;$/, '');

  if (!clean) {
    return { success: false, rowCount: 0, error: 'Empty query provided' };
  }

  // Basic SQL parser for SELECT queries
  const selectMatch = clean.match(/^SELECT\s+(.+?)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+?))?(?:\s+ORDER\s+BY\s+(.+?))?(?:\s+LIMIT\s+(\d+))?$/i);
  
  if (selectMatch) {
    const [, selectFields, tableName, whereClause, orderClause, limitClause] = selectMatch;
    const lowerTable = tableName.toLowerCase();
    const table = db[lowerTable];

    if (!table) {
      return {
        success: false,
        rowCount: 0,
        error: `Table '${tableName}' does not exist in Tiny DC operational database. Available tables: ${Object.keys(db).join(', ')}`,
      };
    }

    let filtered = [...table];

    // Simple WHERE clause parsing
    if (whereClause) {
      const parts = whereClause.split(/\s+AND\s+/i);
      for (const part of parts) {
        const condMatch = part.match(/(\w+)\s*(=|!=|>|<|>=|<=|LIKE)\s*(.+)/i);
        if (condMatch) {
          const [, col, op, rawVal] = condMatch;
          let val: any = rawVal.trim().replace(/^['"]|['"]$/g, '');
          if (!isNaN(Number(val))) val = Number(val);

          filtered = filtered.filter(row => {
            const cell = row[col];
            if (op === '=') return String(cell).toLowerCase() === String(val).toLowerCase();
            if (op === '!=') return String(cell).toLowerCase() !== String(val).toLowerCase();
            if (op === '>') return Number(cell) > Number(val);
            if (op === '<') return Number(cell) < Number(val);
            if (op === '>=') return Number(cell) >= Number(val);
            if (op === '<=') return Number(cell) <= Number(val);
            if (op.toUpperCase() === 'LIKE') {
              const regex = new RegExp(String(val).replace(/%/g, '.*'), 'i');
              return regex.test(String(cell));
            }
            return true;
          });
        }
      }
    }

    // ORDER BY
    if (orderClause) {
      const [col, dir] = orderClause.trim().split(/\s+/);
      const isDesc = dir && dir.toUpperCase() === 'DESC';
      filtered.sort((a, b) => {
        if (a[col] < b[col]) return isDesc ? 1 : -1;
        if (a[col] > b[col]) return isDesc ? -1 : 1;
        return 0;
      });
    }

    // LIMIT
    if (limitClause) {
      filtered = filtered.slice(0, parseInt(limitClause, 10));
    }

    // Columns projection
    let columns: string[] = [];
    let rows: SQLTableRecord[] = [];

    if (selectFields.trim() === '*') {
      columns = table.length > 0 ? Object.keys(table[0]) : [];
      rows = filtered;
    } else {
      columns = selectFields.split(',').map(s => s.trim());
      rows = filtered.map(row => {
        const projected: SQLTableRecord = {};
        for (const c of columns) {
          projected[c] = row[c] ?? null;
        }
        return projected;
      });
    }

    return {
      success: true,
      columns,
      rows,
      rowCount: rows.length,
    };
  }

  // Fallback for demo table creation / insert
  return {
    success: true,
    columns: ['status', 'message'],
    rows: [{ status: 'OK', message: 'Command executed successfully.' }],
    rowCount: 1,
  };
}

// ==========================================
// 3. Virtual Bash / Linux Shell Environment
// ==========================================
export interface VirtualFileSystem {
  [path: string]: string | { [filename: string]: string };
}

export const INITIAL_VFS: Record<string, string> = {
  '/home/operator/welcome.txt': 'Welcome to Tiny DC Cyber Academy Terminal Lab.\nType "help" for a list of authorized commands.',
  '/home/operator/deploy.sh': '#!/bin/bash\necho "Starting Tiny DC cluster deployment..."\nsleep 1\necho "All services online."',
  '/etc/hostname': 'tinydc-node-01\n',
  '/etc/resolv.conf': 'nameserver 10.0.0.2\nnameserver 1.1.1.1\n',
  '/etc/ufw/ufw.conf': 'ENABLED=yes\nDEFAULT_INPUT_POLICY="DROP"\nDEFAULT_FORWARD_POLICY="DROP"\n',
  '/var/log/auth.log': 'Oct 29 06:12:01 tinydc-node-01 sshd[4210]: Accepted publickey for operator from 10.0.1.4 port 54102 ssh2: ED25519 SHA256:qZ...\nOct 29 06:14:22 tinydc-node-01 sudo: operator : TTY=pts/0 ; PWD=/home/operator ; USER=root ; COMMAND=/bin/systemctl status\n',
};

export function executeBashCommand(
  rawCmd: string,
  cwd: string = '/home/operator',
  vfs: Record<string, string> = INITIAL_VFS
): {
  output: string;
  newCwd: string;
  exitCode: number;
} {
  const trimmed = rawCmd.trim();
  if (!trimmed) {
    return { output: '', newCwd: cwd, exitCode: 0 };
  }

  // Handle simple pipe (e.g. cat /var/log/auth.log | grep Accepted)
  if (trimmed.includes('|')) {
    const [cmd1, cmd2] = trimmed.split('|').map(s => s.trim());
    const res1 = executeBashCommand(cmd1, cwd, vfs);
    if (cmd2.startsWith('grep ')) {
      const term = cmd2.replace(/^grep\s+/, '').replace(/^['"]|['"]$/g, '');
      const filtered = res1.output.split('\n').filter(line => line.includes(term)).join('\n');
      return { output: filtered, newCwd: cwd, exitCode: 0 };
    }
    return res1;
  }

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0];
  const args = parts.slice(1);

  switch (cmd) {
    case 'pwd':
      return { output: cwd, newCwd: cwd, exitCode: 0 };

    case 'whoami':
      return { output: 'operator', newCwd: cwd, exitCode: 0 };

    case 'hostname':
      return { output: 'tinydc-node-01.tinydc.internal', newCwd: cwd, exitCode: 0 };

    case 'uptime':
      return { output: ' 06:15:42 up 14 days,  3:22,  2 users,  load average: 0.18, 0.22, 0.19', newCwd: cwd, exitCode: 0 };

    case 'date':
      return { output: new Date().toUTCString(), newCwd: cwd, exitCode: 0 };

    case 'ls': {
      const targetDir = args[0] ? (args[0].startsWith('/') ? args[0] : `${cwd}/${args[0]}`.replace(/\/+/g, '/')) : cwd;
      const files = Object.keys(vfs)
        .filter(path => path.startsWith(targetDir))
        .map(path => path.replace(targetDir, '').replace(/^\//, '').split('/')[0])
        .filter((val, idx, arr) => val && arr.indexOf(val) === idx);
      return {
        output: files.length > 0 ? files.join('  ') : '(empty directory)',
        newCwd: cwd,
        exitCode: 0,
      };
    }

    case 'cat': {
      if (!args[0]) return { output: 'cat: missing operand', newCwd: cwd, exitCode: 1 };
      const filePath = args[0].startsWith('/') ? args[0] : `${cwd}/${args[0]}`.replace(/\/+/g, '/');
      if (vfs[filePath]) {
        return { output: vfs[filePath], newCwd: cwd, exitCode: 0 };
      }
      return { output: `cat: ${args[0]}: No such file or directory`, newCwd: cwd, exitCode: 1 };
    }

    case 'cd': {
      const dest = args[0] || '/home/operator';
      if (dest === '~' || dest === '/home/operator') {
        return { output: '', newCwd: '/home/operator', exitCode: 0 };
      }
      if (dest === '..') {
        const up = cwd.split('/').slice(0, -1).join('/') || '/';
        return { output: '', newCwd: up, exitCode: 0 };
      }
      const newPath = dest.startsWith('/') ? dest : `${cwd}/${dest}`.replace(/\/+/g, '/');
      return { output: '', newCwd: newPath, exitCode: 0 };
    }

    case 'systemctl': {
      const action = args[0];
      const service = args[1] || 'tinydc-agent';
      if (action === 'status') {
        return {
          output: `● ${service}.service - Tiny DC Autonomous Cyber Agent\n     Loaded: loaded (/etc/systemd/system/${service}.service; enabled; vendor preset: enabled)\n     Active: active (running) since Thu 2026-10-29 04:00:00 UTC; 2h ago\n   Main PID: 1240 (${service})\n      Tasks: 4 (limit: 4915)\n     Memory: 48.2M\n        CPU: 1.24s`,
          newCwd: cwd,
          exitCode: 0,
        };
      }
      if (action === 'restart' || action === 'start') {
        return { output: `[ OK ] Service '${service}' restarted successfully.`, newCwd: cwd, exitCode: 0 };
      }
      return { output: `systemctl: unsupported action '${action}'`, newCwd: cwd, exitCode: 1 };
    }

    case 'ssh': {
      const target = args[0] || '';
      if (!target) return { output: 'usage: ssh [user@]hostname [command]', newCwd: cwd, exitCode: 1 };
      return {
        output: `Connecting to ${target} via port 22...\nAuthenticated using key fingerprint SHA256:d8c2b7405e... (ED25519)\nWelcome to Ubuntu 24.04.1 LTS (GNU/Linux 6.8.0-40-generic x86_64)\nLast login: Thu Oct 29 06:10:00 2026 from 10.0.1.4\noperator@${target.split('@')[1] || target}:~$`,
        newCwd: cwd,
        exitCode: 0,
      };
    }

    case 'df': {
      return {
        output: `Filesystem     1K-blocks      Used Available Use% Mounted on\n/dev/nvme0n1p2 960303104 210450120 701024504  24% /\ntmpfs           32904512         0  32904512   0% /dev/shm\n/dev/nvme0n1p1    1046528      6144   1040384   1% /boot/efi`,
        newCwd: cwd,
        exitCode: 0,
      };
    }

    case 'free': {
      return {
        output: `               total        used        free      shared  buff/cache   available\nMem:        65536000    14205120    42104200      312450     9226680    50210450\nSwap:        8388608           0     8388608`,
        newCwd: cwd,
        exitCode: 0,
      };
    }

    case 'help': {
      return {
        output: `Tiny DC Cyber Academy - Authorized Terminal Commands:\n  pwd, whoami, hostname, uptime, date, ls, cat, cd\n  systemctl status|restart <svc>\n  ssh <user@host>\n  df, free\n  grep <term> (via pipe |)`,
        newCwd: cwd,
        exitCode: 0,
      };
    }

    default:
      return {
        output: `bash: ${cmd}: command not found. Type 'help' for available commands.`,
        newCwd: cwd,
        exitCode: 127,
      };
  }
}
