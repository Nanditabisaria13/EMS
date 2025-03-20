/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        customDark: '#1f1f1f',
        customLight: '#f7f7f7',
      },
    },
  },
  plugins: [],
}

