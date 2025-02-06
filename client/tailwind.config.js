/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':"#0B0C10",
        'secondary':'#66FCF1',
        'tertiary':'#45A29E'
      }
    },
    screens: {
      'max-sm': { 'max': '1000px' }, // Max size for small screens
      'max-lg': { 'max': '2023px' } // Max size for large screens
      
    },
    textShadow: {
      sm: '1px 1px 2px var(--tw-shadow-color)',
      DEFAULT: '2px 2px 4px var(--tw-shadow-color)',
      lg: '6px 6px 9px var(--tw-shadow-color)',
      xl: '4px 4px 16px var(--tw-shadow-color)',
    }
  },
  plugins: [plugin(function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        'text-shadow': (value) => ({
          textShadow: value,
        }),
      },
      { values: theme('textShadow') }
    )
  })],
}


