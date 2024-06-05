import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
  entryPoints: [
    "src/index.ts",
    "src/index-layout.ts",
    "src/index-svg.ts",
    "src/index-runtime.ts",
  ],
  clean: true,
  dts: true,
  treeshake: true,
  noExternal: [],
  format: ["esm"],
  ...options,
}));
