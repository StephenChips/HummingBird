const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',

    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bms.bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.vue$/i,
                loader: 'vue-loader'
            }
        ]
    },

    resolve: {
        alias: {
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages')
        }
    },

    plugins: [
        new HTMLWebpackPlugin({
            title: 'Hummingbird',
            template: './src/index.html'
        }),
        new VueLoaderPlugin()
    ]
}
