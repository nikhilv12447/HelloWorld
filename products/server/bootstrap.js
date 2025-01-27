import React from "react"
import express from "express"
import path from "path"
import { renderToPipeableStream } from "react-dom/server"
import { StaticRouter } from "react-router-dom/server"
import App from "productApp"
import routes from "productRoutes"
import { matchRoutes } from "react-router-dom"
import HTML from "./HTML"
import { Provider } from "react-redux"
import reducers from "redux-slice"
import getStore from "redux-store"

const DEVELOPMENT = "development"
const app = express()
const PORT = process.env.PORT || SERVER_PORT
const ENV = process.env.ENVIRONMENT || DEVELOPMENT

ENV === DEVELOPMENT && app.use(express.static(path.resolve(__dirname, "../client")))

function getScripts() {
    const scripts = [CDN_BASE_URL + "/main.js"]
    return scripts
}

app.get("*", async (req, res) => {
    const store = getStore({
        reducers: reducers
    }, res)
    const matchRoute = matchRoutes(routes, req.url)
    let styleTags = []
    if (Array.isArray(matchRoute)) {
        const { element, Component } = matchRoute[0].route
        let primaryApis = null
        let loadCss = null
        if (element) {
            primaryApis = element.type.primaryApis
            loadCss = element.type.loadCss
        } else if (Component) {
            primaryApis = Component.primaryApis
            loadCss = Component.loadCss
        }
        // console.log(typeof loadCss, loadCss())
        typeof primaryApis === "function" && await primaryApis(store.dispatch)
        styleTags = typeof loadCss === "function" ? loadCss() : []
    }
    const { pipe } = renderToPipeableStream(
        <HTML scripts={getScripts()} styleTags={styleTags}>
            <Provider store={store}>
                <StaticRouter location={req.url}>
                    <App />
                </StaticRouter>
            </Provider>
        </HTML>,
        {
            onShellReady() {
                res.setHeader('content-type', 'text/html');
                pipe(res)
                res.write("<script>")
                res.write("window.INITIAL_STATE = " + JSON.stringify(store.getState()))
                res.write("</script>")
            }
        }
    )
})

app.listen(PORT, () => {
    console.log("Salon App is running on port ", PORT)
})