import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        yaana: {
          gold: "#D4AF37",
          "gold-light": "#F4E4C1",
          "gold-dark": "#B8941E",
          cream: "#FFFBF5",
          "cream-dark": "#F9F5ED",
          forest: "#1a3a0f",
          "forest-light": "#2d5016",
          charcoal: "#1C1C1C",
          "charcoal-light": "#3A3A3A",
          nearblack: "#0A0A0A",
        },
      },
      borderRadius: {
        card: "0.5rem",
        btn: "0.375rem",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Inter'", "'SF Pro Display'", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.05em",
        looser: "0.05em",
        luxury: "0.08em",
      },
    },
  },
  plugins: [],
};
export default config;
