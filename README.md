# webpack-tsbase

*Simple Webpack project using language Typescript*

## Building

You can download the latest version of webpack-tsbase from the [GitHub releases](https://github.com/PomeloMan/webpack-tsbase/releases/latest).

### New webpack-tsbase project:
```bash
cd webpack-tsbase
npm init -y
```

### Install typescript & ts-loader for using typescript:
```bash
npm install --save-dev typescript ts-loader
```

### Configure tsconfig.json
```bash
{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "module": "commonjs",
    "target": "es5",
    "allowJs": true
  }
}
```

### Configure webpack.config.js
```bash
npm install html-webpack-plugin clean-webpack-plugin --save-dev
```
```bash
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './main.ts',
        index: './src/index.ts'
    },
    output: {
        filename: 'js/[name].js',
        chunkFilename: '[chunkhash].js'
    },
    module: {
        rules: [
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
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin()
    ]
};
```

### Configure webpack.dev.js
```bash
npm install --save-dev style-loader css-loader sass-loader node-sass
```
```bash
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true,
        inline: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(css|sass|scss)$/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    }
});
```

### Configure webpack.prod.js
```bash
npm install --save-dev optimize-css-assets-webpack-plugin mini-css-extract-plugin
```
```bash
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
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2
                }
            }
        },
        minimizer: [
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin()
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
            chunkFilename: '[chunkhash].css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(css|sass|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    }
});
```

### Configure package.json
```bash
"scripts": {
    "build": "webpack --config webpack.prod.js --progress --color",
    "serve": "webpack-dev-server --open --inline --hot --config webpack.dev.js"
},
```

| Command         | Description                    |
| --------------- | ------------------------------ |
| `npm run build` | Package production environment |
| `npm run serve` | Start webpack-dev-server       |
