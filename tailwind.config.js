/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-purple': '#4B1F8E',
        'space-purple-dark': '#2D1355',
        'space-coral': '#F4A460',
        'space-gold': '#FFD700',
        'space-navy': '#0B1426',
        'space-dark': '#000814',
      },
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif'],
        'orbitron': ['Orbitron', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'orbit': 'orbit 30s linear infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(150px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(150px) rotate(-360deg)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}