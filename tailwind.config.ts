import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        5.5: "1.375rem",
        9.6: "2.4rem",
        17: "4.25rem",
        26: "6.5rem",
        30: "7.5rem",
        32: "8rem",
        35: "8.75rem",
        102.5: "25.625rem",
        104: "26rem",
        110: "27.5rem",
        180: "45rem",
        190: "47.5rem",
        200: "50rem",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      dropShadow: {
        "jumbotron-text": "2px 2px 4px rgba(0, 0, 0, 0.45)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
