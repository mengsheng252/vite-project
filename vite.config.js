import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from 'node:path'

const pathSrc = path.resolve(__dirname, './src')
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": pathSrc,
      "~@": new URL("./src", import.meta.url).pathname,
    },
  },
});
