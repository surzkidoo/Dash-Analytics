/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0AAAAA',
        secondary: '#068282',
        pageBg: 'rgba(10, 170, 170, 0.05);',
        bgform:'#37ACB7',
        textMain:'#35383F',
        textHead: '#5D6065',
        textPara: '#86888C',
        gradient: 'linear-gradient(270deg, #0AAAAA -4.35%, #066969 100%)',
        errorBg:'rgba(255, 51, 51, 0.10);',
        error:'#F33',
        success:'#00C247',
        successBg:'rgba(0, 194, 71, 0.10)',


      },
    },
  },
  plugins: [require("daisyui")]
}

