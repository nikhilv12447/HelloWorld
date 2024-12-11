import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About";
const Feed = React.lazy(() => import("./components/Feed"))
const SalonApp = React.lazy(() => import("salon/App"))
import("salon/test").then(({printName}) => printName("Nikhil Verma"))
function LazyComponent({ Component }) {
    const Fallback = <div>Loading...</div>
    return <Suspense fallback={Fallback}>
        <Component />
    </Suspense>
}
function App() {
    return <div id="main">
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/about" Component={About} />
            <Route path="/feed" element={<LazyComponent Component={Feed} />} />
            <Route path="/salon/*" element={<Suspense fallback="Loading..."><SalonApp /></Suspense>} />
        </Routes>
    </div>
}

export default App