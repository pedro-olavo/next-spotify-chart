const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', ...fontFamily.sans],
        title: ['var(--font-barlow)', ...fontFamily.sans],
      },
      boxShadow: {
        top: '0px -10px 8px rgba(0, 0, 0, 0.50)',
      },
      colors: {
        spotify: {
          black: '#1C1917',
          green: '#14B954',
        },
      },
    },
  },
  plugins: [],
};
