import React, { Suspense } from "react";
import config from "config/applicationConfig.json"
const Feed = React.lazy(() => import("./components/Feed"))

function App() {
    return <div id="main">
        <ul>

            {config.products.map(({ productName }, index) => {
                return <li key={index}>
                    <a href="">{productName}</a>
                </li>
            })}

            <Suspense fallback={() => <span>Loading..</span>}>
                <Feed />
            </Suspense>
        </ul>
    </div>
}

export default App