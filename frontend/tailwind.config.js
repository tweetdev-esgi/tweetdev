/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#222936',
        skyBlue: '#38bdf8',
      },
      backgroundImage: {
        'spidercat': "url('src/assets/spidercat.png')",
      }
    },
  },
  plugins: [require('tailwind-scrollbar')],
}

