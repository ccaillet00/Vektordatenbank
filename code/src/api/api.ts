import { type Request, type Response, type Express } from "express"
import { knowledgeBase } from "../db/schema"
import { db } from "../db/database"
import { Ollama } from "ollama"

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
}