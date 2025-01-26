/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./public/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3490dc",
        secondary: { 10: "#ffed4a" },
        danger: "#e3342f",
        success: "#38c172",
        "dark-blue":{
          50:"#e0f2fe",
          100:"#b2d8f6",
          200:"#80bbfc",
          300:" #4ea8f9",
          400:"#2980f2",
          500:"#0359d9",
          600:"#0247b3",
          700:"#01358b",
          800:"#002363",
          900:"#00113b",
          950: '#000921',
        }
        
      },
      height:{
        60:"60px",
        70:"70px",
        75:"75px",
        80:"80px",
        200:"200px",
        230:"230px",
        300:"300px"
      },
      fontFamily:{
        cursive:['"Comic Sans MS"', 'cursive'],
        mono: ['"Andale Mono"', 'monospace'],
        gill: ['"Gill Sans"', 'sans-serif'],
        Montserrat:['Montserrat', 'sans-serif'],
        Segoe:["system-ui"]

  
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s infinite',
      },
      
      
    },
  },
  plugins: [],
}
