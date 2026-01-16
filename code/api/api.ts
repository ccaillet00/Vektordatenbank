import { type Request, type Response, type Express } from "express"
import { knowledgeBase } from "../db/schema"
import { db } from "../db/database"
import { eq } from "drizzle-orm"
import { and } from "drizzle-orm"

export const initializePostsAPI = (app: Express) => {