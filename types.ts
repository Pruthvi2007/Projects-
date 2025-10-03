export interface SyllabusFile {
  name: string;
  content: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  source?: ChatMode;
}

export type ChatMode = 'syllabus' | 'gemini';

export enum AppState {
  STREAM_SELECTION = 'STREAM_SELECTION',
  CHATTING = 'CHATTING',
}

export enum Stream {
  EEE = 'Electrical & Electronics Engineering',
  CSE = 'Computer Science & Engineering',
  MECH = 'Mechanical Engineering',
  CIVIL = 'Civil Engineering',
}

// FIX: Added Cycle enum for CycleSelection component. This resolves the import error in components/CycleSelection.tsx.
export enum Cycle {
  PHYSICS = 'Physics',
  CHEMISTRY = 'Chemistry',
}