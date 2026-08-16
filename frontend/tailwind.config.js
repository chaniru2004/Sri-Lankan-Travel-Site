/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ceylon: {
          50: '#f7fff8',
          100: '#e6f7e8',
          200: '#c7ebcc',
          300: '#9bdca5',
          400: '#5fc774',
          500: '#2fa84f',
          600: '#1f8a3d',
          700: '#176d32',
          800: '#14572b',
          900: '#0f3f22',
          950: '#062615',
        },
        gold: {
          400: '#6fdc84',
          500: '#34b65a',
          600: '#238d45',
          700: '#176d32',
        },
        sand: {
          50: '#ffffff',
          100: '#f5fbf6',
          200: '#e4f1e7',
          800: '#285437',
          900: '#12331f',
        }
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
