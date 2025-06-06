// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import preact from "@astrojs/preact";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],

  vite: {
    plugins: [tailwindcss()],
    define: {
      global: "globalThis",
      "process.env": "{}",
    },
    optimizeDeps: {
      include: ["buffer"],
      exclude: ["process"],
    },
    resolve: {
      alias: {
        buffer: "buffer",
        util: "util",
      },
    },
  },

  adapter: netlify(),
});