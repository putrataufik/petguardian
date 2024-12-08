/** @type {import('tailwindcss').Config} */
export default {
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
}
