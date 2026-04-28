/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#0a0a0f',
        'dark-purple': '#1a0a2e',
        gold: '#facc15',
        'gold-dark': '#eab308',
        'gold-light': '#fef08a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}