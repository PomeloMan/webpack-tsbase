const merge = require('webpack-merge');
const config = require('./webpack.config.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //npm install --save-dev optimize-css-assets-webpack-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //npm install --save-dev mini-css-extract-plugin

module.exports = merge(config, {
    mode: 'production',
    devtool: 'none',
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial', //initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
                    minChunks: 2
                }
            }
        },
        minimizer: [
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin() //css压缩
        ]
    },
    plugins: [
        //css抽取插件 github:https://github.com/webpack-contrib/mini-css-extract-plugin
        new MiniCssExtractPlugin({
            // filename: 'css/[name].css',
            filename: 'styles.css',
            chunkFilename: '[chunkhash].css'
        }),
    ],
    module: {
        rules: [
            // npm install sass-loader node-sass --save-dev
            {
                test: /\.(css|sass|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] //css压缩
            }
        ]
    }
});