import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        irf: {
          black: "#FFFFFF",
          carbon: "#F9FAFB",
          card: "#FFFFFF",
          raised: "#F3F4F6",
          gold: "#B45309",
          bright: "#D97706",
          soft: "#FEF3C7",
          white: "#111827",
          muted: "#374151",
          dim: "#6B7280",
          success: "#16A34A",
          danger: "#DC2626",
          info: "#2563EB"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        gold: "0 20px 50px rgba(180, 83, 9, 0.08)",
        panel: "0 10px 40px rgba(0, 0, 0, 0.04)"
      }
    }
  },
  plugins: []
} satisfies Config;
