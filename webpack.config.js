const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader');

module.exports = (env, argv) => {
	return {
		mode: argv.mode,
		devtool: 'source-map',
		watch: argv.mode == 'development',
		watchOptions: {
			ignored: ['/node_modules/', '/static/']
		},
		entry: "./src/js/main.js",//glob.sync('./themes/hugo-creative-theme/static/js/*.js'),
		output: {
			path: path.resolve(__dirname, './static/js/'),
			filename: 'bundle.js',
			libraryTarget: 'umd'
		},
		resolve: {
			alias: {
				// full vue version = vue + vue template compiler
				vue: 'vue/dist/vue.js'
			}
		},
		module: {
			rules: [
			{ 
				test: /\.js$/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["env"],
					}
				}
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							//if you are having trouble with urls not resolving add this setting.
							//see https://github.com/webpack-contrib/css-loader#url
							url: false,
							minimize: true,
							//sourceMap: true
						}
					}, 
					{
						loader: 'sass-loader',
						options: {
							//sourceMap: true
						}
					}
				]
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			}
			]
		},
		plugins: [
			// For bootstrap.js during compilation
			new webpack.ProvidePlugin({   
				jquery: './jquery',
				$: './jquery',
				jQuery: './jquery'
			}),
			new MiniCssExtractPlugin({
			  filename: "../css/[name].css"
			}),
			new VueLoaderPlugin()
		]
	};
}