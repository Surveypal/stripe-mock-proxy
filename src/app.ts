import bodyParser from "body-parser"
import express from "express"
import type { Express, Request } from "express"
import morgan from "morgan"

import config from "./config"

const app: Express = express()

app.use(morgan("combined"))
app.use(bodyParser.json())

app.get("/ping", (req, res) => {
    res.type("json")
    res.status(200)
    res.send("pong")
})

export default app
