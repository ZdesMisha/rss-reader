var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
		'webpack/hot/only-dev-server',
		'./src/main/webapp/static/custom/jsx/app.jsx'
	],
	devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
	output: {
		path: path.join(__dirname, 'src/main/webapp'),
		filename: 'main.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},

	module: {
		loaders: loaders
	},
	devServer: {
		port: 3000, // Port Number
		contentBase: "./src/main/webapp",
			noInfo: true, //  --no-info option
			hot: true,
			inline: true
		},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'__SERVER_HOST__': '"http://localhost:8080/"'
		})
	]
};
