import { defineNuxtModule, addPlugin, createResolver } from "@nuxt/kit";
import printError from "./runtime/errors/printError";

// Module options TypeScript interface definition
export interface ModuleOptions {
  rpcUrl: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-solana",
    configKey: "nuxtSolana",
  },
  // Default configuration options of the Nuxt module
  defaults: {
    rpcUrl: "",
  },
  async setup(options, nuxt) {
    if (!options.rpcUrl) {
      const msg = "rpcUrl parameter is required!";
      printError(msg);
      await nuxt.close();
      throw new Error(msg);
    }

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    const resolver = createResolver(import.meta.url);
    addPlugin({
      src: resolver.resolve("./runtime/plugin"),
      mode: "client",
    });
  },
});
