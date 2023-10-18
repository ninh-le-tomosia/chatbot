import { CharacterTextSplitter } from "langchain/text_splitter";
import { TextLoader } from "langchain/document_loaders/fs/text";

class TextParser {
  async generateFromText(text: string) {
    const splitter = new CharacterTextSplitter({
      separator: "\n",
      chunkSize: 7,
      chunkOverlap: 3,
    });

    return await splitter.createDocuments([text]);
  }

  async generateFromPath(path: string) {
    const loader = new TextLoader(path);
    return await loader.load();
  }
}

export default TextParser;
