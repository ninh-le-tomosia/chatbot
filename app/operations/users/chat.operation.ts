require('dotenv').config();
import { embeddings } from '../../../lib/openai';
import { RedisVectorStore } from 'langchain/vectorstores/redis';
import redisClient from '../../../utils/redis.client';
import { OpenAI } from 'openai';


class ChatOperation {
  question: string;
  answer: string;
  private openai: OpenAI;
  private messages: any[];

  constructor(question: string) {
    this.question = question;
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async call() {
    this.stepBuildChatSystem();
    await this.stepBuildUserQuestion();
    await this.stepChat();
  }

  private async stepBuildUserQuestion() {
    const vectorStore = new RedisVectorStore(embeddings, { redisClient, indexName: 'companies:tomosia' });
    const results = await vectorStore.similaritySearch(this.question, 1);

    console.log('Results: ', results);

    const prompt: string = this.createPromptQuestion(results);

    console.log('Prompt: ', prompt)

    this.messages.push({
      role: 'system',
      content: prompt
    });

    this.messages.push({
      role: 'user',
      content: this.question
    });

    console.log(this.messages);
  }

  private async stepChat() {
    console.log('Messages: ', this.messages);

    const stream = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo-16k-0613',
      messages: this.messages,
      temperature: 0.5,
      stream: true,
    });

    let result: string = ""
    for await (const part of stream) {
      result += (part.choices[0]?.delta?.content || '');
    }

    console.log(result);
  }

  private createPromptQuestion(docs: any[]): string {
    const info: string = docs.map((doc: any) => { return doc?.pageContent }).join("\n");

    let prompt: string = `--- Thông tin ---\n${info}\n---`;
    return prompt;
  }

  private async stepBuildAssistant() {
    this.messages.push({
      role: 'assistant',
      content: this.answer
    });
  }

  private stepBuildChatSystem() {
    this.messages = [
      {
        role: 'system',
        content: `Bạn là trợ lý của công ty TOMOSIA.
                  Bạn hãy trả lời các câu hỏi về thông tin của công ty mà người dùng yêu câu.
                  Các câu hỏi không nằm trong phần thông tin, thì bạn hãy trả lời 'Dữ liệu không được tìm thấy.'`
      }
    ]
  }
}

export default ChatOperation;
