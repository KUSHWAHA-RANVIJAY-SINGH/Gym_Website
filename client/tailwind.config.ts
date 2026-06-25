import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme variables mapped directly for nested utilities
        bg: {
          main: "var(--bg-main)",
          surface: "var(--bg-surface)",
        },
        text: {
          main: "var(--text-main)",
        },
        accent: {
          primary: "var(--accent-primary)",
          light: "var(--accent-primary)",
          DEFAULT: "var(--accent-primary)",
          dark: "var(--accent-primary)",
        },
        muted: {
          secondary: "var(--muted-secondary)",
        },
        // Flat mapping for explicit utility classes (e.g. text-text-main, bg-bg-main)
        'bg-main': "var(--bg-main)",
        'bg-surface': "var(--bg-surface)",
        'text-main': "var(--text-main)",
        'accent-primary': "var(--accent-primary)",
        'muted-secondary': "var(--muted-secondary)",

        // Legacy compatibility overrides mapped to theme variables
        primary: "var(--accent-primary)",
        secondary: "var(--muted-secondary)",
        dark: {
          100: "var(--bg-surface)",
          200: "var(--bg-main)",
          300: "var(--bg-main)",
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
