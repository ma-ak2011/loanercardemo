var path = require('path');
var webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = [
    {
        context: path.join(__dirname, 'src'),
        entry: {
            app: './js/index.jsx'
        },
        output: {
            path: path.join(__dirname, 'public/js'),
            publicPath: ASSET_PATH,
            filename: '[name]-[hash].js'
        },
        module: {
            rules: [
                {
                    test: /\.js[x]?$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                    query:{
                        presets: ['react', 'env']
                    }
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    loader: 'file-loader',
                    options: {},
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader"
                    ]
                },
                { test: /\.(otf|eot|ttf)$/, loader: "file?prefix=font/" },
                { test: /\.svg$/, loader: "file" },
                { test: /\.html$/, loader: "html-loader" }
            ]
        },
        resolve: {
            modules: [path.resolve(__dirname, "src/js"), "node_modules"],
            extensions: ['.js', '.jsx']
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name]-[hash].css",
                chunkFilename: "[id].css"
            }),
            new HtmlWebpackPlugin({
                template: "./html/index.html"
            }),
            new webpack.DefinePlugin({
                'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
            })
        ],
    }
];