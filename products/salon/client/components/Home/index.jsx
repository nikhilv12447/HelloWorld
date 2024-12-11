import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const nevigate = useNavigate()

    function goToAbout() {
        nevigate("/salon/about")
    }
    return <div>
        <h1>Salon Home Page</h1>
        <button onClick={goToAbout}>About</button>
    </div>
}

export default Home