var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
var TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const path = require("path");

module.exports = {
    entry: {
        'angular':            './src/angular.ts',
        'logo':               './src/logo.ts',
        'todo':               './src/todo/todo.ts',
        'settings/subject':   './src/plan/settings/subject-director.ts',
        'settings/program':   './src/plan/settings/program-settings.ts',
        'vision/list':        './src/plan/vision/public/list.ts',
        'vision/item':        './src/plan/vision/public/item.ts',
        'vision/draft':       './src/plan/vision/draft/draft.ts',
        'vision/review':      './src/plan/vision/review/review.ts',
        'scheme/list':        './src/plan/scheme/public/list.ts',
        'scheme/item':        './src/plan/scheme/public/item.ts',
        'scheme/draft':       './src/plan/scheme/draft/draft.ts',
        'scheme/review':      './src/plan/scheme/review/review.ts',
        'cardReissue/form':   './src/card/reissue/form/form.ts',
        'cardReissue/review': './src/card/reissue/review/review.ts',
    },

    output: {
        path: path.join(__dirname, '/dist/dev'),
        filename: 'js/app/[name].js'
    },

    module: {
        loaders: [
            { test: /\.ts$/, loader: 'awesome-typescript' },
            { test: /\.html$/, loader: 'raw' },
            { test: /\.scss$/, loader: 'raw!sass' }
        ]
    },

    plugins: [
        new CommonsChunkPlugin({ name: 'angular', fileName: 'angular.js', minChunks: Infinity }),
        new CommonsChunkPlugin({ name: 'common', fileName: 'common.js', minChunk: 2 }),
        new CopyWebpackPlugin([
            { to: 'js/lib', from: './node_modules/moment/min/moment-with-locales.min.js' },
            { to: 'js/lib', from: './node_modules/markdown-it/dist/markdown-it.min.js' },
            { to: 'js/lib', from: './node_modules/jquery/dist/jquery.min.js' },
            { to: 'js/lib', from: './node_modules/tether/dist/js/tether.min.js' },
            { to: 'js/lib', from: './node_modules/bootstrap/dist/js/bootstrap.min.js' },
            { to: 'css/lib', from: './node_modules/bootstrap/dist/css/bootstrap.min.css' },
            { to: 'js/lib', from: './node_modules/bootstrap-submenu/dist/js/bootstrap-submenu.min.js' },
            { to: 'css/lib', from: './node_modules/bootstrap-submenu/dist/css/bootstrap-submenu.min.css' },
            { to: 'js/lib', from: './node_modules/select2/dist/js/select2.min.js' },
            { to: 'css/lib', from: './node_modules/select2/dist/css/select2.min.css' },
            { to: 'css/lib', from: './node_modules/font-awesome/css/font-awesome.min.css' },
            { to: 'css/fonts', from: './node_modules/font-awesome/fonts' },
            { to: 'js/app', from: './src/menu.js' },
            { to: 'css/app', from: './src/main.css' }
        ]),
        /*
        new UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
        */
        new ForkCheckerPlugin(),
    ],

    resolve: {
        extensions: ['', '.js', '.ts', '.html', '.scss'],
        plugins: [
            new TsConfigPathsPlugin()
        ]
    },

    externals: [
        'moment',
        'markdown-it'
    ],

    devServer: {
        inline: true,
        colors: true,
        progress: true,
        displayErrorDetails: true,
        displayCached: true,
        port: 3000,
        contentBase: './src',
        historyApiFallback: true
    },

    node: {
        crypto: 'empty' // we need this for 'reflect-metadata' polyfill
    },

    tslint: {
        emitErrors: false,
        failOnHint: false,
        resourcePath: 'src'
    },
}
