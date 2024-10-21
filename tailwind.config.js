/** @type {import('tailwindcss').Config} */
export default {
  content: ['./components//*.{html,js}',
    './pages/**/*.{html,js}',
    './index.html',],
  theme: {
    extend: {
      colors: {
        'custom-footer': '#242148',
      },
    },
  },
  plugins: [],
}