/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': '#3E1352', //30% & overlay = 60%
        'bg-overlay': '#3E1352', //60%
        'bg-lighter': '3077BE', //20% & lighter+ = 30%
      }
    },
  },
  plugins: [],
}