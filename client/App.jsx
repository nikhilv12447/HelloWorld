import React from "react";
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About";
import loadable from "loadable";

const Feed = loadable(() => import("./components/Feed"))
const SalonApp = loadable(() => import("salon/App"))

function RemoteApps() {
    return <>
        <SalonApp />
    </>
}
function App() {
    return <div id="main">
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/about" Component={About} />
            <Route path="/feed" Component={Feed} />
            {/* <Route path="*" Component={RemoteApps} /> */}
            <Route path="/salon/*" Component={SalonApp} />
        </Routes>
    </div>
}

export default App