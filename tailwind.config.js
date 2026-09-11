/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        serif: [
          '"Playfair Display"',
          "Georgia",
          "serif",
        ],
      },
      boxShadow: {
        soft: "0 20px 45px rgba(148, 97, 93, 0.14)",
      },
    },
  },
  plugins: [],
}
