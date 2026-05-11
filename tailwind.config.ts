import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#000080',
          50:  '#f0f0ff',
          100: '#d8d8ff',
          200: '#b0b0ff',
          300: '#7070ee',
          400: '#4040cc',
          500: '#000080',
          600: '#000070',
          700: '#000060',
          800: '#000050',
          900: '#000040',
        },
        gold: {
          DEFAULT: '#FFD700',
          light:   '#FFE44D',
          dark:    '#C9920A',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card':       '0 2px 12px rgba(0,0,0,0.07)',
        'card-hover': '0 6px 28px rgba(0,0,0,0.12)',
        'green-glow': '0 0 10px rgba(34,197,94,0.55)',
      },
    },
  },
  plugins: [],
} satisfies Config
