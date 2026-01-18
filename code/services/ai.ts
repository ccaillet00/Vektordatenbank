import 'dotenv/config'
import { Ollama } from 'ollama'

export const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "mxbai-embed-large"

export let ollama: Ollama

export const initializeOllama = async () => {
  if (ollama) return
  console.log('Initializing Ollama...')
  const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434'
  console.log('Initializing Ollama with model:', OLLAMA_MODEL)
  console.log('Using Ollama host:', OLLAMA_HOST)
  ollama = new Ollama({
    host: OLLAMA_HOST,
  })

  console.log('Pulling model from server... This can take a few minutes')
  await ollama.pull({ model: OLLAMA_MODEL })
}
