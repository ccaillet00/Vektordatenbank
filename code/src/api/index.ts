import type { Express } from "express"
import { initializeVektorAPI } from "../api/api.ts"
import { initializeVektorAPICSV } from "./api-csv.ts"


export const initializeAPI = (app: Express) => {
    initializeVektorAPI(app)
    initializeVektorAPICSV(app)
}