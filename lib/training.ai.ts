import natural, { AggressiveTokenizerVi } from 'natural';
import { NeuralNetwork } from 'brain.js';
import fs from 'fs';
import path from 'path';

class TrainingAI {
  pathFile: string;
  rawData: string;
  tokens: string[];
  tokenFilters: string[];
  dictionary: object;
  vocabulary: string[];
  dataTraining: object[];
  modelData: any;

  static stopwords_vietnamese: string[] = [
    "là", "có", "của", "đã", "và", "một", "trong", "được", "các", "cho",
    "khi", "với", "từng", "ngày", "đến", "như", "để", "kể", "bạn",
    "tôi", "bị", "đang", "đây", "đều", "này", "nhiều", "điều", "đánh",
    "rằng", "nó", "biết", "ai", "lúc", "nào", "cũng", "đi", "nhất",
    "ở", "qua", "nếu", "mình", "làm", "người", "về", "lại", "cách",
    "nên", "mỗi", "nếu", "sẽ", "những", "hoặc", "trên", "để", "còn",
    "cũng", "nhiều", "hơn", "nếu", "càng", "phải", "khi", "sự", "tại",
    "theo", "từng", "đến", "từ", "trước", "sau", "trong", "lên", "xuống",
    "thì", "là", "làm", "đang", "vào", "ra", "đến", "một", "của", "đã",
    "với", "như", "đấy", "đang", "là", "đây", "này", "đó", "có", "các",
    "để", "và", "nếu", "bạn", "tôi", "cũng", "là", "nếu", "là", "nếu"
  ];

  constructor(pathFile?: string) {
    this.pathFile  = pathFile;
  }

  load(pathFile?: string) {
    pathFile ||= this.pathFile;
    this.rawData = fs.readFileSync(pathFile, 'utf8');
  }

  async tokenizer(rawData?: string) {
    rawData ||= this.rawData;
    const tokenizer_vi = new AggressiveTokenizerVi();
    this.tokens = tokenizer_vi.tokenize(rawData);
  }

  filteredTokens(tokens?: string[]) {
    tokens ||= this.tokens;

    const stopwords = TrainingAI.stopwords_vietnamese.concat(natural.stopwords);
    this.tokenFilters = tokens.filter(token => !stopwords.includes(token.toLowerCase()));
  }

  dictionaryTokens(tokens?: string[]) {
    const dictionary: object = {};
    tokens ||= this.tokenFilters;

    for (let token of tokens) {
      if (!dictionary[token]) dictionary[token] = true;
    }

    this.dictionary = dictionary;
    this.vocabulary = Object.keys(dictionary);
  }

  trainingData(tokens?: string[], vocabulary?: string[]) {
    tokens ||= this.tokenFilters;
    vocabulary ||= this.vocabulary;

    const dataTraining = tokens.map(token => {
      return {
        input: vocabulary.indexOf(token) / vocabulary.length,
        output: token
      };
    });

    fs.writeFileSync(path.join(__dirname, '../training/preprocessed_data.json'), JSON.stringify(dataTraining));

    this.dataTraining = dataTraining;
  }

  modelTrain(dataTraining?: any[]) {
    dataTraining ||= this.dataTraining;
    const net = new NeuralNetwork();
    net.train(dataTraining);

    const modelData = net.toJSON();
    fs.writeFileSync(path.join(__dirname, '../training/trained_model.json'), JSON.stringify(modelData));

    this.modelData = modelData;
  }

  async training(pathFile?: string) {
    this.load(pathFile);
    this.tokenizer();
    this.filteredTokens();
    this.dictionaryTokens();
    this.trainingData();
    this.modelTrain();
  }
}

export default TrainingAI;
