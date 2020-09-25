const path = require('path');
var HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');


module.exports = {
    mode: "production",
    devtool: "none",
    entry: "./src/script.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
            },

plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html"}),
    new Dotenv({
      path: './src/.env',
      safe: true
    })
  ],

module: {
rules:[
  {
    test: /\.css$/,
    use: [ 'style-loader', 'css-loader','sass-loader',]
  },
  {
    test: /\.html$/,
    use: ['html-loader']
  },
  {
    test: /\.jpg$/,
    use: [
      {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/'
                   },
      },

      ],
},
],
}
}
