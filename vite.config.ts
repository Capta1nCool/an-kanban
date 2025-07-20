import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import fs from "node:fs";
import path from "node:path";
import { Buffer } from "node:buffer";

const IS_DEV = process.argv.includes("--dev");

export default defineConfig({
  plugins: [
    react(),
    // Type annotation for the custom plugin
    {
      name: "note-plugin-builder",
      apply: "build",
      async closeBundle() {
        // Use async here as closeBundle can be async
        const outDir = "dist";

        // Read and replace HTML template
        let htmlContent = fs.readFileSync(
          path.resolve("assets", "embed.html"),
          "utf8",
        );
        const jsContent = fs.readFileSync(
          path.join(outDir, "assets/index.js"),
          "utf8",
        );
        const cssContent = fs.existsSync(path.join(outDir, "assets/index.css"))
          ? fs.readFileSync(path.join(outDir, "assets/index.css"), "utf8")
          : "";

        htmlContent = htmlContent
          .replace(
            "__BASE64JAVASCRIPTCONTENT__",
            Buffer.from(jsContent).toString("base64"),
          )
          .replace(
            "__BASE64CSSCONTENT__",
            Buffer.from(cssContent).toString("base64"),
          );

        fs.writeFileSync(path.resolve("dist", "build.html.json"), htmlContent);
      },
    } as Plugin, // Assert as Plugin type
    IS_DEV &&
      ({
        name: "note-dev-builder",
        apply: "serve",
        configureServer(server) {
          // Inject dev HTML on start
          server.httpServer?.once("listening", () => {
            const outDir = "dist"; // This outDir is technically not used here as it's hardcoded to 'dist/index.html'
            const devHtml = fs.readFileSync(
              path.resolve("assets", "embed.dev.html"),
              "utf8",
            );
            fs.writeFileSync(path.join(outDir, "index.html"), devHtml); // Ensure 'dist' directory exists or handles creation
          });
        },
      } as Plugin), // Assert as Plugin type
  ].filter(Boolean) as Plugin[], // Filter out false and assert as Plugin[]

  build: {
    outDir: "dist",
    sourcemap: IS_DEV,
    rollupOptions: {
      input: path.resolve("src", "main.jsx"), // Keep .jsx for React component entry
      output: {
        entryFileNames: "assets/index.js",
        assetFileNames: "assets/index.[ext]", // Vite handles this well for CSS/assets
      },
    },
    minify: !IS_DEV,
  },

  define: {
    // Correct way to define process.env.NODE_ENV for client-side
    "process.env.NODE_ENV": JSON.stringify(
      IS_DEV ? "development" : "production",
    ),
  },

  server: {
    port: 5173,
    open: false,
  },
});
