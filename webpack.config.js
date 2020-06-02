const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'main': './main.ts',
    'main.min': './src/index.ts'
  },
  output: {
    filename: 'js/[name].js', //打包输出文件名
    chunkFilename: '[name].js', //第三方库打包输出文件名 [id][name][chunkhash]
    path: path.resolve(__dirname, 'dist') //打包输出文件目录，'__dirname'是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new webpack.BannerPlugin('v1.1.0'),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      chunks: ['main'] // entry
    }),
    new MiniCssExtractPlugin({
      filename: 'css/styles.css',
      // filename: 'css/[name].css',
      // chunkFilename: '[chunkhash].css'
    })
  ]
};