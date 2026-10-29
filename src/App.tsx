/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Master Application Shell
 * Learn the Code. Master the Systems. Build the Future.
 */

import React, { useEffect } from 'react';
import { AcademyProvider, useAcademy } from './context/AcademyContext.tsx';
import { Navbar } from './components/layout/Navbar.tsx';
import { Sidebar } from './components/layout/Sidebar.tsx';
import { CommandCenter } from './components/dashboard/CommandCenter.tsx';
import { LanguageAcademy } from './components/languages/LanguageAcademy.tsx';
import { CodingLab } from './components/coding/CodingLab.tsx';
import { SSHTerminalLab } from './components/terminal/SSHTerminalLab.tsx';
import { NetworkSimulator } from './components/network/NetworkSimulator.tsx';
import { CybersecurityLab } from './components/cybersecurity/CybersecurityLab.tsx';
import { OperatingSystemsAcademy } from './components/systems/OperatingSystemsAcademy.tsx';
import { ServerAcademy } from './components/servers/ServerAcademy.tsx';
import { DockerLab } from './components/containers/DockerLab.tsx';
import { ProxmoxLab } from './components/virtualization/ProxmoxLab.tsx';
import { StorageBackupLab } from './components/storage/StorageBackupLab.tsx';
import { MonitoringHUD } from './components/monitoring/MonitoringHUD.tsx';
import { AIEngineeringAcademy } from './components/ai/AIEngineeringAcademy.tsx';
import { GPULaboratory } from './components/gpu/GPULaboratory.tsx';
import { ClusterBuilder } from './components/cluster/ClusterBuilder.tsx';
import { DataCenterSimulator } from './components/datacenter/DataCenterSimulator.tsx';
import { AIFactoryCapstone } from './components/aifactory/AIFactoryCapstone.tsx';
import { ProjectWorkshop } from './components/projects/ProjectWorkshop.tsx';
import { CurriculumStatusView } from './components/status/CurriculumStatusView.tsx';
import { SettingsModal } from './components/settings/SettingsModal.tsx';
import { AITutorDrawer } from './components/tutor/AITutorDrawer.tsx';
import { ToastContainer } from './components/common/ToastContainer.tsx';

const AppContent: React.FC = () => {
  const { activeView, setActiveView } = useAcademy();

  // Support ?autostart=1 query parameter per Ultra Mode testability
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      setActiveView('coding-lab');
    }
  }, [setActiveView]);

  return (
    <div className="min-h-screen bg-[#080d14] text-slate-100 flex flex-col antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto bg-cyber-grid relative">
          {activeView === 'command-center' && <CommandCenter />}
          {activeView === 'languages' && <LanguageAcademy />}
          {activeView === 'coding-lab' && <CodingLab />}
          {activeView === 'terminal-ssh' && <SSHTerminalLab />}
          {activeView === 'networking' && <NetworkSimulator />}
          {activeView === 'cybersecurity' && <CybersecurityLab />}
          {activeView === 'systems-os' && <OperatingSystemsAcademy />}
          {activeView === 'servers' && <ServerAcademy />}
          {activeView === 'docker' && <DockerLab />}
          {activeView === 'proxmox' && <ProxmoxLab />}
          {activeView === 'storage-backup' && <StorageBackupLab />}
          {activeView === 'monitoring' && <MonitoringHUD />}
          {activeView === 'ai-engineering' && <AIEngineeringAcademy />}
          {activeView === 'gpu-lab' && <GPULaboratory />}
          {activeView === 'cluster-builder' && <ClusterBuilder />}
          {activeView === 'datacenter-lab' && <DataCenterSimulator />}
          {activeView === 'ai-factory' && <AIFactoryCapstone />}
          {activeView === 'projects' && <ProjectWorkshop />}
          {activeView === 'curriculum-status' && <CurriculumStatusView />}
          {activeView === 'settings' && <SettingsModal />}
        </main>
      </div>

      <AITutorDrawer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AcademyProvider>
      <AppContent />
    </AcademyProvider>
  );
}
