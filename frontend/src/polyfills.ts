// Polyfills para compatibilidade Node.js no browser
import { Buffer } from "buffer";

// Criar um objeto process básico para o browser
const browserProcess = {
  env: {},
  nextTick: (fn: Function) => setTimeout(fn, 0),
  version: "",
  versions: {},
  platform: "browser",
  browser: true,
};

// Definir process primeiro
if (typeof globalThis.process === "undefined") {
  // @ts-ignore
  globalThis.process = browserProcess;
}

// Definir global
if (typeof globalThis.global === "undefined") {
  globalThis.global = globalThis;
}

// Definir Buffer
if (typeof globalThis.Buffer === "undefined") {
  globalThis.Buffer = Buffer;
}

// Para ambientes com window (browser)
if (typeof window !== "undefined") {
  // @ts-ignore
  window.global = window.global || globalThis;
  // @ts-ignore
  window.Buffer = window.Buffer || Buffer;
  // @ts-ignore
  window.process = window.process || browserProcess;
}

// Garantir que process.env existe
// @ts-ignore
if (typeof process !== "undefined" && !process.env) {
  // @ts-ignore
  process.env = {};
}
