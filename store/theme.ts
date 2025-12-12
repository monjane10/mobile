import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark';

export type ThemeColors = {
  background: string;
  surface: string;
  white: string;
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  text: string;
  textSecondary: string;
  border: string;
};

const lightColors: ThemeColors = {
  background: '#F8FAFC', // Light background
  surface: '#FFFFFF', // White surface
  white: '#FFFFFF',
  primary: '#10B981', // Modern green
  secondary: '#F59E0B', // Warm orange
  accent: '#06B6D4', // Cyan accent
  success: '#10B981', // Green
  warning: '#F59E0B', // Orange
  error: '#EF4444', // Red
  text: '#1E293B', // Dark text
  textSecondary: '#64748B', // Muted text
  border: '#E2E8F0', // Light border
};

const darkColors: ThemeColors = {
  background: '#0F172A', // Dark background
  surface: '#1E293B', // Dark surface
  white: '#FFFFFF',
  primary: '#34D399', // Lighter green for dark mode
  secondary: '#FBBF24', // Lighter orange for dark mode
  accent: '#22D3EE', // Lighter cyan for dark mode
  success: '#34D399', // Lighter green
  warning: '#FBBF24', // Lighter orange
  error: '#F87171', // Lighter red
  text: '#F1F5F9', // Light text
  textSecondary: '#94A3B8', // Muted light text
  border: '#334155', // Dark border
};

type ThemeStore = {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'light',
      colors: lightColors,
      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        set({
          theme: newTheme,
          colors: newTheme === 'light' ? lightColors : darkColors,
        });
      },
      setTheme: (theme: Theme) => {
        set({
          theme,
          colors: theme === 'light' ? lightColors : darkColors,
        });
      },
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);