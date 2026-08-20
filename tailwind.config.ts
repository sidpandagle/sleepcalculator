import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          50: "#f0f4ff",
          100: "#e0e9ff",
          200: "#c7d7fe",
          300: "#a4bcfd",
          400: "#8098fb",
          500: "#6171f6",
          600: "#4c53eb",
          700: "#3d41d0",
          800: "#3337a8",
          900: "#2e3285",
          950: "#1c1d4d",
        },
        slate: {
          850: "#172033",
          950: "#0a0f1e",
        },
        ink: "#080B16",
        linen: "#EDEFF7",
        mist: "#8B95B2",
        dusk: "rgba(255,255,255,0.035)",
        moon: "#FFFFFF",
        ember: "#E8B98A",
        "ember-light": "#F2D2AC",
        "ember-dark": "#C99C68",
      },
      fontFamily: {
        sans: ["var(--font-body)", "Figtree", "system-ui", "sans-serif"],
        serif: ["var(--font-display)", '"Instrument Serif"', "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
