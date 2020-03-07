const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = env => {

  console.log(env);

  var config = {};

  config.mode = env.production ? 'production' : 'development';

  config.entry = './src/index.js';

  config.devtool = 'inline-source-map';

  config.module = {
    rules: [
      {
        test: /\.js$/i,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: [
          env.production ?  miniCssExtractPlugin() : 'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.vue$/i,
        use: 'vue-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
          publicPath: env.production ? '/assets/images' : 'images'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
          publicPath: env.production ? '/assets/fonts': 'fonts'
        }
      }
    ]
  };

  config.resolve = {
    extensions: [ '.js' ],
    alias: {
      '@Components': path.resolve(__dirname, 'components')
    }
  };

  config.output = {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: env.production ? '/public' : ''
  };

  config.plugins = [
    new HtmlWebpackPlugin({
      filename: '/index.html',
      template: 'index.ejs'
    }),
    new MiniCssExtractPlugin({
      filename: './stylesheets/[name].css',
      chunkFilename: './stylesheets/[id].css'
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      { from: 'stylesheets', to: 'stylesheets' }
    ]),
    new BundleAnalyzerPlugin({
      defaultSizes: 'parsed'
    })
  ];

  config.devServer = {
    contentBase: path.resolve(__dirname, './dist'),
    compress: true,
    port: 18081
  };

  return config;

  function miniCssExtractPlugin () {
    return {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: './stylesheets/',
        esModule: true,
      }
    };
  }
};
