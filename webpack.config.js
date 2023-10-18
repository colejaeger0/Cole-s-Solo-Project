const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports={
    mode: "development",
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html")
        })
    ],
    target: "web",
    // devServer: {
    //     port: "9500",
    //     static: ["./public"],
    //     open: true,
    //     hot: true,
    //     liveReload: true
    // },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            },
        }]
    }
}