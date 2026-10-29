/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Master Application State & Local-First Persistence
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserSkillMap, RankTitle, UserAchievement } from '../types/academy.ts';
import { getRankFromXp, calculateSkillRadar, RANKS } from '../utils/progression.ts';

export type ActiveView = 
  | 'command-center'
  | 'languages'
  | 'coding-lab'
  | 'terminal-ssh'
  | 'networking'
  | 'cybersecurity'
  | 'systems-os'
  | 'servers'
  | 'docker'
  | 'proxmox'
  | 'storage-backup'
  | 'monitoring'
  | 'ai-engineering'
  | 'gpu-lab'
  | 'cluster-builder'
  | 'datacenter-lab'
  | 'ai-factory'
  | 'projects'
  | 'curriculum-status'
  | 'settings';

export interface NotificationToast {
  id: string;
  type: 'xp' | 'achievement' | 'info' | 'alert';
  title: string;
  message: string;
  timestamp: number;
}

interface AcademyContextType {
  user: UserProfile;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedTrackId: string | null;
  setSelectedTrackId: (trackId: string | null) => void;
  selectedLessonId: string | null;
  setSelectedLessonId: (lessonId: string | null) => void;
  activeMissionId: string | null;
  setActiveMissionId: (missionId: string | null) => void;
  isTutorOpen: boolean;
  setIsTutorOpen: (open: boolean) => void;
  tutorInitialPrompt: string | null;
  openTutorWithPrompt: (prompt: string) => void;
  toasts: NotificationToast[];
  dismissToast: (id: string) => void;
  awardXp: (amount: number, reason: string) => void;
  completeLesson: (lessonId: string, trackId: string, xpReward?: number) => void;
  completeMission: (missionId: string, xpReward?: number) => void;
  completeProject: (projectId: string, xpReward?: number) => void;
  exportProgressJson: () => string;
  importProgressJson: (jsonString: string) => boolean;
  resetProgress: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (enabled: boolean) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
}

const STORAGE_KEY = 'tinydc_cyber_academy_state_v1';

const INITIAL_PROFILE: UserProfile = {
  username: 'Operative',
  callsign: 'TINYDC-01',
  rank: 'Recruit',
  rankLevel: 1,
  xp: 120,
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  hoursSpent: 4.5,
  completedLessons: ['py-01'],
  completedMissions: [],
  completedProjects: [],
  skills: {
    programming: 25,
    systems: 20,
    networking: 18,
    cybersecurity: 22,
    software_engineering: 15,
    ai_engineering: 14,
    infrastructure: 20,
    distributed_computing: 10,
  },
  achievements: {
    'ach-first-step': new Date().toISOString(),
  },
  bookmarkedLessons: [],
  activeTrackId: 'python',
};

const AcademyContext = createContext<AcademyContextType | undefined>(undefined);

export const AcademyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_PROFILE, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to parse local storage state, using default profile.');
    }
    return INITIAL_PROFILE;
  });

  const [activeView, setActiveView] = useState<ActiveView>('command-center');
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>('python');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>('py-01');
  const [activeMissionId, setActiveMissionId] = useState<string | null>(null);
  const [isTutorOpen, setIsTutorOpen] = useState<boolean>(false);
  const [tutorInitialPrompt, setTutorInitialPrompt] = useState<string | null>(null);
  const [toasts, setToasts] = useState<NotificationToast[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [highContrast, setHighContrast] = useState<boolean>(false);

  // Sync state to local-first persistent storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch (err) {
      console.error('Failed to save state to localStorage:', err);
    }
  }, [user]);

  const addToast = (type: NotificationToast['type'], title: string, message: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    const newToast: NotificationToast = { id, type, title, message, timestamp: Date.now() };
    setToasts(prev => [...prev.slice(-3), newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const awardXp = (amount: number, reason: string) => {
    setUser(prev => {
      const newXp = prev.xp + amount;
      const rankInfo = getRankFromXp(newXp);
      const isRankUp = rankInfo.level > prev.rankLevel;

      if (isRankUp) {
        addToast('achievement', `PROMOTION: ${rankInfo.title.toUpperCase()}`, `You earned ${amount} XP and unlocked Rank ${rankInfo.level}!`);
      } else {
        addToast('xp', `+${amount} XP EARNED`, reason);
      }

      return {
        ...prev,
        xp: newXp,
        rank: rankInfo.title,
        rankLevel: rankInfo.level,
      };
    });
  };

  const completeLesson = (lessonId: string, trackId: string, xpReward = 100) => {
    setUser(prev => {
      if (prev.completedLessons.includes(lessonId)) {
        return prev;
      }
      const updatedLessons = [...prev.completedLessons, lessonId];
      const newXp = prev.xp + xpReward;
      const rankInfo = getRankFromXp(newXp);
      const newSkills = calculateSkillRadar(updatedLessons.length, prev.completedMissions);

      addToast('achievement', 'MISSION ACCOMPLISHED', `Lesson completed. +${xpReward} XP awarded!`);

      return {
        ...prev,
        xp: newXp,
        rank: rankInfo.title,
        rankLevel: rankInfo.level,
        completedLessons: updatedLessons,
        skills: newSkills,
      };
    });
  };

  const completeMission = (missionId: string, xpReward = 300) => {
    setUser(prev => {
      if (prev.completedMissions.includes(missionId)) {
        return prev;
      }
      const updatedMissions = [...prev.completedMissions, missionId];
      const newXp = prev.xp + xpReward;
      const rankInfo = getRankFromXp(newXp);

      addToast('achievement', 'TACTICAL MISSION CLEARED', `+${xpReward} XP awarded for operational success.`);

      return {
        ...prev,
        xp: newXp,
        rank: rankInfo.title,
        rankLevel: rankInfo.level,
        completedMissions: updatedMissions,
      };
    });
  };

  const completeProject = (projectId: string, xpReward = 400) => {
    setUser(prev => {
      if (prev.completedProjects.includes(projectId)) return prev;
      const updated = [...prev.completedProjects, projectId];
      const newXp = prev.xp + xpReward;
      const rankInfo = getRankFromXp(newXp);
      addToast('achievement', 'PROJECT VERIFIED', `Project milestone completed. +${xpReward} XP!`);
      return {
        ...prev,
        xp: newXp,
        rank: rankInfo.title,
        rankLevel: rankInfo.level,
        completedProjects: updated,
      };
    });
  };

  const openTutorWithPrompt = (prompt: string) => {
    setTutorInitialPrompt(prompt);
    setIsTutorOpen(true);
  };

  const exportProgressJson = (): string => {
    return JSON.stringify(user, null, 2);
  };

  const importProgressJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (typeof parsed.xp === 'number' && Array.isArray(parsed.completedLessons)) {
        setUser({ ...INITIAL_PROFILE, ...parsed });
        addToast('info', 'DATA RESTORED', 'Learning record imported successfully.');
        return true;
      }
    } catch (err) {
      console.error('Import parse error:', err);
    }
    return false;
  };

  const resetProgress = () => {
    setUser(INITIAL_PROFILE);
    localStorage.removeItem(STORAGE_KEY);
    addToast('alert', 'RESET COMPLETE', 'All learning progress has been reset to recruit state.');
  };

  return (
    <AcademyContext.Provider
      value={{
        user,
        activeView,
        setActiveView,
        selectedTrackId,
        setSelectedTrackId,
        selectedLessonId,
        setSelectedLessonId,
        activeMissionId,
        setActiveMissionId,
        isTutorOpen,
        setIsTutorOpen,
        tutorInitialPrompt,
        openTutorWithPrompt,
        toasts,
        dismissToast,
        awardXp,
        completeLesson,
        completeMission,
        completeProject,
        exportProgressJson,
        importProgressJson,
        resetProgress,
        soundEnabled,
        setSoundEnabled,
        reducedMotion,
        setReducedMotion,
        highContrast,
        setHighContrast,
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
};

export const useAcademy = () => {
  const context = useContext(AcademyContext);
  if (!context) {
    throw new Error('useAcademy must be used within an AcademyProvider');
  }
  return context;
};
