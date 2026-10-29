/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Master Type Definitions
 */

export type RankTitle = 
  | 'Recruit'
  | 'Apprentice'
  | 'Code Initiate'
  | 'Junior Developer'
  | 'Systems Technician'
  | 'Network Operator'
  | 'Security Analyst'
  | 'Infrastructure Engineer'
  | 'AI Developer'
  | 'AI Systems Engineer'
  | 'Cluster Architect'
  | 'Data Center Architect'
  | 'Master Systems Engineer';

export type SkillCategory = 
  | 'programming'
  | 'systems'
  | 'networking'
  | 'cybersecurity'
  | 'software_engineering'
  | 'ai_engineering'
  | 'infrastructure'
  | 'distributed_computing';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface UserSkillMap {
  programming: number; // 0 - 100
  systems: number;
  networking: number;
  cybersecurity: number;
  software_engineering: number;
  ai_engineering: number;
  infrastructure: number;
  distributed_computing: number;
}

export interface UserAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
  xpReward: number;
  category: SkillCategory;
}

export interface UserProfile {
  username: string;
  callsign: string;
  rank: RankTitle;
  rankLevel: number;
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  hoursSpent: number;
  completedLessons: string[];
  completedMissions: string[];
  completedProjects: string[];
  skills: UserSkillMap;
  achievements: Record<string, string>; // achievementId -> unlockedAt ISO string
  bookmarkedLessons: string[];
  activeTrackId: string;
}

export interface TestCase {
  id: string;
  description: string;
  input?: any;
  expectedOutput: string | number | boolean;
  hidden?: boolean;
}

export interface LessonKnowledgeCheck {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  trackId: string;
  title: string;
  order: number;
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  prerequisites: string[]; // lesson IDs
  briefing: string;
  objectives: string[];
  conceptExplanation: string;
  realWorldAnalogy: string;
  demonstrationCode: string;
  demonstrationExplanation: string;
  guidedExercisePrompt: string;
  starterCode: string;
  solutionCode: string;
  testCases: TestCase[];
  troubleshootingTips: string[];
  knowledgeCheck: LessonKnowledgeCheck[];
  debrief: string;
  realWorldApplication: string;
  nextLessonId?: string;
}

export type TrackStatus = 'Complete' | 'Partially Complete' | 'Planned';

export type TrackCategory = 
  | 'Programming Languages'
  | 'Scripting & Shell'
  | 'Systems & Low-Level'
  | 'Data & Query Languages'
  | 'Markup & Configuration'
  | 'Infrastructure as Code'
  | 'Security & Patterns';

export interface Track {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  category: TrackCategory;
  executionEngine: 'javascript' | 'python' | 'html-css' | 'sql' | 'bash' | 'simulated-compiler';
  status: TrackStatus;
  icon: string;
  color: string;
  description: string;
  careerFocus: string;
  prerequisites: string[];
  estimatedHours: number;
  lessons: Lesson[];
}

export interface Mission {
  id: string;
  title: string;
  slug: string;
  category: SkillCategory;
  difficulty: DifficultyLevel;
  durationMinutes: number;
  requiredSkills: string[];
  xpReward: number;
  description: string;
  briefing: string;
  objectives: string[];
  starterContext?: any;
  verificationSteps: string[];
  hint: string;
  isCompleted: boolean;
}

export interface NetworkNode {
  id: string;
  label: string;
  type: 'router' | 'switch' | 'firewall' | 'server' | 'dns' | 'gpu-node' | 'client';
  ip: string;
  subnetMask: string;
  gateway: string;
  mac: string;
  services: string[];
  status: 'online' | 'offline' | 'degraded';
  x: number;
  y: number;
}

export interface NetworkLink {
  id: string;
  sourceId: string;
  targetId: string;
  bandwidthMbps: number;
  status: 'active' | 'blocked' | 'error';
  latencyMs: number;
}

export interface IncidentScenario {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedRack: 'Rack A' | 'Rack B' | 'Rack C' | 'Rack D';
  affectedDevice: string;
  symptom: string;
  alertLogs: string[];
  clues: string[];
  solutionAction: string;
  verificationCriteria: string;
  xpReward: number;
}

export interface ClusterNode {
  id: string;
  hostname: string;
  role: 'coordinator' | 'compute-worker' | 'gpu-worker' | 'storage-node';
  os: string;
  ip: string;
  cpuCores: number;
  ramGb: number;
  gpuModel?: string;
  vramGb?: number;
  status: 'healthy' | 'busy' | 'offline';
  cpuUtilization: number;
  ramUtilization: number;
  currentWorkload?: string;
}

export interface ProjectMilestone {
  title: string;
  description: string;
  starterTask: string;
  validationCheck: string;
}

export interface Project {
  id: string;
  title: string;
  difficulty: DifficultyLevel;
  category: SkillCategory;
  estimatedHours: number;
  overview: string;
  architectureNotes: string;
  prerequisites: string[];
  milestones: ProjectMilestone[];
  starterCodeFile: string;
  starterCode: string;
  expectedOutcome: string;
  xpReward: number;
}

export interface AIFactoryPhase {
  phase: number;
  title: string;
  subtitle: string;
  category: string;
  durationHours: number;
  description: string;
  architectureDetails: string[];
  checklistItems: { id: string; label: string; verified: boolean }[];
  deliverable: string;
  xpReward: number;
}
