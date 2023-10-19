import { CharacterTextSplitter } from "langchain/text_splitter";
import { TextLoader } from "langchain/document_loaders/fs/text";

class TextParser {
  async generateFromText(text: string) {
    const splitter = new CharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    return await splitter.createDocuments([text]);
  }

  async generateFromPath(path: string) {
    const loader = new TextLoader(path);
    return await loader.load();
  }
}

export default TextParser;
