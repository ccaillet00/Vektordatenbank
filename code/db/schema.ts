import { pgTable, serial, text, vector, index } from 'drizzle-orm/pg-core';

export const knowledgeBase = pgTable('knowledge_base', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(), // Der Text deines Handbuchs
  embedding: vector('embedding', { dimensions: 1024 }), // Dein Vektor
}, (table) => ({
  // Ein Index beschleunigt die Suche bei vielen Daten (HNSW ist top!)
  embeddingIndex: index('embedding_idx').using(
    'hnsw', 
    table.embedding.op('vector_cosine_ops')
  ),
}));