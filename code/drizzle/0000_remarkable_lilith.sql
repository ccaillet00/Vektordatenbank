CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE "knowledge_base" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"embedding" vector(1024)
);
--> statement-breakpoint
CREATE INDEX "embedding_idx" ON "knowledge_base" USING hnsw ("embedding" vector_cosine_ops);