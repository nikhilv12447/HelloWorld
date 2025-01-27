const fs = require("fs")
const { exec } = require('node:child_process');
const products = process.argv[2] ? process.argv[2].split(",") : []

let content = `
    module.exports = {
    apps: [{
        name: "build",
        script: "./buildMaster.js",
        env: {
            PRODUCTS: "${process.argv[2] || ""}"
        },
        env_test: {
            NODE_ENV: "test",
        },
        env_staging: {
            NODE_ENV: "staging",
        },
        env_production: {
            PORT: 8080,
            BUILD_TYPE: "production"
        }
    },
    {
        name: "app1",
        script: "./build/server/server.js",
        dependencies: ["build"],
        watch: true,
        env: {
            PORT: 8080,
            BUILD_TYPE: "development"
        },
        env_test: {
            NODE_ENV: "test",
        },
        env_staging: {
            NODE_ENV: "staging",
        },
        env_production: {
            PORT: 8080,
            BUILD_TYPE: "production"
        }
    },
`
products.forEach(product => {
    content += `
        {
        name: "${product}",
        script: "./build/${product}/server/server.js",
        dependencies: ["build"],
        watch: true,
        env: {
            NODE_ENV: "local",
        },
        env_test: {
            NODE_ENV: "test",
        },
        env_staging: {
            NODE_ENV: "staging",
        },
        env_production: {
            NODE_ENV: "staging"
        }
    },
    `
})

content += `]}`

function execCmd(cmd) {
    exec(cmd, (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            return;
        }

        console.log(`stdout: ${stdout}`);
    });
}

fs.writeFileSync("./config/ecosystem.config.js", content)
// console.log(`pm2 start ./config/ecosystem.config.js --only "build" && pm2 start ./config/ecosystem.config.js --only "app1${process.argv[2] ? "," + process.argv[2] : ""}"`)
execCmd("pm2 start ./config/ecosystem.config.js")