const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      // Esta função é chamada quando o Google retorna os dados do usuário
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          // Usuário já existe
          return done(null, user);
        } else {
          // Cria um novo usuário no nosso banco de dados
          const newUser = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });
          await newUser.save();
          return done(null, newUser);
        }
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
