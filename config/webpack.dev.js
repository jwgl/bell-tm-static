const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

module.exports = function (options) {
    return webpackMerge(commonConfig({env: ENV}), {
        output: {
            path: helpers.root('dist'),
            filename: 'js/app/[name].js',
            sourceMapFilename: 'js/app/[name].map',
            chunkFilename: 'js/app/[id].chunk.js',
        },
        module: {
            rules: [{
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
            }]
        },
        plugins: [
            new DefinePlugin({
                'ENV': JSON.stringify(ENV),
                'process.env': {
                    'ENV': JSON.stringify(ENV),
                    'NODE_ENV': JSON.stringify(ENV),
                },
            }),
            new LoaderOptionsPlugin({
                debug: true,
                options: {
                    tslint: {
                        emitErrors: false,
                        failOnHint: false,
                        resourcePath: 'src'
                    },
                },
            }),
        ],
        node: {
            process: true,
        },
    });
};
