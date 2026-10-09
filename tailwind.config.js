/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0b0c10',
        surface: {
          DEFAULT: '#12141c',
          card: '#161924',
          accent: '#1c1f2e',
        },
        gold: {
          DEFAULT: '#c5a059',
          light: '#e2c27b',
          muted: 'rgba(197, 160, 89, 0.25)',
        },
        border: {
          DEFAULT: 'rgba(197, 160, 89, 0.2)',
          subtle: '#1f2230',
        },
        foreground: '#f4f1ea',
        muted: '#9ca3af',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
