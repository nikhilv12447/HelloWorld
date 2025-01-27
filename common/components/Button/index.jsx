import React from "react";

function Button(props) {
    const {
        name,
        handleOnClick
    } = props || {}

    return <button onClick={handleOnClick}>{name}</button>
}

export default Button