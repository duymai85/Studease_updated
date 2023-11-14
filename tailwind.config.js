/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/tw-daterange/dist/index.esm.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-color': '#0a092d',
        'secondary-color': '#2e3856',
      },
    },
  },
  plugins: [],
};
