/** @type {import('tailwindcss').Config} */
export default {
  content: ['./components//*.{html,js}',
    './pages/**/*.{html,js}',
    './layouts/**/*.{html,js}',
    './index.html',],
  theme: {
    extend: {
      colors: {
        'custom-footer': '#242148',
      },
      screens: {
        'lgm': '1000px', // Nom del punt de trencament personalitzat
      },
    },
  },
  plugins: [],
}