require('dotenv').config();
import passport from 'passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import User from '../app/models/user.model';

passport.serializeUser((user: any, done) => done(null, user.id));

passport.deserializeUser(async (id: string, done) => {
  await User.findById(id).exec()
    .then(user => { 
      if (!user) return done(null, false);
      return done(null, user);
    })
    .catch(err => done(err));
});

passport.use(
  new Strategy(
    {
      clientID: process.env.GG_CLIENT_ID,
      clientSecret: process.env.GG_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done) => {
      try {
        //find the user in our database
        let user = await User.findOne({ googleId: profile.id });
        const userData = {
          email: profile.emails[0].value,
          name: profile.displayName,
          photo: profile.photos[0].value,
        };

        if (user) {
          //If user present in our database.
          user.updateOne(userData);
          done(null, user);
        } else {
          // if user is not preset in our database save user data to database.
          user = await User.create(Object.assign({ googleId: profile.id }, userData));
          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

export default passport;
