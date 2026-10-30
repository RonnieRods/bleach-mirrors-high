/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gameVoid: '#0a0b0d',
        gameSlate: '#13161c',
        gameCyan: '#00f0ff',
        gameOrange: '#ff6b00',
      }
    },
  },
  plugins: [],
}

