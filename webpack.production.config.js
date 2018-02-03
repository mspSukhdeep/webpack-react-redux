'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var SWPlugin = require('sw-precache-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // The entry file. All your app roots from here.
    entry: [
        // Polyfills go here too, like babel-polyfill or whatwg-fetch
        'babel-polyfill',
        path.join(__dirname, 'app/index.js')
    ],
    // Where you want the output to go
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name]-[hash].min.js',
        publicPath: '/'
    },
    plugins: [
        new CopyWebpackPlugin([
        {
            from: 'app/pwa/', to: ''
        }
        ]),
        new ManifestPlugin({
            fileName: 'asset-manifest.json'
        }),
        new SWPlugin({
              // By default, a cache-busting query parameter is appended to requests
              // used to populate the caches, to ensure the responses are fresh.
              // If a URL is already hashed by Webpack, then there is no concern
              // about it being stale, and the cache-busting can be skipped.
              dontCacheBustUrlsMatching: /\.\w{8}\./,
              filename: 'service-worker.js',
              stripPrefix: '/Applications/XAMPP/xamppfiles/htdocs/boil_new/webpack-react-redux/dist',
              replacePrefix: '/m/pwa',
              logger(message) {
                if (message.indexOf('Total precache size is') === 0) {
                  // This message occurs for every build and is a bit too noisy.
                  return;
                }
                console.log(message);
              },
              runtimeCaching: [{
                  //Purge Cache Daily
                  urlPattern: /https:\/\/sukhd\.com/,
                  handler: 'cacheFirst'
              },
              {
                  //Cache for longer intervals
                  urlPattern: /https:\/\/assets\.mspcdn\.net/,
                  handler: 'cacheFirst'
              },
              {
                  //Do Not Cache - Remove after some time
                  urlPattern: /https:\/\/res\.cloudinary\.com/,
                  handler: 'cacheFirst'
              }],
              minify: true, // minify and uglify the script
              navigateFallback: '/index.html',
              staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
        }),
        // webpack gives your modules and chunks ids to identify them. Webpack can vary the
        // distribution of the ids to get the smallest id length for often used ids with
        // this plugin
        new webpack.optimize.OccurenceOrderPlugin(),

        // handles creating an index.html file and injecting assets. necessary because assets
        // change name because the hash part changes. We want hash name changes to bust cache
        // on client browsers.
        new HtmlWebpackPlugin({
            template: 'app/index.html',
            inject: 'body',
            filename: 'index.html'
        }),
        // extracts the css from the js files and puts them on a separate .css file. this is for
        // performance and is used in prod environments. Styles load faster on their own .css
        // file as they dont have to wait for the JS to load.
        new ExtractTextPlugin('[name]-[hash].min.css'),
        // handles uglifying js
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true
            }
        }),
        // creates a stats.json
        new StatsPlugin('webpack.stats.json', {
            source: false,
            modules: false
        }),
        // plugin for passing in data to the js, like what NODE_ENV we are in.
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    module: {
        // loaders handle the assets, like transforming sass to css or jsx to js.
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.json?$/,
            loader: 'json'
        }, {
            test: /\.scss$/,
            // we extract the styles into their own .css file instead of having
            // them inside the js.
            loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]---[local]---[hash:base64:5]!sass')
        }, {
            test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/,
            loader: 'file'
        },
        {
              test: /\.css$/,
              loader: 'style-loader'
        },
        {
            test: /\.css$/,
            loader: 'css-loader',
            query: {
                minify: true
            }
        }]
    },
    postcss: [
        require('autoprefixer')
    ]
};
