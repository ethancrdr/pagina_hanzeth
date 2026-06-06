import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#0B0D10',
        surface: '#13161B',
        surfaceHigh: '#181B20',
        border: 'rgba(255, 255, 255, 0.06)',
        'border-strong': 'rgba(255, 255, 255, 0.12)',

        text: '#F2F1ED',
        'text-muted': '#6B6B68',
        'text-subtle': '#45454A',

        accent: {
          DEFAULT: '#C9A86A',
          soft: '#7A6543',
        },

        pastel: {
          red: { bg: '#2A1A1A', text: '#E8B4B0' },
          blue: { bg: '#14212B', text: '#9CC2D9' },
          green: { bg: '#18241B', text: '#B0CDB0' },
          yellow: { bg: '#2A2418', text: '#D9C089' },
        },
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '12px',
        pill: '9999px',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        h1: ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '400' }],
        'h1-mobile': ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '400' }],
        h2: ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '400' }],
        h3: ['1.5rem', { lineHeight: '1.25', fontWeight: '500' }],
        body: ['1rem', { lineHeight: '1.6' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
        mono: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
      },
      maxWidth: {
        wrap: '1120px',
      },
      boxShadow: {
        xs: '0 1px 0 rgba(255, 255, 255, 0.04)',
      },
    },
  },
  plugins: [],
};

export default config;
