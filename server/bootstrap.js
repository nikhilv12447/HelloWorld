import React from "react"
import express from "express"
import HTML from "./HTML"
import App from "app"
import { renderToPipeableStream } from "react-dom/server"
import config from "config/applicationConfig.json"
import path from "utils/path"
import { StaticRouter } from "react-router-dom/server"

const app = express()
const PORT = process.env.PORT || config.port
const env = process.env.BUILD_TYPE || "development"
env === "development" && app.use(express.static(path.build("client")))

function getScripts() {
    const scripts = []
    // const product = PRODUCTS?.split(",")
    // Array.isArray(product) && product.forEach(product => config.products[product] && scripts.push(`${config.products[product].cdnBaseUrl}routes.js`))
    scripts.push(`${config.cdnBaseUrl}main.js`)
    return scripts
}

app.get("*", (req, res) => {
    console.log("request server from port: ", PORT)
    const { pipe, abort } = renderToPipeableStream(
        <HTML scripts={getScripts()}>
            <StaticRouter location={req.url}>
                <App />
            </StaticRouter>
        </HTML>,
        {
            onShellReady: () => {
                res.setHeader('content-type', 'text/html');
                pipe(res)
            }
        }
    )
})

app.listen(PORT, () => {
    console.log("server is running on port " + PORT)
})
