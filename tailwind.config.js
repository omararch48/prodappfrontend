/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      anton: ['Anton', 'sans-serif'],
    },
    extend: {
      height: {
        'footer':        '80rem',
        'footer-form':   '40rem',
        'footer-social': '15rem',
        'footer-menu':   '15rem',
        'footer-copy':   '10rem',
      },
      colors: {
        'linkedin':  '#0077b5',
        'facebook':  '#4267B2',
        'github':    '#6e5494',
        'linkedin':  '#0077b5',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}