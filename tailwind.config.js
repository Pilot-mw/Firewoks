/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#facc15',
          dark: '#eab308',
          light: '#fef08a',
        },
        dark: {
          DEFAULT: '#0a0a0f',
          purple: '#1a0a2e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': 'linear-gradient(to right, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.7) 50%, rgba(26,10,46,0.4) 100%)',
      }
    },
  },
  plugins: [],
}
