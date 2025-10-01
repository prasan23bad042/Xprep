// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // This line tells Tailwind to scan ALL your component files in src/
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
