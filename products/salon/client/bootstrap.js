import React from "react"
import { hydrateRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import reducers from "redux-slice"
import { Provider } from "react-redux"
import getStore from "redux-store"


hydrateRoot(
    document.getElementById("app"),
    <Provider
        store={getStore({
            reducers: reducers,
            initialState: window.INITIAL_STATE
        })}
    >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)