import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/irf26-pronosticos/",
  test: {
    globals: true,
    environment: "node"
  }
});
