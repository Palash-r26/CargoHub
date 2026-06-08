// ============================================================================
// CargoHub Driver App — Design System Theme
// Derived from website's globals.css tokens
// ============================================================================

export const colors = {
  // Brand Colors
  brand: {
    primary: '#0259DD',
    primaryLight: '#4F8DF7',
    primaryDark: '#0045B5',
    secondary: '#FF6648',
    accent: '#FF6648',
    success: '#10B981',
    danger: '#EF4444',
    warning: '#F59E0B',
  },

  // Gradient Stops
  gradient: {
    start: '#0259DD',
    mid: '#4F8DF7',
    end: '#FF6648',
    coralStart: '#FF6648',
    coralEnd: '#E5533A',
  },

  // Background Layers (Soft Warm Cream Base)
  background: {
    primary: '#FFFDFB',
    secondary: '#FFF2EC',
    tertiary: '#F8F1EB',
    card: '#FFFFFF',
    mesh: '#FFF5EF', // Equivalent for isometric mesh back
  },

  // Text Colors
  text: {
    primary: '#0B1C3F',
    secondary: '#344A75',
    muted: '#6C82AB',
    accent: '#0259DD',
    inverse: '#FFFFFF',
  },

  // Borders
  border: {
    subtle: 'rgba(2, 89, 221, 0.08)',
    hover: 'rgba(2, 89, 221, 0.25)',
    active: 'rgba(2, 89, 221, 0.5)',
    card: 'rgba(11, 28, 63, 0.06)',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 18,
  xl: 28,
  xxl: 36,
  full: 9999,
};

export const shadows = {
  xs: {
    shadowColor: '#0B1C3F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  sm: {
    shadowColor: '#0B1C3F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  md: {
    shadowColor: '#0B1C3F',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.07,
    shadowRadius: 32,
    elevation: 8,
  },
  card: {
    shadowColor: '#0B1C3F',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 5,
  },
  glow: {
    shadowColor: '#0259DD',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
  glowCoral: {
    shadowColor: '#FF6648',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
};

export const typography = {
  display: {
    fontFamily: undefined,
  },
  displayExtrabold: {
    fontFamily: undefined,
  },
  body: {
    fontFamily: undefined,
  },
  bodyMedium: {
    fontFamily: undefined,
  },
  bodySemibold: {
    fontFamily: undefined,
    fontWeight: '600' as const,
  },
  mono: {
    fontFamily: undefined,
  },
};

export const theme = {
  colors,
  spacing,
  radius,
  shadows,
  typography,
};
