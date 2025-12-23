/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#001e60',
        third_d: '#020618',
        third_l: '#c4e5ff',
        accent: '#004aad',
        dark: '#111124',
        light: '#e6edf3'
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class',
}