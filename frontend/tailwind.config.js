/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif']
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 6px rgba(0, 0, 0, 0.1)'
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out' // Matches your app.css
      },
      keyframes: {
        slideIn: {
          'from': { 
            opacity: '0', 
            transform: 'translateY(-10px)' 
          },
          'to': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    function({ addUtilities }) {
      const newUtilities = {
        // Glass card effect
        '.glass-card': {
          background: 'rgba(255, 255, 255, 0.95)',
          'box-shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
          'border-radius': '0.5rem',
          'border': '1px solid rgba(0, 0, 0, 0.05)'
        },
        // Card hover effect
        '.card-effect': {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            'box-shadow': '0 10px 15px -3px rgba(0, 0, 0, 0.05)'
          }
        }
      }
      addUtilities(newUtilities)
    }
  ]
}