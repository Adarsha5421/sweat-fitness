require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const connectDB = require("./config/db");
require("./config/passport");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes")); // ✅ User Management Routes
app.use("/api/workouts", require("./routes/workoutRoutes"));
app.use("/api/calculators", require("./routes/calculatorRoutes"));

app.get("/", (req, res) => {
  res.send("Fitness API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
