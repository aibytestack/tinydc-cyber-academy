/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Project Workshop Catalog
 */

import { Project } from '../types/academy.ts';

export const PROJECTS: Project[] = [
  // Beginner Projects
  {
    id: 'proj-01',
    title: 'Subnet & CIDR Calculator Utility',
    difficulty: 'beginner',
    category: 'networking',
    estimatedHours: 4,
    overview: 'Build a network engineering utility that accepts an IPv4 address and CIDR prefix (e.g., 192.168.1.50/26), and computes network address, broadcast address, netmask, and usable host range.',
    architectureNotes: 'Use bitwise operations (&, |, ~) on 32-bit unsigned integers to compute network and host portions.',
    prerequisites: ['JavaScript Basics', 'IPv4 Fundamentals'],
    milestones: [
      {
        title: 'Parse IP and CIDR prefix',
        description: 'Convert string octets into 32-bit integer',
        starterTask: 'Implement parseIPv4(ipString)',
        validationCheck: 'Returns numeric 32-bit representation',
      },
      {
        title: 'Calculate netmask and broadcast',
        description: 'Bitwise shift to create subnet mask',
        starterTask: 'Implement calculateSubnetMask(cidr)',
        validationCheck: '/24 equals 255.255.255.0',
      },
    ],
    starterCodeFile: 'subnet_calculator.js',
    starterCode: `function calculateSubnet(ip, cidr) {
  // Compute total usable hosts: 2^(32 - cidr) - 2
  const totalHosts = Math.pow(2, 32 - cidr) - 2;
  return { ip, cidr, usableHosts: Math.max(0, totalHosts) };
}`,
    expectedOutcome: 'A tested function returning exact host counts and addresses for any valid IPv4 CIDR.',
    xpReward: 250,
  },
  {
    id: 'proj-02',
    title: 'Linux System Information Collector',
    difficulty: 'beginner',
    category: 'systems',
    estimatedHours: 4,
    overview: 'Write a Bash automation script that inspects CPU load, memory usage, disk partitions, and active listening network ports, formatting the telemetry into a structured JSON report.',
    architectureNotes: 'Extract statistics from /proc/stat, /proc/meminfo, df, and ss -tulpn.',
    prerequisites: ['Bash Basics', 'Linux File Hierarchy'],
    milestones: [
      {
        title: 'Extract CPU & Memory Metrics',
        description: 'Parse /proc/meminfo for MemTotal and MemAvailable',
        starterTask: 'Extract free RAM percentage',
        validationCheck: 'Returns numeric percentage',
      },
      {
        title: 'Output Valid JSON Schema',
        description: 'Ensure bash prints valid JSON with error handling',
        starterTask: 'Format output with jq or printf',
        validationCheck: 'JSON.parse() succeeds on report',
      },
    ],
    starterCodeFile: 'sysinfo.sh',
    starterCode: `#!/bin/bash
HOSTNAME=$(hostname)
UPTIME=$(uptime -p)
echo "{\\"hostname\\": \\"$HOSTNAME\\", \\"uptime\\": \\"$UPTIME\\"}"`,
    expectedOutcome: 'A deployable bash script that emits clean JSON system telemetry for monitoring agents.',
    xpReward: 250,
  },
  {
    id: 'proj-03',
    title: 'Relational Server & Asset Inventory Database',
    difficulty: 'beginner',
    category: 'infrastructure',
    estimatedHours: 5,
    overview: 'Design a normalized relational database schema in SQL tracking physical servers, racks, network interfaces, and IP addresses with foreign key constraints.',
    architectureNotes: 'Enforce 3NF (Third Normal Form) with tables: racks, servers, interfaces, and ip_assignments.',
    prerequisites: ['SQL Basics', 'Relational Schemas'],
    milestones: [
      {
        title: 'Define Racks and Servers Tables',
        description: 'Create primary keys and foreign key references',
        starterTask: 'Author DDL CREATE TABLE statements',
        validationCheck: 'Foreign keys prevent orphaned server records',
      },
      {
        title: 'Author Join Queries',
        description: 'Query servers with their assigned rack location and IP',
        starterTask: 'Write INNER JOIN query',
        validationCheck: 'Returns complete asset manifest',
      },
    ],
    starterCodeFile: 'inventory_schema.sql',
    starterCode: `CREATE TABLE racks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    power_kw NUMERIC(4,2) NOT NULL
);

CREATE TABLE servers (
    id SERIAL PRIMARY KEY,
    rack_id INTEGER REFERENCES racks(id),
    hostname VARCHAR(100) NOT NULL UNIQUE,
    cpu_cores INTEGER NOT NULL,
    ram_gb INTEGER NOT NULL
);`,
    expectedOutcome: 'A production SQL schema ready for PostgreSQL deployment.',
    xpReward: 300,
  },
  {
    id: 'proj-04',
    title: 'Cyber Telemetry Web Dashboard',
    difficulty: 'beginner',
    category: 'software_engineering',
    estimatedHours: 5,
    overview: 'Build an accessible, high-contrast dark cyber dashboard component displaying real-time server vitals with responsive CSS Grid.',
    architectureNotes: 'Follow zero-pill discipline, deliberate monospace typography, and WCAG AA color contrast.',
    prerequisites: ['HTML5', 'CSS Flexbox/Grid'],
    milestones: [
      {
        title: 'Semantic Markup Structure',
        description: 'Use section, header, dl, dt, dd for server cards',
        starterTask: 'Build card markup',
        validationCheck: 'Screen readers identify key-value pairs',
      },
      {
        title: 'Responsive Grid Layout',
        description: 'Auto-fill CSS grid adapting from 1 to 4 columns',
        starterTask: 'Define grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))',
        validationCheck: 'No horizontal overflow on mobile viewports',
      },
    ],
    starterCodeFile: 'CyberDashboard.tsx',
    starterCode: `export function CyberCard({ name, status, cpu }) {
  return (
    <article className="p-4 bg-slate-900 border border-slate-800 rounded">
      <h3 className="font-mono text-emerald-400 font-bold">{name}</h3>
      <p className="text-sm text-slate-400">CPU Load: {cpu}%</p>
    </article>
  );
}`,
    expectedOutcome: 'A sleek, accessible telemetry card UI component.',
    xpReward: 300,
  },

  // Intermediate Projects
  {
    id: 'proj-05',
    title: 'Resilient API Gateway with Token Bucket Rate Limiting',
    difficulty: 'intermediate',
    category: 'software_engineering',
    estimatedHours: 8,
    overview: 'Build an API gateway in Python or TypeScript implementing the token bucket algorithm in memory, protecting downstream AI models from overload.',
    architectureNotes: 'Track token capacity and refill rates per IP address using monotonic timers.',
    prerequisites: ['Asynchronous Programming', 'HTTP Specifications'],
    milestones: [
      {
        title: 'Implement Token Bucket Logic',
        description: 'Replenish tokens based on elapsed milliseconds',
        starterTask: 'Implement tryConsume(tokens)',
        validationCheck: 'Rejects requests exceeding capacity with HTTP 429',
      },
    ],
    starterCodeFile: 'rate_limiter.ts',
    starterCode: `export class TokenBucket {
  constructor(public capacity: number, public refillRatePerSec: number) {
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }
  private tokens: number;
  private lastRefill: number;

  consume(): boolean {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.refillRatePerSec);
    this.lastRefill = now;
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }
    return false;
  }
}`,
    expectedOutcome: 'A high-speed rate limiter preventing denial of service.',
    xpReward: 400,
  },
  {
    id: 'proj-06',
    title: 'Automated Multi-Service Containerized Stack',
    difficulty: 'intermediate',
    category: 'infrastructure',
    estimatedHours: 8,
    overview: 'Author a complete Docker Compose environment running an API gateway, Redis cache, PostgreSQL database, and automated backup sidecar with persistent volume mounts.',
    architectureNotes: 'Configure health checks, restart policies, internal bridge networks, and non-root users.',
    prerequisites: ['Docker Basics', 'Linux Networking'],
    milestones: [
      {
        title: 'Define Inter-Container Networking',
        description: 'Isolated bridge network with DNS service discovery',
        starterTask: 'Configure networks: internal-net in compose',
        validationCheck: 'Containers communicate by service name',
      },
    ],
    starterCodeFile: 'docker-compose.yml',
    starterCode: `version: '3.8'
services:
  api:
    image: node:20-alpine
    restart: unless-stopped
    ports:
      - "8080:8080"
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: tinydc
    volumes:
      - db-data:/var/lib/postgresql/data
volumes:
  db-data:`,
    expectedOutcome: 'A turnkey multi-container infrastructure stack deployable in one command.',
    xpReward: 400,
  },

  // Advanced Projects
  {
    id: 'proj-07',
    title: 'Local RAG (Retrieval-Augmented Generation) Knowledge Assistant',
    difficulty: 'advanced',
    category: 'ai_engineering',
    estimatedHours: 12,
    overview: 'Build an end-to-end RAG system in Python: chunk technical documentation, generate 384-dimensional embeddings, index into an in-memory vector store, and ground LLM queries with source citations.',
    architectureNotes: 'Implement cosine similarity search, chunk overlap (500 tokens / 50 overlap), and citation metadata injection.',
    prerequisites: ['Python', 'Embeddings', 'Vector Search'],
    milestones: [
      {
        title: 'Text Chunking with Overlap',
        description: 'Slice markdown documents into semantic windows',
        starterTask: 'Implement recursive text splitter',
        validationCheck: 'Preserves context across chunk boundaries',
      },
      {
        title: 'Vector Cosine Similarity Ranking',
        description: 'Calculate dot product of normalized embedding vectors',
        starterTask: 'Write cosineSimilarity(vecA, vecB)',
        validationCheck: 'Ranks top 3 most relevant context snippets',
      },
    ],
    starterCodeFile: 'rag_pipeline.py',
    starterCode: `import math

def cosine_similarity(v1, v2):
    dot = sum(a * b for a, b in zip(v1, v2))
    norm1 = math.sqrt(sum(a * a for a in v1))
    norm2 = math.sqrt(sum(b * b for b in v2))
    return dot / (norm1 * norm2) if norm1 and norm2 else 0.0`,
    expectedOutcome: 'A complete RAG retrieval engine grounding local models with zero hallucinations.',
    xpReward: 500,
  },

  // Expert Projects
  {
    id: 'proj-08',
    title: 'Multi-Node AI Cluster Batch Inference & Failover Pipeline',
    difficulty: 'expert',
    category: 'distributed_computing',
    estimatedHours: 16,
    overview: 'Design a distributed task scheduler that distributes thousands of AI inference jobs across multiple worker nodes, monitors node health via heartbeats, and re-dispatches jobs when a worker node fails.',
    architectureNotes: 'Implement leader election, work-stealing queues, and idempotent task execution semantics.',
    prerequisites: ['Distributed Computing', 'Cluster Architecture', 'Python / Go'],
    milestones: [
      {
        title: 'Distributed Queue & Task Scheduling',
        description: 'Fair dispatch based on worker GPU utilization',
        starterTask: 'Implement dispatchNextJob(workers, queue)',
        validationCheck: 'Even distribution across available nodes',
      },
      {
        title: 'Heartbeat Timeout & Worker Failover',
        description: 'Detect dead worker within 3 seconds and re-queue uncommitted jobs',
        starterTask: 'Implement handleNodeFailure(nodeId)',
        validationCheck: 'Zero lost jobs during simulated node crash',
      },
    ],
    starterCodeFile: 'cluster_scheduler.ts',
    starterCode: `export class ClusterScheduler {
  nodes = new Map();
  jobQueue = [];

  registerNode(id, vramGb) {
    this.nodes.set(id, { id, vramGb, busy: false, lastHeartbeat: Date.now() });
  }

  assignJob(job) {
    for (const [id, node] of this.nodes) {
      if (!node.busy && Date.now() - node.lastHeartbeat < 5000) {
        node.busy = true;
        return { assignedTo: id, job };
      }
    }
    this.jobQueue.push(job);
    return null;
  }
}`,
    expectedOutcome: 'A bulletproof distributed task orchestrator suitable for large-scale AI factory workloads.',
    xpReward: 750,
  },
];
