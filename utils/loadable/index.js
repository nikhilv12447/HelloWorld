import React, { Suspense } from "react"
import { useDispatch } from "react-redux"
const LazyComponent = React.lazy(() => import("./LazyComponent"))

function getFetchDataWraper(fetchData) {
    if (!fetchData) return () => { }
    let dataFetch = false
    let promise = null
    return (dispatch) => {
        if (dataFetch) return
        if (promise) throw promise
        promise = new Promise((resolve, reject) => {
            fetchData(dispatch, (isDataFetch) => {
                if (isDataFetch) {
                    dataFetch = true
                    promise = null
                    resolve()
                } else {
                    promise = null
                    reject()
                }
            })
        })

        throw promise
    }
}

function LoadData({ fetchData, children }) {
    const dispatch = useDispatch()
    fetchData((action) => {
        action.flushData = true
        dispatch(action)
    })

    return children
}
export default function (Component, { ssr = false, selectiveHydration = false, fallback = <span>Loading...</span> } = {}) {
    let NewComponent = () => null
    if (__SERVER__) {
        if (ssr) {
            NewComponent = React.memo(function LoadableComponent(props) {
                return <Suspense fallback={fallback}>
                    <Component {...props} />
                </Suspense>
            })
            if (Component.primaryApis) NewComponent.primaryApis = Component.primaryApis
            if (Component.loadCss) NewComponent.loadCss = Component.loadCss
        } else if (selectiveHydration) {
            NewComponent = React.memo(function LoadableComponent(props) {
                return <Suspense fallback={fallback}>
                    <LoadData fetchData={getFetchDataWraper(Component.fetchData)}>
                        <LazyComponent Component={Component} {...props} />
                    </LoadData>
                </Suspense>
            })
            if (Component.primaryApis) NewComponent.primaryApis = Component.primaryApis
            if (Component.loadCss) NewComponent.loadCss = Component.loadCss
        } else {
            Component = React.lazy(Component)
            NewComponent = React.memo(function LoadableComponent(props) {
                return <Suspense fallback={fallback}>
                    <Component {...props} />
                </Suspense>
            })
        }
    } else {
        Component = React.lazy(Component)
        NewComponent = React.memo(function LoadableComponent(props) {
            return <Suspense fallback={fallback}>
                <Component {...props} />
            </Suspense>
        })
    }
    return NewComponent
}