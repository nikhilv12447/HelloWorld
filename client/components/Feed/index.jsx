import React, { Suspense } from "react";
const Button = React.lazy(() => import("common/Button"))

function LazyComponent({ children }) {
    const Fallback = <div>Loading...</div>
    return <Suspense fallback={Fallback}>
        {children}
    </Suspense>
}

function Feed() {
    return <div>
        Feed
        <LazyComponent>
            <Button name="Click Me" />
        </LazyComponent>
    </div>
}

export default Feed