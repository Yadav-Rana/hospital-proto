/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-zinc': {
          900: '#18181b',
          800: '#27272a',
          700: '#3f3f46',
        },
        'zinc': {
          100: '#f4f4f5',
          400: '#a1a1aa',
        },
        'teal': {
          400: '#2dd4bf',
          500: '#14b8a6',
        },
        'emerald': {
          500: '#10b981',
        },
      },
      boxShadow: {
        'glow-teal': '0 0 15px rgba(20, 184, 166, 0.5)',
        'glow-teal-lg': '0 0 25px rgba(20, 184, 166, 0.7)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
