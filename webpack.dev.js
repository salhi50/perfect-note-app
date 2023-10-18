const { merge } = require("webpack-merge");
const path = require("path");
const commonConfig = require("./webpack.common.js");

const config = merge(commonConfig, {
  output: {
    filename: "[name].bundle.js",
    pathinfo: false
  },
  devtool: "eval-source-map",
  mode: "development",
  optimization: {
    runtimeChunk: "single",
    removeEmptyChunks: true,
    splitChunks: false,
    removeAvailableModules: false,
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 8000,
    client: {
      reconnect: false,
      overlay: false
    },
    compress: true,
  }
})

module.exports = config;