import React from "react";
import { useNavigate } from "react-router-dom"

function Home() {
    const nevigate = useNavigate()

    function handleClick(e, path) {
        e.preventDefault()
        nevigate(path)
    }
    return <div>
        Hello From main app
        <div>
            <a onClick={(e) => handleClick(e, "/salon")}>Salon</a>
            <a onClick={(e) => handleClick(e, "/salon/about")}>About Salon</a>
            <a onClick={(e) => handleClick(e, "/feed")}>Feed</a>
        </div>
    </div>
}

export default Home