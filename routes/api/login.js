const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("../../config/passport")(passport);
const tokenKey = require("../../config/keys").secretOrKey;
const User = require("../../models/User").User;
//login
router.post("/", async (req, res) => {
  try {
    const user = await User.find({
      email: req.body.email
    });
    User.findById(user, function(err, foundUser) {
      if (!err)
        if (!foundUser)
          res.status(404).json({
            error: "Invalid email address"
          });
        else if (bcrypt.compareSync(req.body.password, foundUser.password))
          res.json({
            data: {
              token: `Bearer ${jwt.sign({ _id: foundUser._id }, tokenKey, {
                expiresIn: "1h"
              })}`,
              user: foundUser
            }
          });
        else
          res.status(400).send({
            error: "Wrong password"
          });
      else
        res.json({
          error: err.message
        });
    });
  } catch (error) {
    res.json({
      error: error.message
    });
  }
});
module.exports = router;
