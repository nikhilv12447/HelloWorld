import express from "express"

const app = express()
const PORT = 8080
app.get("/", (req, res) => {
    res.send(
        `
            <html>
                <head></head>
                <body>
                    <h1>Wlcome to my dashboard</h1>
                </body>
            </html>
        `
    )
})

app.listen(PORT, () => {
    console.log("server is running on port " + PORT)
})