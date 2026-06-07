import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteTsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    react(),
    viteTsconfigPaths(),
    tailwindcss(),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
  },
  ssr: {
    noExternal: ["@tanstack/react-start"],
  },
});
