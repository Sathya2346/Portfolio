/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E84D89',
          dark: '#c4396f',
          light: '#eda5c3',
        },
        secondary: {
          DEFAULT: '#EDA5C3',
          dark: '#d488ab',
          light: '#ffd6e7',
        },
        'light-gray': '#D6D6D6',
        'dark-gray': '#ADADAD',
        black: {
          DEFAULT: '#000000',
          pure: '#000000',
          rich: '#0a0a0a',
          card: '#121212',
          border: '#1f1f1f',
        },
        white: {
          DEFAULT: '#FFFFFF',
          pure: '#FFFFFF',
          soft: '#f8f8f8',
          card: '#ffffff',
          border: '#eaeaea',
        }
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-light': '0 8px 32px 0 rgba(232, 77, 137, 0.08)',
        'neumorphic-dark': '9px 9px 16px #050505, -9px -9px 16px #151515',
        'neumorphic-light': '9px 9px 16px #e0e0e0, -9px -9px 16px #ffffff',
        'glow': '0 0 15px rgba(232, 77, 137, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 5s ease-in-out infinite',
        'float-fast': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
