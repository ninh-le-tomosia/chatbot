import HandleUploadOperation from '../operations/users/handle-upload.operation';
import ChatOperation         from '../operations/users/chat.operation';

class UsersController {
  chat(req: any, res: any): void {
    const { field_chat: question } = req.body || req.params || req.query || {};
    const operator = new ChatOperation(question);
    operator.call();

    res.redirect('/');
  }

  upload(req: any, res: any): void {
    const operator = new HandleUploadOperation(req.file, req.user);
    operator.call();

    res.redirect('/');
  }
}

export default new UsersController();
