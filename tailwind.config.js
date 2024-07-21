/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue, js, jsx, ts, tsx}"
  ],
  theme: {
    dark: {
      "primary": "#6b7280",    
      "primary-content": "#e0e1e4",
      "secondary": "#00b1ff",
      "secondary-content": "#000c16",
      "accent": "#008700",
      "accent-content": "#d3e7d1",
      "neutral": "#0d0400",
      "neutral-content": "#c8c5c2",
      "base-100": "#18263f",
      "base-200": "#132035",
      "base-300": "#0f192c",
      "base-content": "#cbcfd6",
      "info": "#00b6ff",
      "info-content": "#000c16",
      "success": "#27d35b",
      "success-content": "#011003",
      "warning": "#ffad00",
      "warning-content": "#160b00",
      "error": "#b7162d",
      "error-content": "#f7d5d3",
    }
  },
  plugins: [
    require('daisyui')
  ],
}

