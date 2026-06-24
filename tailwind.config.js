/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'kenburns-top': {
          '0%': {
            transform: 'scale(1) translateY(0)',
            'transform-origin': '10% 16%',
          },
          '100%': {
            transform: 'scale(1.25) translateY(15px)',
            'transform-origin': 'top',
          },
        },
        'kenburns-down': {
          '0%': {
            transform: 'scale(1.25) translateY(0)',
            'transform-origin': '10% 16%',
          },
          '100%': {
            transform: 'scale(1) translateY(15px)',
            'transform-origin': 'down',
          },
        },
        'fadeIn': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      animation: {
        'ease-out': 'kenburns-top 5s ease-out both',
        'ease-in': 'kenburns-down 5s ease-out both',
        'fade-in': 'fadeIn 2s ease-in forwards',
      },
      screens: {
        '4k': '2560px', // Custom breakpoint for 4K screens
      },
      fontFamily: {
        abril: ['abrilFatface'], // font-abrilFatface
        sora: ['sora'], // font-sora
        jack: ['jacquard24'], // font-jack
        tusker: ['tuskerGrotesk'], // font-tusker
        tuskerBold: ['tuskerGrotesk-bold'], // font-tuskerBold
        anton: ['Anton', 'sans-serif'], // font-anton
        spaceMono: ['Space Mono', 'monospace'], // font-spaceMono

      },
      colors: {
        primaryFont: '#F5EEE6',
        yellow: '#FFDA73'
      },
      backgroundImage: {
        landingImg: "url('./assets/images/starry-night.jpg')",
      },

    },
  },
  plugins: [],
}