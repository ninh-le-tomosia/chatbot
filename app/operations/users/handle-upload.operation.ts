import fs                   from 'fs';
import TextParser           from '../../../lib/text-parser';
import { embeddings }       from '../../../lib/openai';
import { RedisVectorStore } from 'langchain/vectorstores/redis';
import redisClient from '../../../utils/redis.client';

class HandleUploadOperation {
  private _path: string;
  private _user: any;
  private _data: string;
  private _docs: any;

  constructor(file: any, user: any) {
    this._path = file.path;
    this._user = user;
  }

  async call() {
    await this.stepReadFile();
    await this.stepParserFromFile();
    await this.stepTrainingData();
  }

  private async stepReadFile() {
    if (!this._path) throw 'File not found';

    try {
      this._data = fs.readFileSync(this._path, { encoding: 'utf8', flag: 'r' });
    } catch (err) {
      console.error('Error reading file:', err);
    }
  }

  private async stepParserFromFile() {
    const textParser = new TextParser();
    this._docs = await textParser.generateFromText(this._data);
  }

  private async stepTrainingData(): Promise<void> {
    const docs = this._docs.map((doc: any) => {
      return {
        pageContent: doc.pageContent,
        metadata: Object.assign(doc?.metadata?.loc, { company: 'TOMOSIA' }),
      }
    });

    const vectorStore = await RedisVectorStore.fromDocuments(
      docs, embeddings, { redisClient, indexName: "companies:tomosia", }
    );

    console.log(vectorStore);
  }
}

export default HandleUploadOperation;

