const commonConfig = require("./commonConfig")
const path = require("../../utils/path")
const applicationConfig = require("../applicationConfig.json")

module.exports = {
    target: "web",
    mode: "development",
    entry: {
        main: path.client("index.js")
    },
    output: {
        filename: '[name].js',
        path: path.build("client"),
        publicPath: applicationConfig.cdnBaseUrl
    },
    ...commonConfig
}