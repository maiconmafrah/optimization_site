export type Language = 'pt' | 'en';

export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  category: 'feedback' | 'bug' | 'question' | 'other';
  createdAt: string;
}

export type AppTab = 'painel' | 'gaming' | 'gravacao' | 'ajustes';

export interface AppDeviceState {
  ramUsed: number; // in GB
  ramMax: number;  // in GB
  cpuUsed: number; // in percentage
  temperature: number; // in celsius
  storageUsed: number; // in percentage
  storageFreeGb: number; // in GB
  isOptimized: boolean;
  isActiveGamingMode: boolean;
  pingBoosterEnabled: boolean;
  recordResolution: '720p' | '1080p';
  isRecording: boolean;
  recordedVideos: { id: string; name: string; duration: string; timestamp: string }[];
  brightness: number;
  volume: number;
  selectedLanguage: 'Portuguese' | 'English';
}
