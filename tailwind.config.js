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
        background: '#09090B',
        surface: {
          DEFAULT: '#141416',
          hover: '#1a1a1d',
          card: '#121214',
        },
        border: {
          DEFAULT: '#27272A',
          subtle: '#1f1f22',
        },
        foreground: '#EDEDED',
        muted: '#A1A1AA',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.035em',
        editorial: '-0.02em',
      },
    },
  },
  plugins: [],
};

