require('dotenv').config();
import { OpenAI } from "langchain/llms/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  batchSize: 512
});

export const openai = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });
