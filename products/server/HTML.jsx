import React from "react";

function HTML(props) {
    const { children, scripts = [], styleTags = [] } = props
    return <html lang="en">
        <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Hello World Salon</title>
            <style>
                {styleTags}
            </style>
        </head>
        <body>
            <div id="app">
                {children}
            </div>
            {scripts.map((url, index) => <script key={index} src={url}></script>)}
        </body>
    </html>
}

export default HTML