/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '4k': '2560px', // Custom breakpoint for 4K screens
      },
      fontFamily: {
        abril: ['abrilFatface'], // font-abrilFatface
        sora: ['sora'], // font-sora
        jack: ['"Jacquard 24"', 'cursive'], // font-jack
        tusker: ['tuskerGrotesk'], // font-tusker
        tuskerBold: ['tuskerGrotesk-bold'], // font-tuskerBold
        anton: ['Anton', 'sans-serif'], // font-anton
        spaceMono: ['Space Mono', 'monospace'], // font-spaceMono

      },
      /* Only the tokens reached through a class live here. Everything else is
         consumed as var(--token) directly in component styles. */
      colors: {
        primaryFont: 'var(--ink)',
        yellow: 'var(--accent)',
      },
      borderRadius: {
        lg: 'var(--r-lg)',
      },
      backgroundImage: {
        landingImg: "url('./assets/images/starry-night.jpg')",
      },

    },
  },
  plugins: [],
}