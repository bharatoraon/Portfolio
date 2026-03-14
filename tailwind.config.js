/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        ink: {
          DEFAULT: '#1a1a1a',
          light: '#2d2d2d',
          muted: '#6b7280',
        },
        paper: {
          DEFAULT: '#fafafa',
          warm: '#f5f4f0',
          mid: '#ebebeb',
        },
        accent: {
          DEFAULT: '#2563eb',
          dark: '#1e40af',
          subtle: '#eff6ff',
        },
        border: '#e5e5e5',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '72ch',
          },
        },
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
    },
  },
  plugins: [],
};
