import React from "react";
import { Routes, Route } from "react-router-dom"
import routes from "./routes"
import "./main.css"

function App() {
    return <Routes>
        {routes.map((routeObj, index) => <Route key={index} {...routeObj} />)}
    </Routes>
}

export default App