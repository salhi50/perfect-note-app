const commonConfig = require("./webpack.common.js");
const {merge} = require("webpack-merge");

/**
 * @type import("webpack").Configuration
 */

const config = merge(commonConfig, {
  output: {
    filename: "[name].[contenthash].js",
  },
  mode: "production",
  optimization: {
    runtimeChunk: "single",
    removeEmptyChunks: true,
    splitChunks: {
      cacheGroups: {
        baseChunk: {
          test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
          name: "base",
          priority: 1,
          chunks: "initial",
          minSize: 0,
        },
        vendorsChunk: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: 0,
          chunks: "all",
          minSize: 0,
        }
      }
    }
  }
})

module.exports = config;