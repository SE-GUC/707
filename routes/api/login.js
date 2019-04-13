const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("../../config/passport")(passport);
const tokenKey = require("../../config/keys").secretOrKey;
const User = require("../../models/User").User;
//login
router.post("/", (req, res) => {
  const { email, password } = req.body;
  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  // Check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User Does not exist" });
    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
      jwt.sign(
        { _id: user._id, email: user.email },
        tokenKey,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user._id,
              email: user.email
            }
          });
        }
      );
    });
  });
});
module.exports = router;
