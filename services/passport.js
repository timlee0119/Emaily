const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/key');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id); // not Google profile id, but _id in MongoDB
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      // in Heroku, we make request to proxy server, which transform our https request to http and cause the mismatch
      // between callbackURL and the https URL registered in Google Console.
      // So we need to tell the server to ignore the proxy's protocal and use sender's protocal instead.
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
