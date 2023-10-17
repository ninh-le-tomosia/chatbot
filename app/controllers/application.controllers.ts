class ApplicationController {
  constructor() { }

  home(req: any, res: any) {
    res.render('home');
  }
}

export default new ApplicationController();
