import React from "react";
import config from "config/applicationConfig.json"

function App() {
    return <div id="main">
        <ul>

            {config.products.map(({ productName }, index) => {
                return <li key={index}>
                    <a href="">{productName}</a>
                </li>
            })}
        </ul>
    </div>
}

export default App