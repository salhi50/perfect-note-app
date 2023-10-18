const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

/**
 * @type import("webpack").Configuration
 */

const config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ],
  module: {
    rules: [
      {test: /\.tsx?$/, use: "babel-loader"}
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
}

module.exports = config;