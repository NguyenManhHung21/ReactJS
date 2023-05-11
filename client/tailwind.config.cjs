/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f5385d",
      },
      padding: {
        user: "2px",
      },
      inset: {
        "72px": "72px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
