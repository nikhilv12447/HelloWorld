
    module.exports = {
    apps: [{
        name: "app1",
        script: "./build/server/server.js",
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
    
        {
        name: "common",
        script: "./build/common/server/server.js",
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