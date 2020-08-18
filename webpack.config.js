const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssNano = require('cssnano');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    main: './src/js/index.js',
    // articles: './src/js/articles.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  resolve: {
    alias: {
      images: path.resolve(__dirname, 'src/images/')
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.js$/,
        use: { loader: 'babel-loader' },
        exclude: /node_modules/,
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: 'fonts',
              outputPath: 'fonts',
              useRelativePath: true,
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: 'images',
              outputPath: 'images',
              useRelativePath: true,
              esModule: false,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: CssNano,
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/pages/index.html',
      filename: 'index.html',
      chunks: 'main',
    }),
    // new HtmlWebpackPlugin({
    //   inject: false,
    //   template: './src/pages/articles.html',
    //   filename: 'articles.html',
    //   chunks: 'articles',
    // }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
