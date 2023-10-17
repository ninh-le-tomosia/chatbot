export const ensureAuth = (req: any, res: any, next: any): void => {
  if (req.isUnauthenticated()) return res.redirect('/login');
  next();
};

export const ensureGuest = (req: any, res: any, next: any): void => {
  if (req.isAuthenticated()) return res.redirect('/');
  next();
};
