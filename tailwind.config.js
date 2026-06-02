/** @type {import('tailwindcss').Config} */

// Import corporate colors from the single source of truth
const { COLORS } = require('./src/utils/colorConfig.js');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: COLORS.primary,
        secondary: COLORS.secondary,
        'secondary-dark': COLORS.secondaryDark,
        dark: COLORS.dark,
        white: COLORS.white,
        whatsapp: COLORS.whatsapp,
      },
    },
  },
  plugins: [],
}
