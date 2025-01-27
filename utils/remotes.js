function getRemots(products = [], config = {}) {
    const remotes = {}
    products.forEach(product => {
        remotes[product] = `${product}@${config[product].cdnBaseUrl}/remoteEntry.js`
    })
    return remotes
}

module.exports.getRemots = getRemots