import React from "react"
import loadable from "loadable"
// import Home from "./components/pages/Home"
const Home = loadable(() => import("./components/pages/Home"), { ssr: true })
const About = loadable(() => import("./components/pages/About"))

export default [
    {
        path: "/salon?",
        // Component: Home,
        element: <Home />
    },
    {
        path: "/salon?/about",
        Component: About
    }
]