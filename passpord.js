const passport = require('passport');


const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.Client_ID,
    clientSecret: process.env.Client_secret,
    callbackURL: "https://fair-blue-sheep-wear.cyclic.app/auth/google/callback",
    passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));
