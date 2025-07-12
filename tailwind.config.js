/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Wheeler Universe Brand Colors
        'brand-purple': '#35064f',
        'brand-purple-light': '#592c65', 
        'brand-coral': '#daa396',
        'brand-coral-dark': '#cb8f76',
        'brand-gold': '#ffcf47',
        'brand-star': '#f4d03f',
        // Legacy space colors (for gradual migration)
        'space-purple': '#35064f',
        'space-purple-dark': '#2D1355',
        'space-coral': '#daa396',
        'space-gold': '#ffcf47',
        'space-navy': '#1a0b2e',
        'space-dark': '#35064f',
      },
      fontFamily: {
        'brand': ['Nexa Bold', 'sans-serif'],
        'brand-body': ['Optima', 'sans-serif'],
        'space': ['Space Grotesk', 'sans-serif'],
        'orbitron': ['Orbitron', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'orbit': 'orbit 30s linear infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'solar-pulse': 'solar-pulse 4s ease-in-out infinite alternate',
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
        'solar-pulse': {
          '0%': { 
            boxShadow: '0 0 30px rgba(244, 208, 63, 0.4), 0 0 60px rgba(255, 207, 71, 0.3), 0 0 90px rgba(218, 163, 150, 0.2)',
            transform: 'scale(1)'
          },
          '100%': { 
            boxShadow: '0 0 40px rgba(244, 208, 63, 0.6), 0 0 80px rgba(255, 207, 71, 0.5), 0 0 120px rgba(218, 163, 150, 0.4)',
            transform: 'scale(1.02)'
          },
        },
      },
    },
  },
  plugins: [],
}