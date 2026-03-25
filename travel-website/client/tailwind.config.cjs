/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6C63FF',
        accent: '#00D4FF',
        gold: '#FFD700',
        dark: {
          900: '#0A0A0F',
          800: '#12121A',
          700: '#1A1A27',
          600: '#22222F',
          500: '#2E2E3F',
        },
        brand: {
          DEFAULT: '#6C63FF',
          light: '#8B85FF',
          dark: '#4B44E0',
          cyan: '#00D4FF',
        }
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'text-shine': 'textShine 3s ease-in-out infinite',
        'scroll-testimonial': 'scrollTestimonial 20s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px #6C63FF88, 0 0 20px #6C63FF44' },
          '50%': { boxShadow: '0 0 20px #6C63FFbb, 0 0 40px #6C63FF77' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        textShine: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        scrollTestimonial: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    }
  },
  plugins: []
};
