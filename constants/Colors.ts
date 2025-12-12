/**
 * Colors that are used in the app. Now supports both light and dark themes.
 * The colors are dynamically selected based on the current theme.
 */

import { useThemeStore } from '../store/theme';

// Export colors as a hook that returns the current theme colors
export const useColors = () => {
  return useThemeStore((state) => state.colors);
};

// For backward compatibility, export the colors directly (will use light theme by default)
export const colors = {
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