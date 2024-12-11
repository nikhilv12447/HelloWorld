import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
const About = React.lazy(() => import("./components/About"))
// import About from "./components/About";

function App() {
    console.log("yoooo from app")
    return <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Suspense fallback="Loading..."><About /></Suspense>} />
    </Routes>
}

export default App