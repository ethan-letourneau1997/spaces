import text from "./features/comments/components/comment"

/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
    './features/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          0: '#C1C2C5',
          1: '#A6A7AB',
          2: '#909296',
          3: '#5c5f66',
          4: '#373A40',
          5: '#2C2E33',
          6: '#25262b',
          6.5:'#212227',
          7: '#1A1B1E',
          8: '#141517',
          9: '#101113',
        },
        gray: {
          0: '#f8f9fa',
          1: '#f1f3f5',
          2: '#e9ecef',
          3: '#dee2e6',
          4: '#ced4da',
          5: '#adb5bd',
          6: '#868e96',
          7: '#495057',
          8: '#343a40',
          9: '#212529',
        },
        yellow: {
          0: '#fff9db',
          1: '#fff3bf',
          2: '#ffec99',
          3: '#ffe066',
          4: '#ffd43b',
          5: '#fcc419',
          6: '#fab005',
          7: '#f59f00',
          8: '#f08c00',
          9: '#e67700',
        },
        orange: {
          0: '#fff4e6',
          1: '#ffe8cc',
          2: '#ffd8a8',
          3: '#ffc078',
          4: '#ffa94d',
          5: '#ff922b',
          6: '#fd7e14',
          7: '#f76707',
          8: '#e8590c',
          9: '#d9480f',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
