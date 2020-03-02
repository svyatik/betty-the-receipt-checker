// webpack v4
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: { main: './index.tsx' },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].[hash].js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'scss'),
      path.join(__dirname, 'public'),
      path.join(__dirname, '@types'),
    ],
    open: true,
    watchContentBase: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      /* {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }, */
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.(css|scss|sass)$/i,
        use: [
          'style-loader',
          // MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './public/index.html',
      filename: 'index.html',
    }),
    new WebpackMd5Hash(),
    new StyleLintPlugin({
      configFile: './stylelint.config.js',
      files: './scss/*.scss',
      syntax: 'scss'
    }),
    new webpack.DefinePlugin({
      "process.env.APP_VERSION": JSON.stringify(require('./package.json').version)
    })
  ]
};
