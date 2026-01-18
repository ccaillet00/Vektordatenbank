import { type Request, type Response, type Express } from "express"
import { knowledgeBase } from "../db/schema"
import { db } from "../db/database"
import { Ollama } from "ollama"
import { cosineDistance, desc, gt, sql } from 'drizzle-orm'

const ollama = new Ollama()

export const initializeVektorAPI = (app: Express) => {

    app.post("/api/embedding", async (req: Request, res: Response) => {
        try {
            const { content } = req.body

            const response = await ollama.embeddings({
                model: "mxbai-embed-large",
                prompt: content,
            });
        
        const embedding = response.embedding
        const result = await db.insert(knowledgeBase).values({content: content, embedding}).returning();
        res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).send("Fehler beim Generieren des Embeddings");
        }
    })

        app.post("/api/query", async (req: Request, res: Response) => {
        try {
            const { question } = req.body
            
            const getAnswer = await ollama.embeddings({
                model: "mxbai-embed-large",
                prompt: question,
            });
        const queryEmbedding = getAnswer.embedding
        const similarity = sql<number>`1 - (${cosineDistance(knowledgeBase.embedding, queryEmbedding)})`;
        const answer = await db
        .select({ id: knowledgeBase.id, content: knowledgeBase.content, similarity})
        .from(knowledgeBase)
        .where(gt(similarity, 0.5))
        .orderBy(desc(similarity))
        .limit(4)
        res.status(200).json(answer)
        } catch (error) {
            console.log(error)
            res.status(500).send("Fehler beim abfragen ")
        }
    })
}