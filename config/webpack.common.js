const webpack = require('webpack');
const helpers = require('./helpers');

const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

const entry = require('../webpack.entry');

module.exports = function(options) {
    isProd = options.env == 'production';
    return {
        entry: entry,
        resolve: {
            extensions: ['.ts', '.js', '.json'],
            modules: [helpers.root('src'), 'node_modules'],
        },
        externals: {
            'moment': 'moment',
            'markdown-it': 'markdown-it',
            'lodash': '_',
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
                    exclude: [/\.(spec|e2e)\.ts$/]
                },
                {
                    test: /\.html$/,
                    loaders: ['raw-loader']
                },
                {
                    test: /\.scss$/,
                    loaders: ['raw-loader', 'sass-loader']
                }
            ]
        },
        plugins: [
            new ForkCheckerPlugin(),
            new CommonsChunkPlugin({
                name: ['polyfills', 'vendor'].reverse()
            }),
            // See: https://github.com/angular/angular/issues/11580
            new ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
                helpers.root('src')
            ),
            new CopyWebpackPlugin([
                { to: 'js/lib',    from: './node_modules/moment/min/moment-with-locales.min.js' },
                { to: 'js/lib',    from: './node_modules/moment/min/moment.min.js' },
                { to: 'js/lib/moment.zh-cn.js', from: './node_modules/moment/locale/zh-cn.js' },
                { to: 'js/lib',    from: './node_modules/markdown-it/dist/markdown-it.min.js' },
                { to: 'js/lib',    from: './node_modules/jquery/dist/jquery.slim.min.js' },
                { to: 'js/lib',    from: './node_modules/tether/dist/js/tether.min.js' },
                { to: 'js/lib',    from: './node_modules/bootstrap/dist/js/bootstrap.min.js' },
                { to: 'css/lib',   from: './node_modules/bootstrap/dist/css/bootstrap.min.css' },
                { to: 'js/lib',    from: './node_modules/bootstrap-submenu/dist/js/bootstrap-submenu.min.js' },
                { to: 'css/lib',   from: './node_modules/bootstrap-submenu/dist/css/bootstrap-submenu.min.css' },
                { to: 'js/lib',    from: './node_modules/select2/dist/js/select2.min.js' },
                { to: 'css/lib',   from: './node_modules/select2/dist/css/select2.min.css' },
                { to: 'js/lib',    from: './node_modules/lodash/lodash.min.js' },
                { to: 'css/lib',   from: './node_modules/font-awesome/css/font-awesome.min.css' },
                { to: 'css/fonts', from: './node_modules/font-awesome/fonts' },
                { to: 'css/app',   from: './src/main.css' },
                { to: 'images',    from: './images/favicon.ico' }
            ]),
            new LoaderOptionsPlugin({}),
        ],
        node: {
            global: true,
            crypto: 'empty',
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    };
}
