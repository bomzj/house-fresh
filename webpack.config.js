const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    //mode: 'production',
	mode: 'development',
	devtool: 'source-map',
    entry: "./src/js/main.js",//glob.sync('./themes/hugo-creative-theme/static/js/*.js'),
    output: {
        path: path.resolve(__dirname, './static/js/'),
        filename: 'bundle.js',
		libraryTarget: 'umd'
    },
	
    module: {
        rules: [
		{ 
			test: /\.js$/,
			//loader: "babel-loader"
			use: {
				loader: "babel-loader",
				options: {
					presets: ["es2015"]
				}
				// options: {  
					// sourceMap: true
				// }
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