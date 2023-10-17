import express from 'express';
import { ensureAuth, ensureGuest } from '../middleware/authenticate';
const router = express.Router({ mergeParams: true });

router.use('/login', ensureGuest, (req, res) => {
  res.render('login', { layout: false });
});

router.use('/logout', ensureAuth, (req, res) => {
  if (req.session) req.session.destroy(() => {
    res.redirect('/login');
  });
});

export default router;
