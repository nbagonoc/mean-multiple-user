const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const isAdmin = require("../../guards/isAdmin");
const isModerator = require("../../guards/isModerator");

// bring in user model
require("../../models/User");
const User = mongoose.model("users");

// GET | api/users/profile
// view current user profile
router.get(
  "/profile",
  passport.authenticate("jwt", {session: false}),
  (req, res) => {
    User.findOne({_id: req.user.id})
      .then(user => {
        if (user) {
          res.json({success: true, user});
        } else {
          res.json({success: false, message: "User not found"});
        }
      })
      .catch(ex => {
        return res
          .status(500)
          .json({success: false, message: "something went wrong"});
      });
  }
);

// GET | api/users
// view users list
router.get(
  "/",
  [passport.authenticate("jwt", {session: false}), isAdmin],
  (req, res) => {
    User.find({role: "subscriber"})
      .then(users => {
        if (users) {
          res.json({success: true, users});
        } else {
          res.json({success: false, message: "Users not found"});
        }
      })
      .catch(ex => {
        return res
          .status(500)
          .json({success: false, message: "something went wrong"});
      });
  }
);

// GET | api/users/view/:id
// get user
router.get(
  "/view/:id",
  [passport.authenticate("jwt", {session: false}), isAdmin],
  (req, res) => {
    User.findOne({_id: req.params.id})
      .then(user => {
        if (user) {
          return res.json({success: true, user});
        }
        return res.json({success: false, message: "User not found"});
      })
      .catch(ex => {
        return res
          .status(500)
          .json({success: false, message: "something went wrong"});
      });
  }
);

// PUT | api/users/update
// update user
router.put(
  "/update/:id",
  [passport.authenticate("jwt", {session: false}), isAdmin],
  (req, res) => {
    if (!req.body.name) {
      res.json({success: false, message: "Name is required"});
    } else {
      User.findOne({_id: req.params.id})
        .then(user => {
          user.name = req.body.name;
          user
            .save()
            .then(userUpdated => {
              if (userUpdated) {
                res.json({success: true, message: "User updated!"});
              } else {
                res.json({
                  success: false,
                  message: "User not updated. Please try again"
                });
              }
            })
        })
        .catch(ex => {
          return res
            .status(500)
            .json({success: false, message: "User not found"});
        });
    }
  }
);

// DELETE | api/users/delete/:id
// delete user
router.delete(
  "/delete/:id",
  [passport.authenticate("jwt", {session: false}), isAdmin],
  (req, res) => {
    User.findOne({_id: req.params.id})
      .then(user => {
        user
          .remove()
          .then(userDeleted => {
            if (userDeleted) {
              res.json({success: true, message: "User has been removed"});
            } else {
              res.json({
                success: false,
                message: "User not removed. Please try again"
              });
            }
          })
      })
      .catch(ex => {
        return res
          .status(500)
          .json({success: false, message: "User not found"});
      });
  }
);

module.exports = router;
