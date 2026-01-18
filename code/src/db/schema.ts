import { pgTable, serial, text, vector, index } from 'drizzle-orm/pg-core';

export const knowledgeBase = pgTable('knowledge_base', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  embedding: vector('embedding', { dimensions: 1024 }), // Dein Vektor
}, (table) => ({
  embeddingIndex: index('embedding_idx').using(
    'hnsw', 
    table.embedding.op('vector_cosine_ops')
  ),
}));