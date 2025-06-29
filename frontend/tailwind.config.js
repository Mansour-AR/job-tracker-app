module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        // Custom light theme palette (darker whites/grays)
        background: {
          light: '#f3f4f6', // Slightly darker white (matches your app.css)
          card: '#ffffff', // Pure white cards
          sidebar: '#1e40af', // Keeping your blue sidebar
        },
        // Text colors that work well with darker white bg
        text: {
          primary: '#111827', // Almost black
          secondary: '#374151', // Dark gray
          tertiary: '#6b7280', // Medium gray
        },
        // Status colors (lighter versions)
        status: {
          applied: '#dbeafe', // Light blue-100
          scheduled: '#dcfce7', // Light green-100
          interviewed: '#fef9c3', // Light yellow-100
          rejected: '#fee2e2', // Light red-100
          offer: '#ede9fe', // Light purple-100
          archived: '#f3f4f6', // Light gray-100
        },
        // Extended grayscale
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          150: '#e5e7eb',
          200: '#d1d5db',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Matches your app.css import
      },
      boxShadow: {
        card: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
      },
      // Extending animations to match app.css
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        slideIn: {
          from: { opacity: 0, transform: 'translateY(-10px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    // Custom utilities that complement app.css
    function({ addUtilities }) {
      const newUtilities = {
        // Glass cards with white background
        '.glass-card': {
          'background': 'rgba(255, 255, 255, 0.95)',
          'box-shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
          'border-radius': '0.5rem',
          'border': '1px solid rgba(0, 0, 0, 0.05)',
        },
        // Card hover effect
        '.card-effect': {
          'transition': 'all 0.2s ease-in-out',
          '&:hover': {
            'transform': 'translateY(-1px)',
            'box-shadow': '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
          },
        },
        // Accessibility focus rings
        '.focus-visible-ring': {
          '@apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2': {},
        },
      };
      addUtilities(newUtilities);
    }
  ],
};