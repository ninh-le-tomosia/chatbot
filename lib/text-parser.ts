import { CharacterTextSplitter } from "langchain/text_splitter";

class TextParser {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  async splitter() {
    const splitter = new CharacterTextSplitter({
      separator: "\n",
      chunkSize: 7,
      chunkOverlap: 3,
    });

    return await splitter.createDocuments([this.text]);
  }
}

export default TextParser;
