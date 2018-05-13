const autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var config = {
    entry: __dirname + "/src/index.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }]
    },
    devServer: {
        contentBase: "./public",
        port: 3000,
        historyApiFallback: true,
        inline: true
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer({
                        browsers: ['last 3 version', 'ie >= 10']
                    })
                ]
            }
        }),
    ]
}
module.exports = config;