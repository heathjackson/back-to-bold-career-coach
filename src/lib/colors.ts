// Color Configuration - Change colors here to update the entire app
export const colors = {
  // Primary Brand Colors (Purple theme)
  primary: {
    50: '#faf5ff',
    100: '#f3e8ff', 
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764'
  },

  // Alternative themes - uncomment to use different colors
  // Blue theme
  // primary: {
  //   50: '#eff6ff',
  //   100: '#dbeafe',
  //   200: '#bfdbfe',
  //   300: '#93c5fd',
  //   400: '#60a5fa',
  //   500: '#3b82f6',
  //   600: '#2563eb',
  //   700: '#1d4ed8',
  //   800: '#1e40af',
  //   900: '#1e3a8a',
  //   950: '#172554'
  // },

  // Green theme
  // primary: {
  //   50: '#f0fdf4',
  //   100: '#dcfce7',
  //   200: '#bbf7d0',
  //   300: '#86efac',
  //   400: '#4ade80',
  //   500: '#22c55e',
  //   600: '#16a34a',
  //   700: '#15803d',
  //   800: '#166534',
  //   900: '#14532d',
  //   950: '#052e16'
  // },

  // Background colors
  background: {
    primary: '#000000',
    secondary: 'rgba(255, 255, 255, 0.05)',
    accent: 'rgba(59, 7, 100, 0.1)',
    gradient: 'linear-gradient(135deg, rgba(59, 7, 100, 0.2) 0%, rgba(88, 28, 135, 0.2) 100%)'
  },

  // Text colors
  text: {
    primary: '#ffffff',
    secondary: '#d1d5db',
    muted: '#9ca3af',
    accent: '#d8b4fe'
  },

  // Border colors
  border: {
    primary: 'rgba(255, 255, 255, 0.1)',
    secondary: 'rgba(59, 7, 100, 0.2)',
    accent: 'rgba(216, 180, 254, 0.3)'
  },

  // Button colors
  button: {
    primary: 'linear-gradient(135deg, #581c87 0%, #3b0764 100%)',
    secondary: 'transparent',
    hover: 'rgba(59, 7, 100, 0.1)'
  }
};

// Helper function to get CSS custom property values
export const getCSSVariables = () => {
  return {
    '--color-primary-50': colors.primary[50],
    '--color-primary-100': colors.primary[100],
    '--color-primary-200': colors.primary[200],
    '--color-primary-300': colors.primary[300],
    '--color-primary-400': colors.primary[400],
    '--color-primary-500': colors.primary[500],
    '--color-primary-600': colors.primary[600],
    '--color-primary-700': colors.primary[700],
    '--color-primary-800': colors.primary[800],
    '--color-primary-900': colors.primary[900],
    '--color-primary-950': colors.primary[950],
    '--color-bg-primary': colors.background.primary,
    '--color-bg-secondary': colors.background.secondary,
    '--color-bg-accent': colors.background.accent,
    '--color-bg-gradient': colors.background.gradient,
    '--color-text-primary': colors.text.primary,
    '--color-text-secondary': colors.text.secondary,
    '--color-text-muted': colors.text.muted,
    '--color-text-accent': colors.text.accent,
    '--color-border-primary': colors.border.primary,
    '--color-border-secondary': colors.border.secondary,
    '--color-border-accent': colors.border.accent,
    '--color-btn-primary': colors.button.primary,
    '--color-btn-secondary': colors.button.secondary,
    '--color-btn-hover': colors.button.hover,
  };
};

// Tailwind class helpers
export const colorClasses = {
  bg: {
    primary: 'bg-brand-primary',
    secondary: 'bg-brand-secondary', 
    accent: 'bg-brand-accent',
    gradient: 'bg-brand-gradient'
  },
  text: {
    primary: 'text-brand-primary',
    secondary: 'text-brand-secondary',
    accent: 'text-brand-accent'
  },
  border: {
    primary: 'border-brand-primary',
    secondary: 'border-brand-secondary',
    accent: 'border-brand-accent'
  },
  button: {
    primary: 'btn-primary',
    secondary: 'btn-secondary'
  }
}; 