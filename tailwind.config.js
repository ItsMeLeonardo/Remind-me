module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Nunito', 'ui-sans-serif', 'system-ui'],
    },
    extend: {
      boxShadow: {
        '3xl': '0 15px 60px -10px rgb(11, 11, 11, 0.16);',
      },
    },
  },
  plugins: [],
}
