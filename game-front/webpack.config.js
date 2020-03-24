const path = require('path');
const webpack = require('webpack');
const BundleAnalyzer = require('webpack-bundle-analyzer');
module.exports = {
    devtool: "source-map",
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        compress: true,
        port: 8080
    },
    optimization: {
        usedExports: true,
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    plugins: [
        // new webpack.optimize.ModuleConcatenationPlugin(),
        new BundleAnalyzer.BundleAnalyzerPlugin()
    ]
};
