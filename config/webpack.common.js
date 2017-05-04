const webpack = require('webpack');
const helpers = require('./helpers');
const pkg = require('../package.json');

module.exports = {
    entry: {
      'index': './src/index.js',
    },
    
    devtool: 'source-map',

    output: {
        path: helpers.root('dist'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        libraryTarget: 'umd',
        library: 'Servable',
        umdNamedDefine: true,
    },

    performance: {
        hints: false
    },

    resolve: {
        extensions: ['*', '.js'],
        modules: [helpers.root('node_modules')],
    },
    resolveLoader: {
        modules: [helpers.root('node_modules')]
    },

    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['es2015', {modules: false, loose: true}], 'stage-0'],
                    }
                },
                include: helpers.root('src')
            },
        ]
    },
    
    plugins: [
        new webpack.BannerPlugin(`servable v${pkg.version}
${pkg.homepage}
@author ${pkg.author}`)
    ]
};