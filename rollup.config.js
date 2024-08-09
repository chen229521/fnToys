import json from "rollup-plugin-json";
import typescript from "rollup-plugin-typescript2";
import sourceMaps from "rollup-plugin-sourcemaps";
import babel from "rollup-plugin-babel";
import { DEFAULT_EXTENSIONS } from "@babel/core";
const libraryName = "fntoys";

export default {
  input: "modules/index.ts",
  output: [
    { format: "es", file: "lib/main.esm.js" },
    { format: "umd", file: "lib/main.umd.js", name: libraryName },
  ],
  plugins: [
    json(),
    // babel({
    //   exclude: "node_modules/**",
    //   extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
    // }),
    typescript({
      exclude: "node_modules/**",
      typescript: require("typescript"),
      useTsconfigDeclarationDir: true,
    }),
    sourceMaps(),
  ],
};
