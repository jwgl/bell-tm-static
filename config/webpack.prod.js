const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = function (env) {
    return webpackMerge(commonConfig({ env: ENV }), {
        devtool: 'source-map',

        output: {
            path: helpers.root('dist'),
            filename: 'js/app/[name].js',
            sourceMapFilename: 'js/app/[name].map',
            chunkFilename: 'js/app/[id].chunk.js',
        },

        plugins: [
            new DefinePlugin({
                'ENV': JSON.stringify(ENV),
                'process.env': {
                    'ENV': JSON.stringify(ENV),
                    'NODE_ENV': JSON.stringify(ENV),
                },
            }),
            new UglifyJsPlugin({
                /*
                // debug
                beautify: true,
                mangle: false,
                dead_code: false,
                unused: false,
                deadCode: false,
                compress: {
                    screw_ie8: true,
                    keep_fnames: true,
                    drop_debugger: false,
                    dead_code: false,
                    unused: false
                },
                comments: true,
                */

                //prod
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true
                },
                comments: false,
            }),
            new LoaderOptionsPlugin({
                debug: false,
                options: {
                    tslint: {
                        emitErrors: true,
                        failOnHint: true,
                        resourcePath: 'src'
                    },
                    htmlLoader: {
                        minimize: true,
                        removeAttributeQuotes: false,
                        caseSensitive: true,
                        customAttrSurround: [
                            [/#/, /(?:)/],
                            [/\*/, /(?:)/],
                            [/\[?\(?/, /(?:)/]
                        ],
                        customAttrAssign: [/\)?\]?=/]
                    },
                }
            }),
        ],

        node: {
            process: false,
        },
    });
};