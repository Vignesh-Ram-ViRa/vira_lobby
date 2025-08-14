// Theme configuration for ViRa's Lobby
// Based on the three themes: Formal Light, Formal Dark, Fun Pastel

export const THEMES = {
  FORMAL_LIGHT: 'formal-light',
  FORMAL_DARK: 'formal-dark', 
  FUN_PASTEL: 'fun-pastel'
}

export const THEME_CONFIG = {
  [THEMES.FORMAL_LIGHT]: {
    name: 'Clean Dashboard',
    icon: 'sun',
    variables: {
      // Primary Colors - Clean Dashboard Blue
      '--color-primary': 'linear-gradient(135deg, rgba(161, 192, 255, 0.77) 0%,rgba(58, 106, 249, 0.83) 100%)', // Clean Blue '#3B82F6'
      '--color-primary-light': '#60A5FA', // Light Blue
      '--color-primary-dark': '#1D4ED8', // Dark Blue
      
      // Background Colors - Clean White Dashboard
      '--color-bg-primary': '#FFFFFF', // Pure White
      '--color-bg-secondary': '#F8FAFC', // Light Gray
      '--color-bg-tertiary': '#F1F5F9', // Slightly Gray
      '--color-bg-card': '#FFFFFF', // Pure White Cards
      '--color-bg-overlay': 'rgba(255, 255, 255, 0.95)',
      
      // Text Colors - Clean Hierarchy
      '--color-text-primary': '#0F172A', // Dark Slate
      '--color-text-secondary': '#475569', // Medium Slate
      '--color-text-muted': '#94A3B8', // Light Slate
      '--color-text-inverse': '#FFFFFF',
      
      // Border Colors - Subtle Borders
      '--color-border-light': '#E2E8F0',
      '--color-border-medium': '#CBD5E1',
      '--color-border-strong': '#94A3B8',
      
      // Status Colors - Clean Status
      '--color-success': '#10B981',
      '--color-warning': '#F59E0B',
      '--color-error': '#EF4444',
      '--color-info': '#3B82F6',
      
      // Shadows - Clean Depth
      '--shadow-light': '0 1px 3px rgba(0, 0, 0, 0.1)',
      '--shadow-medium': '0 4px 12px rgba(0, 0, 0, 0.1)',
      '--shadow-strong': '0 10px 25px rgba(0, 0, 0, 0.15)',
      
      // Clean Dashboard Effects
      '--pattern-line-color': '#E2E8F0',
      '--pattern-bg-color': 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.02) 100%)'
    }
  },
  
  [THEMES.FORMAL_DARK]: {
    name: 'FilmBox Cinema',
    icon: 'moon',
    variables: {
      // Primary Colors - FilmBox Red
      '--color-primary': '#DC2626', // FilmBox Red
      '--color-primary-light': '#EF4444', // Light Red
      '--color-primary-dark': '#B91C1C', // Dark Red
      
      // Background Colors - Cinema Dark
      '--color-bg-primary': '#0A0A0A', // Deep Black
      '--color-bg-secondary': '#1A1A1A', // Dark Gray
      '--color-bg-tertiary': '#262626', // Medium Gray
      '--color-bg-card': '#171717', // Card Background
      '--color-bg-overlay': 'rgba(0, 0, 0, 0.9)',
      '--color-bg-hover': 'rgba(220, 38, 38, 0.1)', // Red hover effect
      
      // Text Colors - Cinema White
      '--color-text-primary': '#FFFFFF',
      '--color-text-secondary': '#D4D4D8',
      '--color-text-muted': '#A1A1AA',
      '--color-text-inverse': '#0A0A0A',
      
      // Border Colors - Dark Borders
      '--color-border-light': 'rgba(255, 255, 255, 0.1)',
      '--color-border-medium': 'rgba(255, 255, 255, 0.2)',
      '--color-border-strong': 'rgba(220, 38, 38, 0.5)',
      
      // Status Colors - Cinema Colors
      '--color-success': '#22C55E',
      '--color-warning': '#F59E0B',
      '--color-error': '#EF4444',
      '--color-info': '#06B6D4',
      
      // Shadows - Cinema Depth
      '--shadow-light': '0 4px 12px rgba(0, 0, 0, 0.5)',
      '--shadow-medium': '0 8px 24px rgba(0, 0, 0, 0.6)',
      '--shadow-strong': '0 16px 48px rgba(0, 0, 0, 0.7)',
      
      // FilmBox Effects
      '--pattern-line-color': 'rgba(220, 38, 38, 0.3)',
      '--pattern-bg-color': 'radial-gradient(circle at 30% 40%, rgba(220, 38, 38, 0.1) 0%, transparent 50%)',
      
      // Red-Black Metal Gradients
      '--metal-shine': 'linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(0, 0, 0, 0.3) 25%, rgba(220, 38, 38, 0.1) 50%, rgba(0, 0, 0, 0.3) 75%, rgba(220, 38, 38, 0.2) 100%)',
      '--premium-gradient': 'linear-gradient(135deg, #DC2626 0%, #7F1D1D 50%, #DC2626 100%)',
      '--accent-gradient': 'linear-gradient(135deg, rgba(220, 38, 38, 0.9) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(220, 38, 38, 0.9) 100%)',
      '--card-gradient': 'linear-gradient(135deg, #171717 0%, #0A0A0A 100%)',
      '--border-gradient': 'linear-gradient(135deg, rgba(220, 38, 38, 0.3) 0%, rgba(220, 38, 38, 0.1) 100%)'
    }
  },
  
  [THEMES.FUN_PASTEL]: {
    name: 'Studio Play',
    icon: 'palette',
    variables: {
      // Primary Colors - Studio Purple-Teal
      '--color-primary': '#8B5CF6', // Vibrant Purple
      '--color-primary-light': '#A78BFA', // Light Purple
      '--color-primary-dark': '#7C3AED', // Deep Purple
      
      // Background Colors - Studio Gradients
      '--color-bg-primary': 'linear-gradient(135deg, #667EEA 0%, #764BA2 35%, #8B5CF6 70%, #06B6D4 100%)', // Main Studio Gradient
      '--color-bg-secondary': 'rgba(255, 255, 255, 0.1)', // Glass Cards
      '--color-bg-tertiary': 'rgba(255, 255, 255, 0.15)',
      '--color-bg-card': 'rgba(255, 255, 255, 0.12)',
      '--color-bg-overlay': 'rgba(26, 23, 92, 0.8)', // Dark Blue Overlay
      
      // Text Colors - Studio Clean
      '--color-text-primary': '#FFFFFF',
      '--color-text-secondary': 'rgba(255, 255, 255, 0.9)',
      '--color-text-muted': 'rgba(255, 255, 255, 0.6)',
      '--color-text-inverse': '#1A175C', // Dark Blue
      
      // Border Colors - Glass Morphism
      '--color-border-light': 'rgba(255, 255, 255, 0.1)',
      '--color-border-medium': 'rgba(255, 255, 255, 0.2)',
      '--color-border-strong': 'rgba(255, 255, 255, 0.3)',
      
      // Status Colors - Studio Vibrant
      '--color-success': '#10B981', // Emerald
      '--color-warning': '#F59E0B', // Amber
      '--color-error': '#EF4444', // Red
      '--color-info': '#06B6D4', // Cyan
      
      // Shadows - Neon Glow
      '--shadow-light': '0 4px 32px rgba(139, 92, 246, 0.15)',
      '--shadow-medium': '0 8px 64px rgba(139, 92, 246, 0.2)',
      '--shadow-strong': '0 16px 128px rgba(139, 92, 246, 0.25)',
      
      // Studio Effects
      '--pattern-line-color': 'rgba(255, 255, 255, 0.1)',
      '--pattern-bg-color': 'radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)',
      
      // Studio Specific Gradients
      '--studio-gradient': 'linear-gradient(135deg, #667EEA 0%, #764BA2 35%, #8B5CF6 70%, #06B6D4 100%)',
      '--studio-card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
      '--studio-button-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
      '--studio-accent-gradient': 'linear-gradient(90deg, #F59E0B 0%, #EF4444 50%, #8B5CF6 100%)'
    }
  }
}

export const DEFAULT_THEME = THEMES.FORMAL_LIGHT 