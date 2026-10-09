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
        background: '#07080c',
        surface: {
          DEFAULT: '#11131c',
          hover: '#161a26',
          card: '#11131c',
        },
        border: {
          DEFAULT: '#1e2234',
          subtle: '#171a28',
        },
        brand: {
          green: '#10b981',
          greenLight: '#34d399',
          purple: '#8b5cf6',
          blue: '#3b82f6',
        },
        foreground: '#f3f4f6',
        muted: '#9ca3af',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
