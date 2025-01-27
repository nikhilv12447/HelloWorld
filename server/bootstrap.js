import React from "react"
import express from "express"
import HTML from "./HTML"
import App from "app"
import { renderToPipeableStream } from "react-dom/server"
import path from "path"
import { StaticRouter } from "react-router-dom/server"

const DEVELOPMENT = "development"
const app = express()
const salon = express.Router()
const PORT = process.env.PORT || SERVER_PORT
const ENV = process.env.ENVIRONMENT || DEVELOPMENT

ENV === DEVELOPMENT && app.use(express.static(path.resolve(__dirname, "../client")))

function getScripts() {
    const scripts = [CDN_BASE_URL + "/main.js"]
    return scripts
}

app.use("/salon", salon)

salon.get("*", (req, res) => {
    res.redirect(SALON_CDN_BASE_URL + req.url)
})

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
