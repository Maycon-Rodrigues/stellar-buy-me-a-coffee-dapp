/// <reference types="astro/client" />

// Declarações globais para polyfills
declare global {
  var global: typeof globalThis;
  var Buffer: typeof import("buffer").Buffer;
  var process: {
    env: Record<string, string | undefined>;
    nextTick: (fn: Function) => void;
    version: string;
    versions: Record<string, string>;
    platform: string;
    browser: boolean;
  };
}

export {};
