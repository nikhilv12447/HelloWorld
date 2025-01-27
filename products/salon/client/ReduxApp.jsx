import React from "react";
import App from "./App"
import reducers from "redux-slice"
import { Provider } from "react-redux"
import getStore from "redux-store"

function ReduxApp() {
    return <Provider
        store={getStore({
            reducers,
            initialState: window.INITIAL_STATE
        })}
    >
        <App />
    </Provider>
}

export default ReduxApp