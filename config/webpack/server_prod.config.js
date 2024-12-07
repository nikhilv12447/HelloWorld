const commonConfig = require("./commonConfig")
const path = require("../../utils/path")

module.exports = {
    target: "node",
    mode: "production",
    entry: {
        server: path.server("index.js")
    },
    output: {
        filename: '[name].js',
        path: path.build("server")
    },
    ...commonConfig
}