/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': 'rgba(62, 19, 82, 0.3)',
        'bg-overlay': 'rgba(62, 19, 82, 0.6)',
        'bg-widget': 'rgba(rgba(62, 19, 82, 0.5)',
        'bg-highlight-darker': 'rgba(31, 18, 69, 0.5)',
        'bg-lighter': 'rgba(48, 119, 190, 0.2)',
        'bg-lighter-plus': 'rgba(48, 119, 190, 0.3)',
        'bg-highlight': 'rgba(245, 245, 245, 0.05)',
        'bg-gradient-menu': 'linear-gradient(135deg, rgba(45, 24, 84, 1.0) 0%, rgba(44, 66, 128, 1.0) 50%, rgba(107, 182, 219, 1.0) 100%)',
      }
    },
  },
  plugins: [],
}