/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface": "#121215",
        "surface-dim": "#131315",
        "surface-bright": "#39393b",
        "surface-container-lowest": "#08080a",
        "surface-container-low": "#161619",
        "surface-container": "#1c1c20",
        "surface-container-high": "#26262b",
        "surface-container-highest": "#323238",
        "background": "#0b0b0d",
        "on-surface": "#f5f5f7",
        "on-surface-variant": "#8e8e93",
        "outline": "#8e8e93",
        "outline-variant": "#38383e",
        "primary": "#ffffff",
        "primary-container": "#2c2c30",
        "accent": {
          "indigo": "#4F46E5",
          "sky": "#38BDF8",
          "lavender": "#A855F7",
        }
      },
      fontFamily: {
        body: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "monospace"]
      },
      borderRadius: {
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      }
    },
  },
  plugins: [],
};
