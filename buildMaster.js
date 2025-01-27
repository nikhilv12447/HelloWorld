const webpack = require("webpack")
const clientConfig = require("./config/webpack/client.config")
const serverConfig = require("./config/webpack/server.config")
const products = process.env.PRODUCTS || process.argv[2]

function callback(err, stats) {
    if (err) {
        console.error(err);
        return;
    }

    console.log(stats.toString({
        chunks: false,
        colors: true
    }));
}
const clientCompiler = webpack(clientConfig({ PRODUCTS: products ? products : null }))
const serverCompiler = webpack(serverConfig({ PRODUCTS: products ? products : null }))
clientCompiler.watchMode = true
serverCompiler.watchMode = true
clientCompiler.watch({}, callback)
serverCompiler.watch({}, callback)