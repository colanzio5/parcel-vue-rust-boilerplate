const path = require("path");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const webpack = require("webpack");

module.exports = {
  chainWebpack: (config) => {
    // rust wasm bindgen https://github.com/rustwasm/wasm-bindgen
    config
      .plugin("wasm-pack")
      .use(WasmPackPlugin)
      .init(
        (Plugin) =>
          new Plugin({
            crateDirectory: path.resolve(__dirname, "src/wasm"),

            // Check https://rustwasm.github.io/wasm-pack/book/commands/build.html for
            // the available set of arguments.
            //
            // Optional space delimited arguments to appear before the wasm-pack
            // command. Default arguments are `--verbose`.
            // args: "--log-level warn",
            // Default arguments are `--typescript --target browser --mode normal`.
            // extraArgs: "--no-typescript",
            // extraArgs: "--target bundler",

            // Optional array of absolute paths to directories, changes to which
            // will trigger the build.
            watchDirectories: [path.resolve(__dirname, "./src/wasm/src/*")],

            // The same as the `--out-dir` option for `wasm-pack`
            outDir: path.resolve(__dirname, "./src/wasm/pkg"),

            // The same as the `--out-name` option for `wasm-pack`
            // outName: "index.wasm",

            // If defined, `forceWatch` will force activate/deactivate watch mode for
            // `.rs` files.
            //
            // The default (not set) aligns watch mode for `.rs` files to Webpack's
            // watch mode.
            forceWatch: true,

            // If defined, `forceMode` will force the compilation mode for `wasm-pack`
            //
            // Possible values are `development` and `production`.
            //
            // the mode `development` makes `wasm-pack` build in `debug` mode.
            // the mode `production` makes `wasm-pack` build in `release` mode.
            forceMode: "development",

            // Controls plugin output verbosity, either 'info' or 'error'.
            // Defaults to 'info'.
            // pluginLogLevel: 'info'
          })
      )
      .end()
      //  needed for Edge browser https://rustwasm.github.io/docs/wasm-bindgen/examples/hello-world.html
      .plugin("text-encoder")
      .use(webpack.ProvidePlugin)
      .init(
        (Plugin) =>
          new Plugin({
            TextDecoder: ["text-encoding", "TextDecoder"],
            TextEncoder: ["text-encoding", "TextEncoder"],
          })
      )
      .end();
  },
};
