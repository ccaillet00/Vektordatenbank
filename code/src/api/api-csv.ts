import { type Request, type Response, type Express } from "express"
import { knowledgeBase } from "../db/schema"
import { db } from "../db/database"
import { Ollama } from "ollama"
import multer  from "multer"
import  csv  from "csv-parser"
import fs  from "fs"

const ollama = new Ollama()
const upload = multer({ dest: "uploads/"})

export const initializeVektorAPICSV = (app: Express) => {

    app.post("/api/csv-upload", upload.single("file"), async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                return res.status(400).send("Keine Datei hochgeladen")
            }

            const results: any[] = [];

            // CSV-Datei einlesen
            fs.createReadStream(req.file.path)
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", async () => {
                console.log(`${results.length} Zeilen gefunden. Starte Verarbeitung...`)
            console.log("Erste Zeile Rohdaten:", results[0]);
        try {
        for (const row of results) {
        // 1. Die richtigen Keys aus deiner CSV nutzen:
        const title = row.Heading;  // Vorher row.Title
        const content = row.Article; // Vorher row.Content

        // 2. Validierung: Hat die Zeile wirklich Inhalt?
        if (!content || content.trim() === "") {
            console.log("Überspringe eine leere Zeile...");
            continue;
        }

        // 3. Text für Ollama vorbereiten
        const cleanContent = content.replace(/\s+/g, ' ').trim().substring(0, 2000);
        const textToEmbed = `Title: ${title}\nContent: ${cleanContent}`;

        // 4. Embedding generieren
        const response = await ollama.embeddings({
            model: 'mxbai-embed-large',
            prompt: textToEmbed,
        });

        // 5. In die Datenbank speichern
        await db.insert(knowledgeBase).values({
            content: textToEmbed,
            embedding: response.embedding,
        });

        console.log(`✅ Gespeichert: ${title.substring(0, 40)}...`);
                }

                fs.unlinkSync(req.file!.path);

                res.status(200).json({ message: "Erfolgt", processItem: results.length})
                }
                catch (dbError) { 
                    console.error('DB/Ollama Fehler:', dbError);
                    res.status(500).json({ error: 'Fehler bei der Embedding-Verarbeitung.' });
                }
            })
            } catch (error) {
            console.error('Allgemeiner Fehler:', error);
            res.status(500).send('Server-Fehler beim Upload.');
            }
            })
        }