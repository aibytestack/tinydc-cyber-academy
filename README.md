# Tiny DC Cyber Academy
### Learn the Code. Master the Systems. Build the Future.

**Tiny DC Cyber Academy** is an interactive, hacker-themed educational laboratory and platform that takes learners from writing their first line of code to designing and operating a multi-computer data center with virtual machines, container clusters, local AI models, automated workflows, and distributed computing infrastructure.

---

## 🌟 Core Pillars

1. **35-Track Technical Language Academy**
   - Full catalog distinguishing programming languages (Python, Go, Rust, C/C++, Java, C#), query languages (SQL), shells (Bash, PowerShell), configuration/markup (HTML, CSS, JSON, YAML), infrastructure as code (Dockerfile, Terraform, Ansible), and pattern matching (Regular Expressions).
   - 15 fully operational core tracks with line-by-line walkthroughs, interactive challenges, automated test suites, and knowledge verification checks.

2. **Interactive Coding Lab & Real Execution Sandboxes**
   - In-browser sandboxed execution for JavaScript and TypeScript.
   - Live relational SQL engine evaluating structured queries (`SELECT`, `WHERE`, `ORDER BY`, `LIMIT`) against active datacenter database tables (`datacenter_servers`, `cyber_incidents`).
   - Virtual Bash shell environment with virtual filesystem (`/etc`, `/var/log`, `/home/operator`), pipes (`|`), `grep`, `systemctl`, `ssh`, and storage inspection (`df`, `free`).

3. **Systems & Platform Administration**
   - **Linux Academy:** Ubuntu 24.04 LTS administration, systemd service units, POSIX permissions, UFW, disk partitioning, LVM, and `/etc/fstab`.
   - **Windows Academy:** PowerShell object pipelines, Active Directory concepts, Event Viewer logs, Windows Defender, and WSL2.
   - **macOS Academy:** Darwin Unix architecture, Zsh, Homebrew, `launchd` daemons, APFS snapshots, and Apple Silicon Unified Memory for AI.

4. **SSH & Remote Administration Terminal**
   - Live interactive terminal connecting to simulated remote nodes (`10.0.1.20`, `srv-gpu-01`).
   - Public/Private key generation (`ssh-keygen -t ed25519`), `~/.ssh/config` host aliasing, and brute-force log audits.

5. **Visual Network Topology Simulator & Packet Tracer**
   - Drag, place, and inspect routers, switches, firewalls, and server nodes.
   - Live packet trace animations visualizing TCP SYN-ACK handshakes, ARP resolutions, subnets, and latency across physical cables.

6. **Defensive Cybersecurity Laboratory**
   - Hands-on interactive security labs:
     - SQL Injection mitigation (raw string concatenation vs parameterized prepared statements).
     - Cross-Site Scripting (XSS) defense (innerHTML vs DOM textContent encoding).
     - `/var/log/auth.log` forensic triage of brute-force botnets and Fail2ban mitigations.
     - Linux UFW zero-trust firewall policy configuration.

7. **Server Engineering & 42U Hardware Lifecycle**
   - Server anatomy: Dual AMD EPYC/Intel Xeon, ECC DDR5 memory channels, PCIe Gen5 bifurcation, IPMI out-of-band management, and dual redundant Titanium PSUs.
   - Systemd daemon unit generation and server maintenance runbooks.

8. **Docker & Containerization Lab**
   - Real-time container dashboard (`tinydc-api`, `tinydc-postgres`, `vllm-inference`).
   - Container lifecycles (stop, start, restart, log inspection).
   - Multi-stage Dockerfile pruning (demonstrating 96.8% image size reduction).

9. **Proxmox VE & Hypervisor Virtualization**
   - Type 1 KVM hypervisors vs Type 2.
   - Virtual machines vs LXC containers.
   - Storage pools (ZFS, Ceph), virtual bridges (`vmbr0`, `vmbr1`), snapshots, and 3-node HA cluster quorum.

10. **Storage Architecture & Disaster Recovery Rehearsals**
    - 3-2-1 backup principle (3 copies, 2 media types, 1 off-site).
    - ZFS snapshot catalog and live automated disaster recovery restoration drill.

11. **Monitoring & Observability HUD**
    - Live Prometheus scrape telemetry (CPU load, RAM saturation, GPU thermals, VRAM utilization, network throughput, disk IOPS).
    - Threshold-based alert manager.

12. **AI Engineering, GPU VRAM Lab & Distributed Clusters**
    - High-precision GPU VRAM memory calculator for LLM inference (weights, KV cache, activation memory, CUDA runtime overhead) across 7B to 70B models with quantization (FP16, INT8, Q4_K_M).
    - Multi-computer cluster builder with Ray/Slurm batch job dispatching.
    - Retrieval-Augmented Generation (RAG) 5-stage retrieval pipeline simulator.
    - Sandboxed autonomous agent with human-in-the-loop approval gates.

13. **Tiny DC Data Center Floor Simulator**
    - Virtual data center operations room featuring 4 complete 42U racks:
      - Rack A: Edge Gateway & Core Databases
      - Rack B: Proxmox Virtualization & HA Compute
      - Rack C: High-Density AI GPU Clusters (4x RTX 4090, 2x A100)
      - Rack D: ZFS Storage Vault & Backups
    - Live Outage Dispatcher with 6 interactive incident scenarios (Disk Exhaustion, BIND9 DNS Timeout, SSH Key Mismatch, Container CrashLoop, CUDA Out of Memory, Corrupt ZFS Snapshot).

14. **The 16-Phase AI Factory Capstone**
    - Comprehensive step-by-step master curriculum guiding learners through building a production AI Factory from bare metal to certified acceptance testing.

15. **Tiny DC AI Tutor & Technical Mentor**
    - Local deterministic knowledge engine served through `/api/tutor`, with no cloud AI dependency.
    - Zero-dependency deterministic offline knowledge engine providing technical explanations, debugging checklists, and code reviews when offline.

16. **Local-First Data Management & Gamification**
    - 13 progressive ranks from Recruit to Master Systems Engineer.
    - Export/Import profile backups as clean JSON files.
    - 100% functional without requiring third-party cloud accounts or subscriptions.

---

## 🚀 Quickstart & Development

### Prerequisites
- Node.js >= 20.x
- npm >= 10.x

### Run Development Server
```bash
npm run dev
```
The application runs on `http://localhost:3000`.

### Run Test Suite
Unit tests run using Node's native test runner via `tsx`:
```bash
npx --yes tsx --test src/utils/*.test.ts
```

### Production Build
```bash
npm run build
```

---

## 🛡️ Brand Identity & Trademarks
Tiny DC Cyber Academy is an independent product.
**Brand:** Tiny DC Cyber Academy
**Tagline:** Learn the Code. Master the Systems. Build the Future.
