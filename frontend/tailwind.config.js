/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        // Background Colors
        'bg-light': '#f3f4f6',       // Page background (darker white)
        'bg-card': '#ffffff',         // Card background (pure white)
        'bg-sidebar': '#1e40af',     // Sidebar blue
        
        // Text Colors
        'text-primary': '#111827',    // Primary text (almost black)
        'text-secondary': '#374151',  // Secondary text (dark gray)
        'text-tertiary': '#6b7280',   // Tertiary text (medium gray)
        
        // Status Colors
        'status-applied': '#dbeafe',   // Light blue
        'status-scheduled': '#dcfce7', // Light green
        'status-interviewed': '#fef9c3', // Light yellow
        'status-rejected': '#fee2e2',  // Light red
        'status-offer': '#ede9fe',     // Light purple
        'status-archived': '#f3f4f6',  // Light gray
        
        // Accent Colors
        'accent-blue': '#3b82f6',     // Primary accent
        'accent-green': '#10b981',    // Success
        'accent-red': '#ef4444'       // Error
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'] // Matches your Google Font import
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