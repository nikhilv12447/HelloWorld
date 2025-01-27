import { configureStore } from "@reduxjs/toolkit"
import { getFlushDataMiddleware } from "./reduxMiddleware"

export default function getStore(config = {}, res) {
    const { reducers, initialState = {} } = config
    const middleware = __SERVER__ ? [getFlushDataMiddleware(res)] : []
    const store = configureStore({
        preloadedState: initialState,
        reducer: reducers,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleware)
    })

    if (!__SERVER__) {
        window.dispatch = function (action) {
            store.dispatch(action)
        }
    }
    return store
}