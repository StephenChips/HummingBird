const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './stylesheets/',
              esModule: true,
            }
          },
          'css-loader'
        ],
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      jquery: 'jquery/src/jquery.js'
    }
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: '/index.html',
      template: 'index.ejs'
    }),
    new MiniCssExtractPlugin({
      filename: './stylesheets/[name].css',
      chunkFilename: './stylesheets/[id].css'
    })
  ]
};
