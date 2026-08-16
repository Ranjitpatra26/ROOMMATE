/** @type {import('tailwindcss').Config} */
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `color-mix(in srgb, var(${variableName}) calc(${opacityValue} * 100%), transparent)`;
    }
    return `var(${variableName})`;
  };
}

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          indigo: withOpacity('--color-earth-indigo'),
          container: withOpacity('--color-earth-container'),
          fixed: withOpacity('--color-earth-fixed'),
        },
        clay: {
          DEFAULT: withOpacity('--color-human-clay'),
          dim: withOpacity('--color-surface-dim'),
          low: withOpacity('--color-surface-low'),
          container: withOpacity('--color-surface-container'),
          high: withOpacity('--color-surface-high'),
          highest: withOpacity('--color-surface-highest'),
          lowest: withOpacity('--color-surface-lowest'),
        },
        vitality: {
          coral: withOpacity('--color-vitality-coral'),
          dark: withOpacity('--color-vitality-dark'),
          container: withOpacity('--color-vitality-container'),
          fixed: withOpacity('--color-vitality-fixed'),
        },
        trust: {
          teal: withOpacity('--color-trust-teal'),
          container: withOpacity('--color-trust-container'),
          light: withOpacity('--color-trust-light'),
        },
        outline: {
          DEFAULT: withOpacity('--color-outline'),
          variant: withOpacity('--color-outline-variant'),
        },
        surface: {
          dim: withOpacity('--color-surface-dim'),
          low: withOpacity('--color-surface-low'),
          DEFAULT: withOpacity('--color-human-clay'),
          elevated: withOpacity('--color-surface-lowest'),
        },
        secondary: withOpacity('--color-text-secondary'),
        muted: withOpacity('--color-text-muted'),
        'on-dark': withOpacity('--color-text-on-dark'),
        'on-dark-secondary': withOpacity('--color-text-on-dark-secondary'),
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Public Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display-hero': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['48px', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-md': ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-sm': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.55', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.4', fontWeight: '400' }],
        'ui-medium': ['14px', { lineHeight: '1.4', fontWeight: '600' }],
        'label-caps': ['12px', { lineHeight: '1.2', letterSpacing: '0.1em', fontWeight: '700' }],
        'metadata': ['11px', { lineHeight: '1.3', letterSpacing: '0.05em', fontWeight: '500' }],
      },
      borderRadius: {
        none: '0px',
        sm: '4px',
        md: '12px',
        lg: '24px',
        full: '9999px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        'section': '120px',
        'gutter': '80px',
        'gutter-mobile': '20px',
        'margin-mobile': '20px',
      },
      maxWidth: {
        'desktop': '1440px',
      },
      zIndex: {
        'bg-shader': '-10',
        'base': '0',
        'content': '10',
        'nav': '50',
        'overlay': '100',
        'modal': '200',
        'cursor': '500',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'standard': 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    },
  },
  plugins: [],
}
