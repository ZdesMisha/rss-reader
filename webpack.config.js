var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');

module.exports = {
    entry: [
        './src/main/webapp/static/custom/jsx/app.jsx'
    ],
    output: {
        path: path.join(__dirname, 'src/main/webapp'),
        filename: 'main.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            '__SERVER_HOST__': '"http://localhost:8080/"'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    module: {
        loaders: loaders
    }
};