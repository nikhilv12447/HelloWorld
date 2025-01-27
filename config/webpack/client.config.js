const commonConfig = require("./commonConfig")
const path = require("../../utils/path")
const { getRemots } = require("../../utils/remotes")
const applicationConfig = require("../applicationConfig.json")
const { ModuleFederationPlugin } = require("webpack").container
const { dependencies } = require("../../package.json")
const { DefinePlugin } = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = env => {
    const commonClientObj = {
        target: "web",
        mode: "development",
        devtool: 'source-map'
    }
    const definePlugin = new DefinePlugin({
        __SERVER__: false
    })
    const products = env.PRODUCTS?.split(",")
    const configArray = [
        {
            ...commonClientObj,
            ...commonConfig({ server: false }),
            entry: {
                main: path.client("index.js")
            },
            output: {
                filename: '[name].js',
                path: path.build("client"),
                publicPath: `${applicationConfig.cdnBaseUrl}/`
            },
            plugins: [
                definePlugin,
                new ModuleFederationPlugin({
                    name: "app1",
                    remotes: getRemots(Object.keys(applicationConfig.products), applicationConfig.products),
                    shared: {
                        react: dependencies.react,
                        'react-dom': dependencies["react-dom"],
                        "react-router-dom": dependencies["react-router-dom"],
                        "@reduxjs/toolkit": dependencies["@reduxjs/toolkit"],
                        "react-redux": dependencies["react-redux"]
                    },
                }),
                new MiniCssExtractPlugin()
            ]
        }
    ]

    Array.isArray(products) && products.forEach(product => {
        let { dependencies: productDependencies } = require(path.products(product, "package.json"))
        const exposeModules = require(path.products(product, "exposeModules.js"))
        productDependencies = { ...productDependencies, ...dependencies }
        const resolver = {
            alias: {
                "redux-slice": path.products(product, "redux", "index.js"),
                components: path.products(product, "client", "components")
            }
        }

        configArray.push({
            ...commonClientObj,
            ...commonConfig({ server: false, resolver }),
            entry: {
                main: path.products(product, "client", "index.js")
            },
            output: {
                filename: '[name].js',
                path: path.build(product, "client"),
                publicPath: `${applicationConfig.products[product].cdnBaseUrl}/`
            },
            plugins: [
                definePlugin,
                new ModuleFederationPlugin({
                    name: product,
                    filename: 'remoteEntry.js',
                    exposes: exposeModules,
                    shared: {
                        react: productDependencies.react,
                        'react-dom': productDependencies["react-dom"],
                        "react-router-dom": productDependencies["react-router-dom"],
                        "@reduxjs/toolkit": productDependencies["@reduxjs/toolkit"],
                        "react-redux": productDependencies["react-redux"]
                    },
                }),
                new MiniCssExtractPlugin()
            ]
        })
    })

    return configArray
}