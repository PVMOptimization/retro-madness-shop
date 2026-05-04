import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0B0B0F",
        panel: "#12121A",
        accent: "#00FF9C",
        "accent-hover": "#33FFAD",
        muted: "#9CA3AF",
        danger: "#EF4444",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "typing-dot": {
          "0%, 80%, 100%": { transform: "scale(0.8)", opacity: "0.4" },
          "40%": { transform: "scale(1)", opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 8px 2px rgba(0,255,156,0.3)" },
          "50%": { boxShadow: "0 0 20px 6px rgba(0,255,156,0.6)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease forwards",
        "slide-in": "slide-in 0.4s ease forwards",
        "typing-dot": "typing-dot 1.4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
