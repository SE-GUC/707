const express = require("express");
const router = express.Router();
const LoggedOutUser = require("../../models/LoggedOutUser");
const passport = require('passport');
require('../../config/passport')(passport);
//logout
router.get("/", passport.authenticate('jwt', {
  session: false
}), async (req, res) => {
  reqId = {
    id: req.id
  }
  LoggedOutUser.create(reqId, function (err, newLoggedOutUser) {
    if (!err) {
      res.json({
        msg: "You logged out successfully",
        data: newLoggedOutUser
      });
    } else res.json({
      msg: err.message
    });
  });
});
module.exports = router