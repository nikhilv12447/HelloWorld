const path = require("path")
const currentWorkingDir = process.cwd()

function getResolvedPath (baseDir) {
    return function (...paths) {
        return path.resolve(currentWorkingDir, baseDir, ...paths)
    }
}

module.exports = {
    server: getResolvedPath("server"),
    client: getResolvedPath("client"),
    build: getResolvedPath('build'),
    config: getResolvedPath('config'),
    utils: getResolvedPath('utils'),
    products: getResolvedPath('products')
}