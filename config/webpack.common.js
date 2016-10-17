const webpack = require('webpack');
const helpers = require('./helpers');

const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

module.exports = function(options) {
    isProd = options.env == 'production';
    return {
        entry: {
            'polyfills':             './src/polyfills.browser.ts',
            'vendor':                './src/vendor.browser.ts',
            'navbar':                './src/navbar/main.ts',
            'todo':                  './src/todo/main.ts',
            'plan/settings/subject': './src/plan/settings/subject/main.ts',
            'plan/settings/program': './src/plan/settings/program/main.ts',
            'plan/vision/list':      './src/plan/vision/public/list.ts',
            'plan/vision/item':      './src/plan/vision/public/item.ts',
            'plan/vision/draft':     './src/plan/vision/draft/main.ts',
            'plan/vision/review':    './src/plan/vision/review/main.ts',
            'plan/scheme/list':      './src/plan/scheme/public/list.ts',
            'plan/scheme/item':      './src/plan/scheme/public/item.ts',
            'plan/scheme/draft':     './src/plan/scheme/draft/main.ts',
            'plan/scheme/review':    './src/plan/scheme/review/main.ts',
            'card/reissue/admin':    './src/card/reissue/admin/main.ts',
            'card/reissue/form':     './src/card/reissue/form/main.ts',
            'card/reissue/order':    './src/card/reissue/order/main.ts',
            'place/booking/form':    './src/place/booking/form/main.ts'
        },
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
