import express from "express"
import path from "utils/path"
import config from "config/applicationConfig.json"
const app = express()
const PORT = process.env.PORT || config.products.beautyParlor.port

app.use(express.static(path.build("beautyParlor", "client")))

app.listen(PORT, () => {
    console.log("Salon App is running on port ", PORT)
})