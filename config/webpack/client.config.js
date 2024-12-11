const commonConfig = require("./commonConfig")
const path = require("../../utils/path")
const { getRemots } = require("../../utils/remotes")
const applicationConfig = require("../applicationConfig.json")
const { ModuleFederationPlugin } = require("webpack").container
const { dependencies } = require("../../package.json")

module.exports = env => {
    const commonClientObj = {
        target: "web",
        mode: "development",
        devtool: 'source-map',
        ...commonConfig
    }
    const products = env.PRODUCTS?.split(",")
    const configArray = [
        {
            ...commonClientObj,
            entry: {
                main: path.client("index.js")
            },
            output: {
                filename: '[name].js',
                path: path.build("client"),
                publicPath: applicationConfig.cdnBaseUrl
            },
            plugins: [
                new ModuleFederationPlugin({
                    name: "app1",
                    remotes: getRemots(Object.keys(applicationConfig.products), applicationConfig.products),
                    shared: {
                        react: dependencies.react,
                        'react-dom': dependencies["react-dom"],
                        "react-router-dom": dependencies["react-router-dom"],
                    },
                })
            ]
        }
    ]

    Array.isArray(products) && products.forEach(product => {
        let { dependencies: productDependencies } = require(path.products(product, "package.json"))
        const exposeModules = require(path.products(product, "exposeModules.js"))
        productDependencies = { ...productDependencies, ...dependencies }
        configArray.push({
            ...commonClientObj,
            entry: {
                main: path.products(product, "client", "index.js")
            },
            output: {
                filename: '[name].js',
                path: path.build(product, "client"),
                publicPath: `${applicationConfig.products[product].cdnBaseUrl}`
            },
            plugins: [
                new ModuleFederationPlugin({
                    name: product,
                    filename: 'remoteEntry.js',
                    exposes: exposeModules,
                    shared: {
                        react: productDependencies.react,
                        'react-dom': productDependencies["react-dom"],
                        "react-router-dom": productDependencies["react-router-dom"],
                    },
                })
            ]
        })
    })

    return configArray
}