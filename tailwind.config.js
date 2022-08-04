/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: ["./data/views/**/*.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
      },
      padding: {
        big: "50px"
      },
      screens: {
        sm: "420px",
        lg: "1028px",
        xl: "1440px"
      }
    },
  },
  plugins: [],
}