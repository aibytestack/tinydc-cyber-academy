# Tiny DC Cyber Academy - Security Architecture & Safety Standards

## 1. Safe Defaults for Educational Systems
In accordance with Section 28 of the Tiny DC Master Specification:
- All command executions, network traces, and data center operations default to safe, sandboxed in-browser simulations.
- No arbitrary remote commands are ever dispatched to the host machine without explicit sandboxing and isolated execution.
- No real credentials, SSH private keys, or passwords are ever stored in example files.
- Example network configurations exclusively utilize private RFC 1918 subnets (`10.0.0.0/8`, `192.168.1.0/24`).

## 2. Code Execution Isolation
- JavaScript and TypeScript exercises evaluate within isolated `Function` wrappers.
- Global scope tampering is prohibited with `"use strict"` and custom sandboxed consoles.
- The virtual shell runs on a virtual filesystem (`INITIAL_VFS`), preventing any access to host system root or `/var/run/docker.sock`.

## 3. Local Tutor and Data Handling
- The built-in tutor uses a deterministic local knowledge engine.
- The tutor does not require a cloud AI API key.
- Learner prompts are processed by the application's own `/api/tutor` endpoint.
- Do not add external AI providers or transmit learner data to third-party services without an explicit design decision and clear disclosure.
