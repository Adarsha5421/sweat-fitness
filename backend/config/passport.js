const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "  ",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            profilePic: profile.photos[0].value,
          });
          await user.save();
        }

        // Update profile picture if changed
        if (user.profilePic !== profile.photos[0].value) {
          user.profilePic = profile.photos[0].value;
          await user.save();
        }

        // Generate JWT token
        const token = jwt.sign(
          {
            id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
          },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        return done(null, { user, token });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((data, done) => {
  done(null, data);
});

passport.deserializeUser(async (data, done) => {
  try {
    const user = await User.findById(data.user._id);
    done(null, { user, token: data.token });
  } catch (error) {
    done(error, null);
  }
});
