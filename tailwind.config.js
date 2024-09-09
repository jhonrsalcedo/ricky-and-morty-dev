/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        delicious: ['Delicious Handrawn', 'cursive'],
        delius: ['Delius, cursive']
      },
      colors: {
        'neon-green': '#39ff14'
      },
      dropShadow: {
        neon: '0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 30px #39ff14, 0 0 40px #39ff14'
      }
    }
  },
  plugins: []
}
