/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#121212',
        secondary: '#2D2D69',
        accent: '#5AD8A1',
        secondaryAccent: '#5B6AC1',
        highlight: '#F8C9A1',
        text: '#FFFFFF',
        textSecondary: '#D3D3D3',
        divider: '#2A2A2A',
      },
    },
  },
  plugins: [],
}