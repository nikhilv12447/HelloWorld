const path = require("../../utils/path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ({ server, resolver: { extensions = [], alias = {} } = {} }) => {
    return {
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        module: {
            rules: [
                {
                    test: /\.(?:js|mjs|cjs|jsx)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                envName: server ? "server" : "client"
                            }
                        }
                    ]
                },
                {
                    test: /\.(?:css)$/,
                    exclude: /\.(?:lazy.css)$/,
                    use: [
                        // path.utils("show-src.js"),
                        // { loader: "style-loader" },
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    config: path.config("postcss.config.js")
                                }
                            }
                        }
                    ]
                },
                // {
                //     test: /\.(?:lazy.css)$/,
                //     use: [
                //         path.utils("show-src.js"),
                //         { loader: "style-loader" },
                //         // MiniCssExtractPlugin.loader,
                //         "css-loader",
                //         {
                //             loader: "postcss-loader",
                //             options: {
                //                 postcssOptions: {
                //                     config: path.config("postcss.config.js")
                //                 }
                //             }
                //         }
                //     ]
                // }
            ]
        },
        resolve: {
            extensions: ['.js', '.json', '.jsx', ...extensions],
            alias: {
                app$: path.client("App.jsx"),
                loadable: path.utils("loadable"),
                fetch: path.fetch(),
                "redux-store": path.reduxStore(),
                common: path.common(),
                utils: path.utils(),
                ...alias
            }
        }
    }
}