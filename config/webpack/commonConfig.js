const path = require("../../utils/path")

module.exports = {
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        alias: {
            config: path.config(),
            app$: path.client("App.jsx"),
            utils: path.utils(),
            client: path.client()
        }
    }
}