const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const glob = require('glob');

module.exports = {
    mode: 'production',
    entry: "./static/js/main.js",//glob.sync('./themes/hugo-creative-theme/static/js/*.js'),
    output: {
        path: path.resolve(__dirname, './static/js/'),
        filename: 'bundle.js'
    },
    // resolve: {
        // extensions: ['.ts', '.js']
    // },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            // { test: /\.tsx?$/, loader: 'ts-loader' },
            // { test: /\.js$/, loader: 'ts-loader' },
            // {
                // test: /\.s?css$/, loaders: ['style-loader', 'css-loader'],
                // //options: {
                // //    modules: true
                // //}
            // }
        ]
    },
    plugins: [
       // new webpack.optimize.UglifyJsPlugin(),
        //new SingleEntryPlugin(__dirname, "./app", "bundle"),
     //   new HtmlWebpackPlugin({ template: './src/index.html' })
		 new webpack.ProvidePlugin({   
		 jquery: './jquery',
		 $: './jquery',
		 jQuery: './jquery'
		})
    ]
};