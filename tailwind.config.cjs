/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#7148FC",
        darkest: "#0C121C",
        dark: "#1E293B",
        mid: "#B8BFC6",
        light: "#D6DEE7",
        lightest: "#FFFFFF",
      }
    },
  },
  plugins: [],
};
