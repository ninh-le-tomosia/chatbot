import fs         from 'fs';
import TextParser from '../../../lib/text-parser';

class HandleUploadOperation {
  private _path: string;
  private _user: any;
  private _data: string;
  private _contents: any;

  constructor(file: any, user: any) {
    this._path = file.path;
    this._user = user;
  }

  call() {
    this.stepReadFile();
    this.stepParserFromFile();
    this.stepTrainingData();
  }

  private async stepReadFile() {
    if (!this._path) throw 'File not found';

    try {
      this._data = fs.readFileSync(this._path, { encoding: 'utf8', flag: 'r' });
    } catch (err) {
      console.error('Error reading file:', err);
    }
  }

  private stepParserFromFile() {
    const doc = new TextParser(this._data);
    this._contents = doc.splitter();
  }

  private stepTrainingData() {
    debugger
    for (let content of this._contents) {
      console.log(content);
    }
  }
}

export default HandleUploadOperation;

