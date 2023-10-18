/**
 * @type import("tailwindcss").Config
 */

const config = {
  content: [
    "./public/index.html",
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      backgroundColor: {
        "surface-1": "var(--surface-1)",
        "surface-2": "var(--surface-2)",
        "surface-3": "var(--surface-3)",
        "surface-4": "var(--surface-4)",
      },
      borderColor: {
        main: "var(--border-color)"
      },
      textColor: {
        main: "var(--text-color)",
        muted: "var(--text-muted)"
      },
      screens: {
        ds: "768px" // Desktop
      }
    }
  },
  
}

module.exports = config;