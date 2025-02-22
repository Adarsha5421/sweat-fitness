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
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          });
          await user.save();
        }

        // ✅ Fix: Ensure `id` is stored in the JWT
        const token = jwt.sign(
          {
            id: user._id.toString(), // ✅ Ensure `id` is stored
            name: user.name,
            email: user.email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "7d" } // Use a valid expiration time
        );

        return done(null, { user, token });
      } catch (error) {
        console.error("Google OAuth Error:", error); // ✅ Log errors
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((data, done) => {
  done(null, { user: data.user, token: data.token }); // ✅ Ensure token is included
});

passport.deserializeUser(async (data, done) => {
  try {
    const user = await User.findById(data.user._id);
    done(null, { user, token: data.token });
  } catch (error) {
    done(error, null);
  }
});
