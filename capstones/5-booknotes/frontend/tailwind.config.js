/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './js/**/*.js',
    './css/**/*.css',
    '../backend/**/*.ejs',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
