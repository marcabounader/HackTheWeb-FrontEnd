/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        'bg-main': '#212529',
        'bg-active': 'var(--active-color)',
        'bg-card': 'var(--card-bg-color)'
      },
      textColor: {
        'color-main': '#55ABE0'
      },
    },
  },
  plugins: [],
};
