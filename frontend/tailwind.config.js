/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accentColor:'#355cc9',
        accentColorHover:'#2a4eaa',
        fontColor:"#FFFFFF",
        secondaryColor:"#C7C9CE",
        componentBorder: '#222936',
        searchBorder:'#1C222D',
        headerBorder:'#17191C',
        headerBg:'#06070B',
        bodyBg :'#131720'
      },
      backgroundImage: {
        'spidercat': "url('src/assets/spidercat.png')",
      }
    },
  },
  plugins: [require('tailwind-scrollbar')],
}

