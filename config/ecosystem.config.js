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
    }]
}