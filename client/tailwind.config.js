/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pixel-pink': '#FFC0CB',
        'pixel-hot-pink': '#FF69B4',
        'pixel-lilac': '#E7D3FF',
        'pixel-peach': '#FFD6BA',
        'pixel-white': '#FFFFFF',
      },
      fontFamily: {
        'pixel': ['Press Start 2P', 'monospace'],
        'pixel-alt': ['VT323', 'monospace'],
      },
      animation: {
        'pixel-bounce': 'pixel-bounce 2s infinite',
        'pixel-float': 'pixel-float 3s ease-in-out infinite',
        'pixel-sparkle': 'pixel-sparkle 1.5s ease-in-out infinite',
        'typewriter': 'typewriter 3s steps(40) 1s 1 normal both',
      },
      keyframes: {
        'pixel-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pixel-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pixel-sparkle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.2)' },
        },
        'typewriter': {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
}

