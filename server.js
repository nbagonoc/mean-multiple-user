const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const cors = require("cors");

// INITIALIZE APP
const app = express();

// MODELS
require("./models/User");

// MIDDLEWARES
// cors
app.use(cors());
// body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// CONFIGS
// mongoDB;
const db = require("./config/dbSecretKeys").mongoURI;
// Passport config
require("./config/passport")(passport);

// CONNECT TO DB
mongoose
  .connect(db,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {console.log("we are connected to the DB");})
  .catch(err => console.log(err));

// ROUTES
const auth = require("./routes/api/auth");
const users = require("./routes/api/users");

// USE ROUTES
app.use("/api/auth", auth);
app.use("/api/users", users);

// STATIC FOLDER
app.use(express.static(path.join(__dirname, "public")));

// USE ANGULAR AS FRONTEND
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// SET PORT
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`we are live at ${port}`);
});
