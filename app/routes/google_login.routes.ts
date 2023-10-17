import express from 'express';
import passport from 'passport';
const router = express.Router({ mergeParams: true });

// Google authentication route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback route
router.get('/google/callback', passport.authenticate('google', { failureRedirect: 'users/login' }), (req, res) => {
  res.redirect('/profile');
});

export default router;
