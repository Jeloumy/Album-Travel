import type { Config } from "tailwindcss";
import daisyui from 'daisyui'

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        acme: ['Acme', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  daisyui: {
    themes: [
      "dim"
      // {
      //   // traveltheme: {
      //   //   //PRIMARY
      //   //   "primary": "#5C8EF2",
      //   //   "primary-focus":"#447BE8",
      //   //   "primary-content":'#ffffff',
      //   //   //SECONDARY
      //   //   "secondary": "#F2B6E2",
      //   //   "secondary-focus":"#FF23CA",
      //   //   "secondary-content":'#282828',
      //   //   //ALERT
      //   //   "accent": "#F24E29",
      //   //   "accent-focus":"#E8370F",
      //   //   "accent-content":'#ffffff',
      //   //   //NEUTRAL
      //   //   "neutral": "#FAF8F7",
      //   //   "neutral-content":'#282828',
      //   //   //BASE
      //   //   "base-100": "#FAF8F7",
      //   //   "base-200": "#d0e8e1",
      //   //   "base-300": "#C6C6E1",
      //   //   "base-content": '#282828',

      //   //   "info": "#2ABF7A",
      //   //   "success": "#87BDAF",
      //   //   "warning": "#ffc838",
      //   //   "error": "#ff3257",

      //   //   "--rounded-box": "0.75rem", // border radius rounded-box utility class, used in card and other large boxes
      //   //   "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
      //   //   "--rounded-badge": "2rem", // border radius rounded-badge utility class, used in badges and similar
      //   //   "--btn-text-case": "uppercase", // set default text transform for buttons
      //   // },
      // },
    ],
  },
  plugins: [daisyui],
};
export default config;
