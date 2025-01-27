import React from "react";

function LazyComponent({ Component, ...props }) {
    return <Component {...props} />
}

export default LazyComponent