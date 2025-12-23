/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#001e60',
        accent: '#004aad',
        dark: '#111124',
        white: '#e6edf3'
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class',
}