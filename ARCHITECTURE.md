# Tiny DC Cyber Academy - Architectural Blueprint

## 1. System Overview
Tiny DC Cyber Academy is built as a modular, local-first full-stack educational application using React 19, TypeScript, Vite, Tailwind CSS 4, and an Express server with a local deterministic tutor knowledge engine.

```
+--------------------------------------------------------------------+
|                   Tiny DC Cyber Academy Shell                      |
|  +--------------------------------------------------------------+  |
|  |                 Navbar & Gamification HUD                    |  |
|  +--------------------------------------------------------------+  |
|  +--------------+  +-----------------------------------------+  |  |
|  |              |  |         Active Operational View         |  |  |
|  |              |  |  - Command Center                       |  |  |
|  |              |  |  - 35-Language Academy                  |  |  |
|  |   Sidebar    |  |  - Interactive Coding Lab               |  |  |
|  |  Navigation  |  |  - SSH Remote Admin Terminal            |  |  |
|  |  (19 Groups) |  |  - Visual Network Simulator             |  |  |
|  |              |  |  - Cybersecurity Laboratory             |  |  |
|  |              |  |  - Data Center Floor Simulator (42U)    |  |  |
|  |              |  |  - GPU VRAM & Compute Lab               |  |  |
|  |              |  |  - 16-Phase AI Factory Capstone         |  |  |
|  +--------------+  +-----------------------------------------+  |  |
|  +--------------------------------------------------------------+  |
|  |         AI Tutor Drawer  |  Toast Notification Hub           |  |
|  +--------------------------------------------------------------+  |
+--------------------------------------------------------------------+
                                |
               +--------------------------------+
               |        Express Server          |
               |  - /api/health                 |
               |  - /api/tutor (Local Knowledge Engine) |
               +--------------------------------+
```

## 2. Directory Structure
```
/
├── server.ts                  # Express backend & local tutor API with Vite middleware
├── src/
│   ├── main.tsx               # Client React DOM entry point
│   ├── App.tsx                # Master application router & shell
│   ├── index.css              # Cyber theme, grid backgrounds, font definitions
│   ├── context/
│   │   └── AcademyContext.tsx # Central local-first state & persistence provider
│   ├── types/
│   │   └── academy.ts         # TypeScript interfaces and contracts
│   ├── utils/
│   │   ├── progression.ts     # XP math, rank levels, skill radar
│   │   ├── vramCalculator.ts  # GPU memory estimation engine
│   │   ├── codeRunner.ts      # Sandboxed JS/TS, SQL, and Bash executors
│   │   └── *.test.ts          # Pure logic test suites (Node native test runner)
│   ├── data/
│   │   ├── curriculumData.ts  # 35 technical tracks & structured lessons
│   │   ├── missionsData.ts    # Tactical operations missions
│   │   ├── datacenterData.ts  # 42U racks, devices, and 6 incident drills
│   │   ├── aiFactoryData.ts   # 16-phase AI Factory capstone syllabus
│   │   └── projectsData.ts    # 16 guided project specifications
│   └── components/
│       ├── layout/            # Navbar, Sidebar
│       ├── dashboard/         # CommandCenter
│       ├── languages/         # LanguageAcademy
│       ├── coding/            # CodingLab
│       ├── terminal/          # SSHTerminalLab
│       ├── network/           # NetworkSimulator
│       ├── cybersecurity/     # CybersecurityLab
│       ├── systems/           # OperatingSystemsAcademy
│       ├── servers/           # ServerAcademy
│       ├── containers/        # DockerLab
│       ├── virtualization/    # ProxmoxLab
│       ├── storage/           # StorageBackupLab
│       ├── monitoring/        # MonitoringHUD
│       ├── ai/                # AIEngineeringAcademy
│       ├── gpu/               # GPULaboratory
│       ├── cluster/           # ClusterBuilder
│       ├── datacenter/        # DataCenterSimulator
│       ├── aifactory/         # AIFactoryCapstone
│       ├── projects/          # ProjectWorkshop
│       ├── status/            # CurriculumStatusView
│       ├── tutor/             # AITutorDrawer
│       ├── settings/          # SettingsModal
│       └── common/            # ToastContainer
```

## 3. Sandboxed Execution Architecture
- **JavaScript / TypeScript:** Executed inside an isolated Function scope with custom console capture and strict time bounding.
- **Relational SQL:** Evaluated by an in-memory SQL parser maintaining typed datacenter tables (`datacenter_servers`, `cyber_incidents`).
- **Bash Shell:** Virtual filesystem (`/etc`, `/var/log`, `/home/operator`) supporting POSIX commands, piping (`|`), and grep filtering without exposing the host operating system.
