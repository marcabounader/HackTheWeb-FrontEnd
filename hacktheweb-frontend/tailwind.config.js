/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        'bg-main': '#212529',
        'bg-active': 'var(--active-color)',
        'bg-card': 'var(--card-bg-color)',
        'bg-side': '#0D1115'
      },
      textColor: {
        'color-main': '#55ABE0',
        'color-secondary': '#A4B1CD'
      },
    },
  },
  plugins: [],
};
