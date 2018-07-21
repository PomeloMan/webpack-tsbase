const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // entry: './main.ts', //唯一入口文件
    entry: {
        main: './main.ts',
        index: './src/index.ts'
    },
    output: {
        filename: 'js/[name].js', //打包输出文件名
        chunkFilename: '[chunkhash].js', //第三方库打包输出文件名 [id][name][chunkhash]
        path: path.resolve(__dirname, 'dist') //打包输出文件目录，'__dirname'是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
    },
    module: {
        rules: [
            //npm install --save-dev typescript ts-loader
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new webpack.BannerPlugin('v1.0.0'),
        new CleanWebpackPlugin(['dist']), //npm install clean-webpack-plugin --save-dev
        new HtmlWebpackPlugin(), //npm install --save-dev html-webpack-plugin
    ]
};