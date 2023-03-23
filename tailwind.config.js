/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      padding: {
        search: "2px",
        add: '2px'
      },
    },
  },
  plugins: [],
};
