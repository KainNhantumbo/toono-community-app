import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsConfigPaths from "vite-tsconfig-paths";
import Unfonts from "unplugin-fonts/vite";

export default defineConfig({
  plugins: [
    react(),
    tsConfigPaths(),
    Unfonts({ custom: { families: [{ name: "", src: "./" }] }, google: {families:[{name: ''}]} })
  ]
});
