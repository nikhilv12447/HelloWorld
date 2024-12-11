#!/bin/bash
product=${1}
function exec() {
    if ! eval ${1}
    then
        exit 1
    fi
}

read -p "Enter product name:- " productName
read -p "Enter port number:- " port
read -p "Enter CDN url:- " cdnBaseUrl

exec "cd ./products"
exec "mkdir ${product}"
exec "cd ${product}"
exec "npm init -y > /dev/null"
exec "mkdir client server"
exec "touch ./client/index.js"
exec "touch ./server/index.js"
exec '
echo -e "import express from \"express\" \n
import path from \"utils/path\" \n
import config from \"config/applicationConfig.json\" \n
const app = express() \n
const PORT = process.env.PORT || config.products.${product}.port \n
app.use(express.static(path.build(\"${product}\", \"client\"))) \n
app.listen(PORT, () => { \n
    console.log(\"${product} App is running on port \", PORT) \n
})" >> ./server/index.js
'
exec "touch exposeModules.js"
exec 'echo -e "const path = require(\"../../utils/path\") \n module.exports = {}" >> exposeModules.js'
exec 'cd ..; cd ..'
exec "PRODUCT=${product} PRODUCT_NAME=${productName} PORT=${port} CDN_BASE_URL=${cdnBaseUrl} node generateApplicationJSON.js > ./config/applicationConfigg.json"
exec 'cd ./config'
exec 'rm -rf applicationConfig.json'
exec 'mv applicationConfigg.json applicationConfig.json'

echo "Product is successfully setup."
exit 0
#  