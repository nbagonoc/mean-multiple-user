const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../config/dbSecretKeys");
const passport = require("passport");

// bring in user model
require("../models/User");
const User = mongoose.model("users");

// POST | register process
router.post("/register", (req, res, next) => {
  if (!req.body.name) {
    res.json({ success: false, msg: "name is required" });
  }
  if (!req.body.email) {
    res.json({ success: false, msg: "email is required" });
  }
  if (!req.body.password) {
    res.json({ success: false, msg: "password is required" });
  }
  if (req.body.password != req.body.password2) {
    res.json({ success: false, msg: "password does not match" });
  } else {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.json({ success: false, msg: "Email already exist" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              res.json({ success: false, msg: "Failed to register user" });
            } else {
              newUser.password = hash;
              newUser.save().then(user => {
                res.json({ success: true, msg: "User registered" });
              });
            }
          });
        });
      }
    });
  }
});

// POST | Login process
router.post("/authenticate", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!req.body.email) {
    return res.json({ success: false, msg: "Email is required" });
  }
  if (!req.body.password) {
    return res.json({ success: false, msg: "Password is required" });
  } else {
    User.findOne({ email }).then(user => {
      // check for user
      if (!user) {
        return res.json({ success: false, msg: "User not found" });
      } else {
        // check password
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            // user matched
            const payload = {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role
            }; // create JWT payload
            // sign token
            jwt.sign(
              payload,
              key.secretOrKey,
              { expiresIn: 86400 },
              (err, token) => {
                res.json({
                  success: true,
                  token: "JWT " + token
                });
              }
            );
          } else {
            return res.json({ success: false, msg: "Password incorrect" });
          }
        });
      }
    });
  }
});

// GET | view users
router.get(
  "/viewUsers",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({ role: "subscriber" }, (err, users) => {
      if (err) {
        res.json({ success: false, message: "Users not found" });
      } else {
        res.json({ success: true, users });
      }
    });
  }
);

// GET | view user
router.get(
  "/viewUser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user.id }, (err, user) => {
      if (err) {
        res.json({ success: false, message: "User not found" });
      } else {
        res.json({ success: true, user });
      }
    });
  }
);

// PUT | update user
router.put(
  "/updateUser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.name) {
      res.json({ success: false, msg: "name is required" });
    } else {
      User.findOne({ _id: req.user.id }, (err, user) => {
        user.name = req.body.name;
        user.save(err => {
          if (err) {
            res.json({ success: false, message: err });
          } else {
            res.json({ success: true, message: "user updated!" });
          }
        });
      });
    }
  }
);

// test if the backend is secured
router.get(
  "/test",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "you are authorized" });
  }
);

module.exports = router;
