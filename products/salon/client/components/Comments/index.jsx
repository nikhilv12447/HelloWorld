import React from "react";
import fetchData from "./fetchData";
import { useSelector } from "react-redux";
import useDataFetching from "common/hooks/useDataFetching"
// import loadCss from "./style.css"

function Comments() {
    const comments = useSelector(({ hairCut }) => hairCut.comments) || []
    const { isLoading } = useDataFetching(fetchData, { check: !comments?.length })

    if (isLoading) return <div>Loading is working..</div>
    return <div>
        <ul>
            {comments.map(({ id, userName, comment }) => <li key={id}>
                <div>
                    <label className="username">User Name: {userName}</label>
                </div>
                <p>
                    {comment}
                </p>
            </li>)}
        </ul>
    </div>
}

Comments.fetchData = fetchData

export default Comments