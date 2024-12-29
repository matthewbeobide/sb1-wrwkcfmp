import { create } from 'zustand';

interface SettingsState {
  notifications: {
    desktop: boolean;
    sound: boolean;
    email: boolean;
  };
  theme: 'light' | 'dark';
  privacy: {
    showOnlineStatus: boolean;
    readReceipts: boolean;
  };
  updateNotifications: (settings: Partial<SettingsState['notifications']>) => void;
  updateTheme: (theme: 'light' | 'dark') => void;
  updatePrivacy: (settings: Partial<SettingsState['privacy']>) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  notifications: {
    desktop: true,
    sound: true,
    email: false,
  },
  theme: 'light',
  privacy: {
    showOnlineStatus: true,
    readReceipts: true,
  },
  updateNotifications: (settings) =>
    set((state) => ({
      notifications: { ...state.notifications, ...settings },
    })),
  updateTheme: (theme) => set({ theme }),
  updatePrivacy: (settings) =>
    set((state) => ({
      privacy: { ...state.privacy, ...settings },
    })),
}));