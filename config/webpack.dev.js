const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const webpackShellPlugin = require("webpack-shell-plugin");

const configuration = merge(common, {
  mode: "development",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "../dev"),
    filename: "[name].server.js"
  }
  // TODO (this plugin will restart the server eventually)
  // plugins: [
  //   new webpackShellPlugin({
  //     onBuildEnd: ["npm run some:command"]
  //   })
  // ]
});

module.exports = configuration;
