/// <reference types="vitest" />
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    reporters: ["default"],
    coverage: {
      provider: "istanbul",
      enabled: true,
      reporter: "html",
    },
    environment: "jsdom",
    setupFiles: ["./setupTest.ts"],
    globals: true,
  },
})
