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
        9.6: "2.4rem",
        17: "4.25rem",
        102.5: "25.625rem",
        104: "26rem",
        110: "27.5rem",
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
