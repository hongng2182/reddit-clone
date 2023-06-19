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
        black: 'var(--color-black)',
        gray: 'var(--color-gray)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        medium: 'var(--color-background)',
        light: 'var(--color-background-light)',
        hover: 'var(--color-hover)',
        'cate': {
          green: 'var(--color-category-green)',
          blue: 'var(--color-category-blue)',
          purple: 'var(--color-category-purple)',
          yellow: 'var(--color-category-yellow)',
          pink: 'var(--color-category-pink)'
        }
      }
    },
    screens: {
      'xs': '375px',
      'sm': '640px',
      'smM': { max: '640px' },
      'md': '768px',
      '_995': '995px',
      '_995M': { max: '995px' },
      '_995-1280': { 'min': '995px', 'max': '1280px' },
      'lg': '1024px',
      'xl': '1280px',
      'xlM': { 'max': '1280px' },
      '2xl': '1536px',
    }
  },
  plugins: [],
}
