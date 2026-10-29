/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Progression & XP System
 */

import { RankTitle, UserSkillMap } from '../types/academy.ts';

export interface RankInfo {
  level: number;
  title: RankTitle;
  minXp: number;
  badgeColor: string;
}

export const RANKS: RankInfo[] = [
  { level: 1, title: 'Recruit', minXp: 0, badgeColor: 'text-slate-400' },
  { level: 2, title: 'Apprentice', minXp: 300, badgeColor: 'text-emerald-400' },
  { level: 3, title: 'Code Initiate', minXp: 750, badgeColor: 'text-emerald-300' },
  { level: 4, title: 'Junior Developer', minXp: 1500, badgeColor: 'text-cyan-400' },
  { level: 5, title: 'Systems Technician', minXp: 2600, badgeColor: 'text-cyan-300' },
  { level: 6, title: 'Network Operator', minXp: 4000, badgeColor: 'text-blue-400' },
  { level: 7, title: 'Security Analyst', minXp: 6000, badgeColor: 'text-blue-300' },
  { level: 8, title: 'Infrastructure Engineer', minXp: 8500, badgeColor: 'text-indigo-400' },
  { level: 9, title: 'AI Developer', minXp: 11500, badgeColor: 'text-purple-400' },
  { level: 10, title: 'AI Systems Engineer', minXp: 15500, badgeColor: 'text-purple-300' },
  { level: 11, title: 'Cluster Architect', minXp: 20500, badgeColor: 'text-pink-400' },
  { level: 12, title: 'Data Center Architect', minXp: 27000, badgeColor: 'text-amber-400' },
  { level: 13, title: 'Master Systems Engineer', minXp: 35000, badgeColor: 'text-amber-300' },
];

/**
 * Calculate user rank information from total XP.
 */
export function getRankFromXp(xp: number): RankInfo {
  const safeXp = Math.max(0, Math.floor(xp));
  let currentRank = RANKS[0];

  for (const rank of RANKS) {
    if (safeXp >= rank.minXp) {
      currentRank = rank;
    } else {
      break;
    }
  }

  return currentRank;
}

/**
 * Calculate progress percentage towards next rank.
 */
export function getNextRankProgress(xp: number): {
  currentRank: RankInfo;
  nextRank: RankInfo | null;
  xpInCurrentLevel: number;
  xpNeededForNext: number;
  percent: number;
} {
  const currentRank = getRankFromXp(xp);
  const currentIndex = RANKS.findIndex(r => r.level === currentRank.level);
  const nextRank = currentIndex < RANKS.length - 1 ? RANKS[currentIndex + 1] : null;

  if (!nextRank) {
    return {
      currentRank,
      nextRank: null,
      xpInCurrentLevel: xp - currentRank.minXp,
      xpNeededForNext: 0,
      percent: 100,
    };
  }

  const range = nextRank.minXp - currentRank.minXp;
  const earned = Math.max(0, xp - currentRank.minXp);
  const percent = Math.min(100, Math.max(0, Math.round((earned / range) * 100)));

  return {
    currentRank,
    nextRank,
    xpInCurrentLevel: earned,
    xpNeededForNext: nextRank.minXp - xp,
    percent,
  };
}

/**
 * Recalculate skill matrix scores based on completed missions and lessons.
 */
export function calculateSkillRadar(
  completedLessonCount: number,
  completedMissionCategories: string[]
): UserSkillMap {
  const base = Math.min(100, Math.round(completedLessonCount * 3.5));
  
  const counts: Record<string, number> = {
    programming: 15,
    systems: 10,
    networking: 8,
    cybersecurity: 12,
    software_engineering: 10,
    ai_engineering: 8,
    infrastructure: 10,
    distributed_computing: 5,
  };

  for (const cat of completedMissionCategories) {
    if (counts[cat] !== undefined) {
      counts[cat] += 12;
    }
  }

  return {
    programming: Math.min(100, Math.max(5, counts.programming + Math.floor(base * 0.4))),
    systems: Math.min(100, Math.max(5, counts.systems + Math.floor(base * 0.35))),
    networking: Math.min(100, Math.max(5, counts.networking + Math.floor(base * 0.3))),
    cybersecurity: Math.min(100, Math.max(5, counts.cybersecurity + Math.floor(base * 0.35))),
    software_engineering: Math.min(100, Math.max(5, counts.software_engineering + Math.floor(base * 0.35))),
    ai_engineering: Math.min(100, Math.max(5, counts.ai_engineering + Math.floor(base * 0.25))),
    infrastructure: Math.min(100, Math.max(5, counts.infrastructure + Math.floor(base * 0.3))),
    distributed_computing: Math.min(100, Math.max(5, counts.distributed_computing + Math.floor(base * 0.2))),
  };
}
