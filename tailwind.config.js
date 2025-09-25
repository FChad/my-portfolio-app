/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        '::-webkit-scrollbar': {
          '@apply w-2': {}
        },
        '::-webkit-scrollbar-track': {
          '@apply bg-gray-100 dark:bg-gray-900': {}
        },
        '::-webkit-scrollbar-thumb': {
          '@apply bg-gray-300 dark:bg-gray-700': {}
        },
        '::-webkit-scrollbar-thumb:hover': {
          '@apply bg-gray-500 dark:bg-gray-600': {}
        }
      })
    }
  ],
}