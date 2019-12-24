import path from "path"

const config = {
    mode: "development",
    devtool: "source-map",
    entry: "src/index.ts",
    output: {
        path: path.join(__dirname, "dist", "js"),
        publicPath: "/",
        filename: "[name]",
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
}

export default config
