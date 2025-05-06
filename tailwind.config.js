/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     backgroundImage:{
        desktopLight: "url('./bg-desktop-light.jpg')",
        desktopDark: 'url("./bg-desktop-dark.jpg")',
        mobileLight: 'url("./bg-mobile-light.jpg")',
        mobileDark: 'url("./bg-mobile-dark.jpg")'
      }
    },
  },
  plugins: [],
}