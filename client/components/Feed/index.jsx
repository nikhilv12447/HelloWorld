import React from "react";
import Button from "common/components/Button"
import { useNavigate } from "react-router-dom";

function Feed() {
    const nevigate = useNavigate();

    function handleOnClick() {
        nevigate("/")
    }
    return <div>
        Feed
        <Button name="Home" handleOnClick={handleOnClick} />
    </div>
}

export default Feed