import express from 'express';
import { ensureAuth, ensureGuest } from '../app/middleware/authenticate';
import googleOauthRoutes from '../app/routes/google_login.routes';
import usersRoutes from '../app/routes/users.routes';
import sessionRoutes from '../app/routes/session.routes';
const router = express.Router({ mergeParams: true });

// routes
router.get('/profile', ensureAuth, (req, res) => {
  res.render('profile', { user: req.user });
});

router.use('/auth', ensureGuest, googleOauthRoutes);
router.use('/users', usersRoutes);
router.use('/', sessionRoutes);

// simple route
router.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

export default router;
