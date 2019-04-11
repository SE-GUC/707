const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require('../../config/passport')(passport);
const tokenKey = require("../../config/keys").secretOrKey;
const User = require("../../models/User").User;
const LoggedOutUser = require("../../models/LoggedOutUser");
//login
router.post('/', async (req, res) => {
    try {
        const user = await User.find({
            email: req.body.email
        });
        User.findById(user, function (err, foundUser) {
            if (!err)
                if (!foundUser)
                    res.status(404).json({
                        error: "Invalid email address"
                    });
                else {
                    if (bcrypt.compareSync(req.body.password, foundUser.password))
                        LoggedOutUser.findByIdAndDelete(foundUser._id, function (err) {
                            if (!err)
                                res.json({
                                    data: `Bearer ${jwt.sign({ _id: foundUser._id, email: foundUser.email }, tokenKey, { expiresIn: '1h' })}`
                                });
                            else res.json({
                                error: err.message
                            });
                        });
                    else
                        res.status(400).send({
                            error: "Wrong password"
                        });
                }
            else res.json({
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