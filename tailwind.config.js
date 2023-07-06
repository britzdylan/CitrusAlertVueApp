/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        primary: {
          50: '#eff7ff',
          100: '#daecff',
          200: '#bedeff',
          300: '#91c9ff',
          400: '#5dacfd',
          500: '#3789fa',
          600: '#2169ef',
          700: '#1954dc',
          800: '#1b44b2',
          900: '#1c3e8c',
          950: '#162755'
        },
        secondary: {
          50: '#fdf9e9',
          100: '#fbf0c6',
          200: '#f8df90',
          300: '#f4c650',
          400: '#efab20',
          500: '#df9413',
          600: '#c0710e',
          700: '#9a500e',
          800: '#7f4014',
          900: '#6c3417',
          950: '#3f1909'
        }
      }
    }
  },
  plugins: [require('cabana-ui')]
}
