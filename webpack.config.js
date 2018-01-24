'use strict';

const path = require('path');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '8888';

module.exports = {
    entry: {
        index: './js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]-bundle.js',
        sourceMapFilename: "js/[name]-bundle.js.map"
    },

    target: 'web',

    watchOptions: {
        aggregateTimeout: 300,
        ignored: /node_modules/
    },

    devServer: {
        contentBase: './dist',
        // do not print bundle build stats
        noInfo: true,
        hot: false,
        // embed the webpack-dev-server runtime into the bundle
        inline: true,
        // serve index.html in place of 404 responses to allow HTML5 history
        historyApiFallback: true,
        port: PORT,
        host: HOST
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.jsx?$/,
                exclude: /(node_modules|public\/)/,
            },
            {
                test: /\.html$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'file-loader?name=[path][name].[ext]'
            },
            {
                loader: 'file-loader',
                test: /\.(jpe?g|png|svg)$/i,
                exclude: /(node_modules|bower_components)/,
                query: {
                    publicPath: '/',
                    name: '[path][name].[ext]'
                }
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            }
        ]
    }
};
