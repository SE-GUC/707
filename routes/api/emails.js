const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User").User;
//Send&Receive emails
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      User.findByIdAndUpdate(
        req.id,
        {
          $push: {
            "inbox.sentEmails": {
              subject: req.body.subject,
              content: req.body.content,
              emailType:req.body.emailType,
              receiverEmail: req.body.receiverEmail
            }
          }
        },
        {
          new: true
        },
        function(err, senderUser) {
          if (!err)
            User.update(
              {
                email: req.body.receiverEmail
              },
              {
                $push: {
                  "inbox.receivedEmails": {
                    subject: req.body.subject,
                    content: req.body.content,
                    emailType:req.body.emailType,
                    senderEmail: senderUser.email
                  }
                }
              },
              {
                new: true
              },
              function(err) {
                if (!err)
                  res.json({
                    msg: "You email is sent successfully",
                    data: req.body
                  });
                else
                  res.json({
                    error: err.message
                  });
              }
            );
          else
            res.json({
              error: err.message
            });
        }
      );
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//View all sent emails
router.get(
  "/sent",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      User.findById(req.id, function(err, foundUser) {
        if (!err)
          res.json({
            msg: "Your sent emails",
            data: foundUser.inbox.sentEmails
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
  }
);
//View all received emails
router.get(
  "/received",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      User.findById(req.id, function(err, foundUser) {
        if (!err)
          res.json({
            msg: "Your received emails",
            data: foundUser.inbox.receivedEmails
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
  }
);
//Delete an email
router.delete(
  "/:emailID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      User.findByIdAndUpdate(
        req.id,
        {
          $pull: {
            "inbox.sentEmails": {
              _id: req.params.emailID
            },
            "inbox.receivedEmails": {
              _id: req.params.emailID
            }
          }
        },
        { new: true },
        function(err, foundUser) {
          if (!err)
            res.json({
              msg: "Your email has been deleted successfully",
              data: foundUser.inbox
            });
          else
            res.json({
              error: err.message
            });
        }
      );
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
module.exports = router;
