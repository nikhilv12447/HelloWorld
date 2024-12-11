const commonConfig = require("./commonConfig")
const path = require("../../utils/path")
const { getRemots } = require("../../utils/remotes")
const applicationConfig = require("../applicationConfig.json")
const { DefinePlugin, container: { ModuleFederationPlugin } = {} } = require("webpack")
const { dependencies } = require("../../package.json")

module.exports = env => {
    const commonClientObj = {
        target: "node",
        mode: "development",
        devtool: 'source-map',
        ...commonConfig
    }
    const products = env.PRODUCTS?.split(",")

    const configArray = [
        {
            ...commonClientObj,
            entry: {
                server: path.server("index.js")
            },
            output: {
                filename: '[name].js',
                path: path.build("server")
            },
            plugins: [
                new DefinePlugin({
                    PRODUCTS: `"${env.PRODUCTS}"`
                }),
                new ModuleFederationPlugin({
                    name: "app1",
                    remotes: getRemots(Object.keys(applicationConfig.products), applicationConfig.products),
                    shared: {
                        react: dependencies.react,
                        'react-dom': dependencies["react-dom"],
                        "react-router-dom": dependencies["react-router-dom"],
                    }
                })
            ]
        }
    ]

    Array.isArray(products) && products.forEach(product => {
        configArray.push({
            ...commonClientObj,
            entry: {
                server: path.products(product, "server", "index.js")
            },
            output: {
                filename: '[name].js',
                path: path.build(product, "server")
            }
        })
    })

    return configArray
}