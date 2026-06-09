/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#D16806', // Dark Orange (Highlights, active dots, thin arrows)
          light: '#ECB27B',   // Soft Orange (Secondary buttons, active card borders)
          soft: '#F4E2D8',    // Soft Peach (Primary buttons, icon backgrounds)
        },
        surface: {
          DEFAULT: '#FFFFFF', // Clean White (Cards, floating elements)
        },
        background: {
          DEFAULT: '#F9F6F3', // Cream (Page background)
          light: '#F8F5F3',   // Off-white
        },
        ink: {
          DEFAULT: '#1A1A1A', // Very Dark Gray (Headings, button text)
          muted: '#353535',   // Dark Gray (Body copy)
          light: '#606060',   // Medium Gray (Muted text, labels)
        },
        outline: {
          DEFAULT: '#BFBFBF',
          light: '#E9E9E9',
        }
      },
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        serif: ['Cormorant Upright', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem', // For those large Mellow-style image borders
      }
    },
  },
  plugins: [],
}
