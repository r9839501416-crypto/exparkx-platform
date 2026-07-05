import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-bebas)", "Impact", "sans-serif"],
        sans: ["var(--font-dm-sans)", "Arial", "sans-serif"]
      },
      colors: {
        ink: "#050505",
        line: "#d9d9d9",
        panel: "#f6f6f6",
        muted: "#767676",
        critical: "#b91c1c",
        success: "#166534"
      },
      boxShadow: {
        hard: "6px 6px 0 #050505"
      },
      borderRadius: {
        xs: "2px"
      }
    }
  },
  plugins: []
};

export default config;
