// ============================================================================
// CargoHub Driver App — Design System Theme
// Derived from website's globals.css tokens
// ============================================================================

const darkColors = {
  // Brand Colors
  brand: {
    primary: '#FF6648', // Coral orange primary
    primaryLight: '#FF8870',
    primaryDark: '#D85A30',
    secondary: '#FF6648',
    accent: '#FF6648',
    success: '#38BDF8',
    danger: '#E53935', // Red
    warning: '#F5A623', // Amber
  },

  // Gradient Stops
  gradient: {
    start: '#FF6648',
    mid: '#E5533A',
    end: '#D85A30',
    coralStart: '#FF6648',
    coralEnd: '#D85A30',
  },

  // Background Layers (Premium Dark Navy)
  background: {
    primary: '#0D0F1A',
    secondary: '#11131E',
    tertiary: '#191B26',
    card: '#161824',
    mesh: '#0D0F1A',
    blueTint: '#E6F1FB', // Blue tint bg
  },

  // Text Colors
  text: {
    primary: '#F0F0F0', // Near white
    secondary: '#C5C7D0', // Soft grey
    muted: '#6B7280', // Grey
    accent: '#FF6648',
    inverse: '#0D0F1A',
    blueTint: '#D85A30', // Deep coral/orange
  },

  // Borders
  border: {
    subtle: '#2A2D3E',
    hover: '#3A3E54',
    active: '#FF6648',
    card: '#2A2D3E',
  },
};

const lightColors = {
  // Brand Colors (Cream / Blue / Coral)
  brand: {
    primary: '#FF6648', // Coral orange primary
    primaryLight: '#FF8870',
    primaryDark: '#D85A30',
    secondary: '#FF6648',
    accent: '#FF6648',
    success: '#10B981',
    danger: '#EF4444',
    warning: '#F59E0B',
  },

  // Gradient Stops
  gradient: {
    start: '#FF6648',
    mid: '#E5533A',
    end: '#D85A30',
    coralStart: '#FF6648',
    coralEnd: '#D85A30',
  },

  // Background Layers (Soft Warm Cream Base)
  background: {
    primary: '#FFFDFB',
    secondary: '#FFF2EC',
    tertiary: '#F8F1EB',
    card: '#FFFFFF',
    mesh: '#FFFDFB',
    blueTint: '#FFF2EC',
  },

  // Text Colors
  text: {
    primary: '#0B1C3F', // Deep Navy
    secondary: '#344A75',
    muted: '#6C82AB',
    accent: '#FF6648',
    inverse: '#FFFFFF',
    blueTint: '#D85A30',
  },

  // Borders
  border: {
    subtle: 'rgba(255, 102, 72, 0.08)',
    hover: 'rgba(255, 102, 72, 0.25)',
    active: 'rgba(255, 102, 72, 0.5)',
    card: 'rgba(11, 28, 63, 0.06)',
  },
};

// Start with darkColors as default
export let colors = {
  brand: { ...darkColors.brand },
  gradient: { ...darkColors.gradient },
  background: { ...darkColors.background },
  text: { ...darkColors.text },
  border: { ...darkColors.border },
};

export const setThemeMode = (mode: 'light' | 'dark') => {
  const source = mode === 'light' ? lightColors : darkColors;
  Object.keys(source).forEach((key) => {
    Object.assign((colors as any)[key], (source as any)[key]);
  });
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
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },
  glow: {
    shadowColor: '#FF6648',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
  glowBlue: {
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
