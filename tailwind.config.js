// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'fade-in-down': 'fadeInDown 1s ease-out forwards',
        'slide-in-left': 'slideInLeft 1s ease-out forwards',
        'slide-in-right': 'slideInRight 1s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: 0, transform: 'translateX(-40px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: 0, transform: 'translateX(40px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      },
    },
  },
};
