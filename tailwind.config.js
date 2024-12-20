/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Menambahkan custom breakpoint atau ukuran layar jika diperlukan
      screens: {
        'xs': '475px', // Breakpoint untuk ukuran layar lebih kecil
      },
      spacing: {
        '90': '22.5rem', // Menambahkan ukuran khusus jika diperlukan
      },
    },
  },
  plugins: [],
});
