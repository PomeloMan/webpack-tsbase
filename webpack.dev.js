const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        // contentBase: './dist',
        contentBase: path.join(__dirname, 'dist'),
        compress: true, // 启用gzip压缩
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        hot: true
    },
    module: {
        rules: [
            //npm install --save-dev style-loader css-loader/ npm install sass-loader node-sass --save-dev
            {
                test: /\.(css|sass|scss)$/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    }
});