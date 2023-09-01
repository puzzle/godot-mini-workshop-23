import { defineConfig } from "vite";

import mdPlugin from "vite-plugin-markdown";

const reloader = () => ({
  name: "custom-hmr",
  enforce: "post",
  // HMR
  handleHotUpdate({ file, server }) {
    if (file.endsWith(".md")) {
      console.log("Markdown changed...");

      server.ws.send({
        type: "full-reload",
        path: "*",
      });
    }
  },
});

export default defineConfig({
  plugins: [mdPlugin(), reloader()],
});
