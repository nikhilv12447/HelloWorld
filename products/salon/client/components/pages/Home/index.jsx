import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import primaryApis from "./primaryApis";
import loadable from "loadable"
// import loadCss from "./criticalStyle.css"

const Comments = loadable(() => import("components/Comments"), { ssr: true })

function Home() {
    const nevigate = useNavigate()
    const hairCuts = useSelector(({ hairCut }) => hairCut.list) || []
    const dispatch = useDispatch()

    function goToAbout() {
        nevigate("/salon/about")
    }

    useEffect(() => {
        Array.isArray(hairCuts) && !hairCuts.length && primaryApis(dispatch)
    }, [])

    return <div>
        <h1 className="header text-sm">Salon Home Page</h1>
        <div>
            <ul>
                {hairCuts.map(({ id, name }) => <li key={id}>{name}</li>)}
            </ul>
        </div>
        <button onClick={goToAbout}>About btn</button>
        <Comments />
    </div>
}

Home.primaryApis = primaryApis
// Home.loadCss = loadCss
export default Home