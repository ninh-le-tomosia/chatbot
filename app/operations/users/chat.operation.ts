import { embeddings }       from '../../../lib/openai';
import { RedisVectorStore } from 'langchain/vectorstores/redis';
import redisClient from '../../../utils/redis.client';

class ChatOperation {
  question: string;
  answer: string;
  private messages: object[];

  constructor(question: string) {
    this.question = question;
  }

  call() {
    this.stepSearch();
    // this.stepBuildChatSystem();
    // this.stepBuildUserQuestion();
  }

  private async stepSearch() {
    const vectorStore = new RedisVectorStore(embeddings, { redisClient, indexName: 'companies:tomosia' });
    const results = await vectorStore.similaritySearch(this.question, 3);
    console.log(results);
  }


  private async stepBuildUserQuestion() { }

  private stepBuildChatSystem() {
    this.messages = [
      {
        role: 'system',
        content: 'Bạn là trợ lý của công ty. Bạn hãy trả lời các câu hỏi của `user` liên quan đến công ty của bạn. Các câu hỏi không liên quan đến thông tin về công ty của bạn, thì bạn hãy trả lời `Câu hỏi này không nằm trong phạm vi hiểu biết của tôi`.'
      }
    ]
  }
}

export default ChatOperation;
