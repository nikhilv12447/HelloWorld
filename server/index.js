import React from "react"
import express from "express"
import HTML from "./HTML"
import App from "app"
import { renderToPipeableStream } from "react-dom/server"
import config from "config/applicationConfig.json"
import path from "utils/path"

const app = express()
const PORT = process.env.PORT || config.port
const env = process.env.BUILD_TYPE || "development"
env === "development" && app.use(express.static(path.build("client")))
console.log("request server from port: ", PORT)
app.get("/", (req, res) => {

    const { pipe, abort } = renderToPipeableStream(
        <HTML>
            <App />
        </HTML>,
        {
            bootstrapScripts: [`${config.cdnBaseUrl}main.js`],
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
