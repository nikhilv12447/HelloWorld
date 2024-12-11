const applicationConfig = require("./config/applicationConfig.json")
const { PRODUCT, PRODUCT_NAME, PORT, CDN_BASE_URL } = process.env
applicationConfig.products[PRODUCT] = {
    productName: PRODUCT_NAME,
    port: parseInt(PORT),
    cdnBaseUrl: CDN_BASE_URL
}

process.stdout.write(JSON.stringify(applicationConfig))