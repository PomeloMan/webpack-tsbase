const merge = require('webpack-merge');
const config = require('./webpack.config.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(config, {
  mode: 'production',
  devtool: 'none',
  optimization: {
    splitChunks: {
      minChunks: 1, //（默认值：1）在拆分之前共享模块的最小块数
      cacheGroups: {
        vendor: {
          priority: 1,
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial'
        }
      }
    },
    minimizer: [
      new UglifyJSPlugin({
        test: /\.min.js($|\?)/i,
        cache: true,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          compress: {
            drop_console: true,
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.min.css(\?.*)?$/i
      }) //css压缩
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/styles.min.css'
    })
  ]
});