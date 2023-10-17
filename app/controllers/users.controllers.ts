import HandleUploadOperation from '../operations/users/handle-upload.operation'

class UsersController {
  chat(req: any, res: any): void {
    res.redirect('/');
  }

  upload(req: any, res: any): void {
    const operator = new HandleUploadOperation(req.file, req.user);
    operator.call();

    res.redirect('/');
  }
}

export default new UsersController();
