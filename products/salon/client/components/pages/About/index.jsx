import React from "react";

function About({ Name }) {
    return <h1>Hi from salon about page. {Name}</h1>
}

About.fetchData = (cb) => {
    setTimeout(() => {
        cb({ isDataFetch: true })
    }, 5000);
}
export default About