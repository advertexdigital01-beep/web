/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        secondary: '#111111',
        accent: '#2563EB',
        lightGray: '#F8F9FA',
        borderGray: '#E5E7EB',
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'sans-serif'],
      },
      spacing: {
        '2': '8px',
        '4': '16px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
      },
      borderRadius: {
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
      },
      boxShadow: {
        'subtle': '0 4px 20px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
