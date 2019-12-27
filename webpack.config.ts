import path from "path"
import CopyPlugin from "copy-webpack-plugin"

const config = {
    mode: "development",
    devtool: "source-map",
    entry: "./index.ts",
    context: path.join(__dirname, "src"),
    output: {
        path: path.join(__dirname, "dist", "js"),
        publicPath: "/",
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                use: "ts-loader",
                include: [path.join(__dirname, "src")],
            },
        ],
    },
    resolve: { extensions: [".ts", ".js", ".json"] },
    plugins: [
        new CopyPlugin([
            { from: "index.html", to: "../" },
            { from: "img/joel-filipe-QwoNAhbmLLo-unsplash.jpg", to: "../img/" },
        ]),
    ],
}

export default config
