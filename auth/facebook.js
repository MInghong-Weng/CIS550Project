const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');

passport.use(new FacebookStrategy({
  clientID: "132409940757832",
  clientSecret: "f5b32cc6e9b085b7d426955d3e99e48a",
  callbackURL: "http://ec2-34-239-126-102.compute-1.amazonaws.com:3000/auth/facebook/callback"
},

function(accessToken, refreshToken, profile, done) {
  console.log("The facebook profile:", profile);
  User.findOrCreate({name: profile.displayName}, {name: profile.displayName,userid: profile.id}, function(err, user) {
    if (err) { return done(err); }
    done(null, user);
  });
}
));

module.exports = passport;