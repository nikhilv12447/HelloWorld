const commonConfig = require("./commonConfig")
const path = require("../../utils/path")
const { getRemots } = require("../../utils/remotes")
const applicationConfig = require("../applicationConfig.json")
const { DefinePlugin, container: { ModuleFederationPlugin } = {} } = require("webpack")
const { dependencies } = require("../../package.json")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = env => {
    const commonClientObj = {
        target: "node",
        mode: "development",
        devtool: 'source-map'
    }
    const commonBuildEnvVariable = {
        __SERVER__: true
    }
    const products = env.PRODUCTS?.split(",")

    const configArray = [
        {
            ...commonClientObj,
            ...commonConfig({ server: true }),
            entry: {
                server: path.server("index.js")
            },
            output: {
                filename: '[name].js',
                path: path.build("server")
            },
            plugins: [
                new DefinePlugin({
                    ...commonBuildEnvVariable,
                    SERVER_PORT: applicationConfig.port,
                    CDN_BASE_URL: `"${applicationConfig.cdnBaseUrl}"`,
                    SALON_CDN_BASE_URL: `"${applicationConfig.products.salon.cdnBaseUrl}"`,
                    BEAUTY_PARLOR_CDN_BASE_URL: `"${applicationConfig.products.beautyParlor.cdnBaseUrl}"`
                }),
                new ModuleFederationPlugin({
                    name: "app1",
                    remotes: getRemots(Object.keys(applicationConfig.products), applicationConfig.products),
                    shared: {
                        react: dependencies.react,
                        'react-dom': dependencies["react-dom"],
                        "react-router-dom": dependencies["react-router-dom"],
                    }
                }),
                new MiniCssExtractPlugin()
            ]
        }
    ]

    Array.isArray(products) && products.forEach(product => {
        const resolver = {
            alias: {
                "redux-slice": path.products(product, "redux"),
                components: path.products(product, "client", "components"),
                productApp$: path.products(product, "client", "App.jsx"),
                productRoutes$: path.products(product, "client", "routes.js")
            }
        }
        configArray.push({
            ...commonClientObj,
            ...commonConfig({ server: true, resolver }),
            entry: {
                server: path.products("server")
            },
            output: {
                filename: '[name].js',
                path: path.build(product, "server")
            },
            plugins: [
                new DefinePlugin({
                    ...commonBuildEnvVariable,
                    PRODUCT: `"${product}"`,
                    SERVER_PORT: applicationConfig.products[product].port,
                    CDN_BASE_URL: `"${applicationConfig.products[product].cdnBaseUrl}"`
                }),
                new MiniCssExtractPlugin()
            ]
        })
    })

    return configArray
}