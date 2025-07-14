/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './public/portfolio-config.json',
  ],
  safelist: [
    // Planet gradient classes
    'bg-gradient-to-br',
    'from-orange-500',
    'to-red-600',
    'from-blue-500',
    'to-purple-600',
    'from-green-500',
    'to-emerald-600',
    'from-yellow-500',
    'to-orange-500',
    'from-purple-500',
    'to-pink-600',
    'from-teal-500',
    'to-cyan-600',
  ],
  theme: {
    extend: {
      colors: {
        'space-purple': '#4B1F8E',
        'space-purple-dark': '#2D1355',
        'space-gold': '#FFD700',
        'space-navy': '#0B1426',
        'space-dark': '#000814',
      },
      fontFamily: {
        space: ['Space Grotesk', 'sans-serif'],
        orbitron: ['Orbitron', 'monospace'],
      },
      animation: {
        twinkle: 'twinkle 2s ease-in-out infinite alternate',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
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
};
