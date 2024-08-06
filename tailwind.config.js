/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue, js, jsx, ts, tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      'sunset'
    ],
    base: true,
    styled: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    themeRoot: ":root"
  },
}

