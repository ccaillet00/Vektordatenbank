import type { Express } from "express"
import { initializePostsAPI } from "../api/api.ts"


export const initializeAPI = (app: Express) => {
    initializePostsAPI(app)
}