import test from 'node:test';
import assert from 'node:assert/strict';
import { runJavaScriptSandbox, runSqlQuery, executeBashCommand } from './codeRunner.ts';

test('runJavaScriptSandbox executes code and validates test cases', () => {
  const code = `
    function solution(a, b) {
      return a + b;
    }
  `;
  const testCases = [
    { id: 't1', description: 'adds 2 and 3', input: 'solution(2, 3)', expectedOutput: 5 },
    { id: 't2', description: 'adds negative numbers', input: 'solution(-4, 10)', expectedOutput: 6 },
  ];

  const result = runJavaScriptSandbox(code, testCases);
  assert.equal(result.success, true);
  assert.equal(result.testResults.length, 2);
  assert.equal(result.testResults[0].passed, true);
  assert.equal(result.testResults[1].passed, true);
});

test('runJavaScriptSandbox handles arrays and objects cleanly', () => {
  const code = `
    function solution(arr) {
      return arr.filter(x => x > 5);
    }
  `;
  const testCases = [
    { id: 't-arr', description: 'filters numbers > 5', input: 'solution([2, 4, 6, 8])', expectedOutput: '[6,8]' },
  ];
  const result = runJavaScriptSandbox(code, testCases);
  assert.equal(result.success, true);
  assert.equal(result.testResults[0].passed, true);
});

test('runSqlQuery filters servers table with WHERE clause', () => {
  const query = "SELECT hostname, ip, status FROM datacenter_servers WHERE status = 'online'";
  const result = runSqlQuery(query);
  assert.equal(result.success, true);
  assert.ok(result.rowCount >= 4);
  assert.ok(result.rows?.every(r => r.status === 'online'));
});

test('executeBashCommand runs pwd, ls and pipe grep in virtual filesystem', () => {
  const pwdRes = executeBashCommand('pwd');
  assert.equal(pwdRes.output, '/home/operator');

  const catRes = executeBashCommand('cat /etc/hostname');
  assert.match(catRes.output, /tinydc-node-01/);

  const pipeRes = executeBashCommand('cat /var/log/auth.log | grep Accepted');
  assert.match(pipeRes.output, /Accepted publickey/);
});
