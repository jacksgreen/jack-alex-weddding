/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pool-bg': '#e0e0e0', // Fallback
        'pool-pink': '#fff0f3',
        'pool-mint': '#e0f2f1',
        'win-bg': '#c0c0c0',   // Classic Windows Grey
        'win-bevel-light': '#ffffff',
        'win-bevel-dark': '#808080',
        'win-blue': '#000080', // Title bar blue
        'win-text': '#000000',
        'win-gray': '#c0c0c0',
        'pastel-pink': '#FFB7B2',
        'pastel-yellow': '#FFF5BA',
        'pastel-blue': '#B5EAD7',
        'pastel-green': '#C7CEEA', // Actually purple-ish but fits the vibe
        'pastel-peach': '#FFDAC1',
        'pastel-cream': '#FFF9E6',
      },
      fontFamily: {
        retro: ['"VT323"', 'monospace'],
        sans: ['"VT323"', 'monospace'], // Default to retro
        serif: ['"Times New Roman"', 'serif'],
      },
      boxShadow: {
        'win-out': '1px 1px 0px 1px #000000, inset 1px 1px 0px 1px #ffffff, inset -1px -1px 0px 1px #808080',
        'win-in': 'inset 1px 1px 0px 1px #808080, inset -1px -1px 0px 1px #ffffff',
      }
    },
  },
  plugins: [],
}
