import express from "express"
import path from "utils/path"
import config from "config/applicationConfig.json"
const app = express()
const PORT = process.env.PORT || config.products.common.port
app.use(express.static(path.build("common", "client")))
app.listen(PORT, () => {
    console.log("common App is running on port ", PORT)
})
