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
        bg: '#0A0C12',
        band: '#0E1119',
        surface: '#14161F',
        accent: {
          DEFAULT: '#2E63F5',
          press: '#2454D8',
          soft: '#7FA0FF',
        },
        text: {
          DEFAULT: '#EDF0F5',
          onBand: '#F2F4F8',
          muted: '#8A93A6',
          mutedOnBand: '#8A93A6',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.10)',
          onBand: 'rgba(255, 255, 255, 0.10)',
        },
      },
      borderRadius: {
        sm: '10px',
        md: '14px',
        lg: '20px',
        xl: '28px',
        pill: '9999px',
      },
      fontFamily: {
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        display: ['var(--font-sora)', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      fontSize: {
        h1: ['2.25rem', { lineHeight: '1.12', letterSpacing: '-0.01em', fontWeight: '800' }],
        h2: ['1.75rem', { lineHeight: '1.12', letterSpacing: '-0.01em', fontWeight: '700' }],
        h3: ['1.375rem', { lineHeight: '1.25', fontWeight: '600' }],
        body: ['1rem', { lineHeight: '1.6' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
      },
      maxWidth: {
        wrap: '1120px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(11, 14, 22, 0.06), 0 2px 8px rgba(11, 14, 22, 0.06)',
        md: '0 8px 30px rgba(11, 14, 22, 0.10)',
        lg: '0 24px 60px rgba(11, 14, 22, 0.16)',
        accent: '0 6px 20px rgba(27, 80, 229, 0.32)',
      },
    },
  },
  plugins: [],
};

export default config;
