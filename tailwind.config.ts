import type { Config } from "tailwindcss";
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

const config: Config = {
  darkMode: "class", // Ensure dark mode is based on class
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Define custom colors for the background or other elements
        background: "#1a202c", // Example color, adjust as needed
      },
      keyframes: {
        // Define keyframes for new background effects if needed
        // Example of a background animation if you decide to add one later
      },
      animation: {
        // Define new animations if needed
        // Example of a background animation
        // "background-beams": "background-beams 60s linear infinite",
      },
    },
  },
  plugins: [
    addVariablesForColors, // Adds CSS variables for colors
    // Add other plugins if needed
  ],
};

export default config;
