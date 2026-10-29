/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Server-Side Express Gateway & AI Proxy
 */

import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const app = express();

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ONLINE',
    app: 'Tiny DC Cyber Academy',
    version: '1.0.0',
    aiProviderReady: false,
    aiMode: 'offline-knowledge-engine',
    timestamp: new Date().toISOString(),
  });
});

// AI Tutor proxy endpoint
app.post('/api/tutor', async (req: Request, res: Response) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  // Deterministic local knowledge engine.
  const p = prompt.toLowerCase();
  let fallbackReply = `[Tiny DC Offline Intelligence Unit]\n\n`;

  if (p.includes('vram') || p.includes('gpu') || p.includes('oom')) {
    fallbackReply += `### GPU VRAM & Memory Allocation Breakdown\n\n` +
      `- **Model Weights:** Memory = (Parameters × Bytes-per-weight). For a 7B model at FP16 (2 bytes), weights occupy ~14 GB. At Q4_K_M (0.55 bytes), weights compress to ~4.2 GB.\n` +
      `- **KV Cache:** Memory = 2 × Layers × Heads × Head_Dim × Context_Length × Batch_Size.\n` +
      `- **CUDA Overhead:** PyTorch and CUDA drivers reserve ~1.2 GB.\n` +
      `- **Remedy for OOM:** Switch from FP16 to 4-bit quantization, enable FlashAttention / PagedAttention (vLLM), or reduce context length.`;
  } else if (p.includes('ssh') || p.includes('key')) {
    fallbackReply += `### SSH Key Generation & Hardening\n\n` +
      `1. Generate modern elliptic curve keypair:\n   \`ssh-keygen -t ed25519 -C "operator@tinydc.internal"\`\n` +
      `2. Copy public key to server:\n   \`ssh-copy-id -i ~/.ssh/id_ed25519.pub operator@10.0.1.50\`\n` +
      `3. In \`/etc/ssh/sshd_config\`, enforce key-only auth:\n   \`PasswordAuthentication no\`\n   \`PubkeyAuthentication yes\`\n` +
      `4. Restart daemon: \`sudo systemctl restart ssh\`.`;
  } else if (p.includes('docker') || p.includes('container')) {
    fallbackReply += `### Container Engineering Best Practices\n\n` +
      `- Use multi-stage builds to strip compilers from runtime images.\n` +
      `- Never run containers as root; specify \`USER node\` or \`USER 1000\`.\n` +
      `- Never mount \`/var/run/docker.sock\` inside untrusted containers as it allows host takeover.\n` +
      `- Enforce resource quotas: \`mem_limit: 4g\` and \`cpus: 2.0\` in Compose.`;
  } else if (p.includes('debug') || p.includes('error')) {
    fallbackReply += `### Troubleshooting Checklist\n\n` +
      `1. **Check Exit Codes:** Inspect \`echo $?\` or container exit codes (e.g. 137 = OOMKilled).\n` +
      `2. **Inspect Logs:** Use \`journalctl -u <service> -n 50 --no-pager\` or \`docker logs <container>\`.\n` +
      `3. **Verify Listening Ports:** Run \`ss -tulpn\` to confirm daemon is bound to 0.0.0.0 or 127.0.0.1.\n` +
      `4. **Inspect Storage:** Check \`df -h\` for 100% full partitions.`;
  } else {
    fallbackReply += `I have analyzed your query: "${prompt}".\n\n` +
      `In Tiny DC Cyber Academy, all systems follow first-principles engineering:\n` +
      `1. Clearly define inputs, state transitions, and expected outputs.\n` +
      `2. Test edge cases in isolation before deploying to the cluster.\n` +
      `3. Use the Interactive Labs (Coding Lab, SSH Terminal, Data Center Simulator) to verify your changes live!`;
  }

  return res.json({
    reply: fallbackReply,
    source: 'local-knowledge-engine',
  });
});

// Vite Middleware for development mode or static dist in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Tiny DC Cyber Academy] Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('[Tiny DC] Failed to start server:', err);
  process.exit(1);
});
