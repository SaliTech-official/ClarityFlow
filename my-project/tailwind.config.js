/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          background: '#F5F7FA',
          surface: '#FFFFFF',
          text: '#2E2E2E',
          accent: '#00A86B',
          negative: '#EF4444',
          positive: '#10B981',
          muted: '#6B7280',
        },
      },
    },
    plugins: [],
  }
  