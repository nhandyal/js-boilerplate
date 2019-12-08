'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '8888';
const DIST_DIR = 'dist';

function WebPackConfigBuilder() {

    const configs = [];

    /**
     * config.name: string -- name of the config
     * config.jsIndex: string -- path to entry point index.js
     *
     * @param config
     * @returns {{withConfig: (function(*=)), build: build}}
     */
    function withConfig(config) {
        configs.push(config);
        return builder;
    }

    function build() {
        const entries = configs.reduce(function(accumulator, config) {
            accumulator[config.name] = config.jsIndex;
            return accumulator;
        }, {});

        const htmlPlugins = Object.values(configs).reduce(function(accumulator, config) {
            accumulator.push(new HtmlWebpackPlugin({
                template: `src/index.ejs`,
                filename: `${config.name}.html`,
                title: config.name,
                chunks: [config.name],
            }));
            return accumulator;
        }, []);

        return {
            target: 'web',

            entry: entries,

            output: {
                path: path.resolve(__dirname, DIST_DIR),
                filename: 'js/[name]-bundle.js',
                sourceMapFilename: 'js/[name]-bundle.js.map'
            },

            devtool: 'source-map',
            devServer: {
                contentBase: './' + DIST_DIR,
                noInfo: true,
                hot: false,
                inline: true,
                historyApiFallback: true,
                port: PORT,
                host: HOST
            },

            plugins: [
                ...htmlPlugins
            ],

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
                    }
                ]
            }
        };
    }

    const builder = {
        withConfig: withConfig,
        build: build
    };

    return builder;
}

const webpackConfig = WebPackConfigBuilder()
    .withConfig({
        name: 'app',
        jsIndex: './src/app/index.js'
    })
    .build();

// console.log(JSON.stringify(webpackConfig, null, 2));

module.exports = webpackConfig;
