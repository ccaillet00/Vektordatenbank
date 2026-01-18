import express from "express";
import { initializeAPI } from "./api/index.ts";
import { initializeOllama } from "../services/ai.ts";

const app = express()
app.use(express.json());
const port = 3000

await initializeOllama()

initializeAPI(app)

app.listen(port, () => {
    console.log("Webserver is running on", port)
})