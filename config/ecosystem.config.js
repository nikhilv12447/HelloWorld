
    module.exports = {
    apps: [{
        name: "build",
        script: "./buildMaster.js",
        env: {
            PRODUCTS: "salon"
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

        {
        name: "salon",
        script: "./build/salon/server/server.js",
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
    ]}