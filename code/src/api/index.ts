import type { Express } from "express"
import { initializeVektorAPI } from "../api/api.ts"


export const initializeAPI = (app: Express) => {
    initializeVektorAPI(app)
}