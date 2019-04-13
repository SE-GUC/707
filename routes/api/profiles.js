const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
var fs = require("fs");
const User = require("../../models/User").User;
const Candidate = require("../../models/User").Candidate;
const Consultancy = require("../../models/User").Consultancy;
const Partner = require("../../models/User").Partner;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~AllTypes~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//View my profile by my id
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      User.findById(req.id, function(err, foundUser) {
        if (!err)
          if (!foundUser)
            res.status(404).send({
              error: "This profile does not exist"
            });
          else
            res.json({
              msg: "Your profile information",
              data: foundUser
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
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Admin~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Register an admin (will be used once a time)
router.post("/admin/register", async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    User.create(req.body, function(err, newUser) {
      if (!err)
        res.json({
          msg: "Your profile has been created successfully",
          data: newUser
        });
      else if (err.message.split(" ", 1)[0] === "E11000")
        res.json({
          error: "This emaill already exists"
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
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Candidate~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Register a candidate
router.post("/candidate/register", async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    Candidate.create(req.body, function(err, newUser) {
      if (!err)
        res.json({
          msg: "Your profile has been created successfully",
          data: newUser
        });
      else if (err.message.split(" ", 1)[0] === "E11000")
        res.json({
          error: "This emaill already exists"
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
//Update my profile by my id
router.put(
  "/candidate",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (req.body.password != null) {
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
      }
      Candidate.findByIdAndUpdate(
        req.id,
        req.body,
        {
          new: true
        },
        function(err, foundUser) {
          if (!err)
            if (!foundUser)
              res.status(404).send({
                error: "This profile does not exist"
              });
            else
              res.json({
                msg: "Your profile has been updated successfully",
                data: foundUser
              });
          else if (err.message.split(" ", 1)[0] === "E11000")
            res.json({
              error: "This emaill already exists"
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
//Delete my profile by my id
router.delete(
  "/candidate",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Candidate.findByIdAndDelete(req.id, function(err, foundUser) {
        if (!err)
          if (!foundUser)
            res.status(404).send({
              error: "This profile does not exist"
            });
          else
            res.json({
              msg: "Your profile has been deleted successfully",
              data: foundUser
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
//Set/Update my profile picture
router.post(
  "/profilePicture/candidate",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Candidate.findByIdAndUpdate(
        req.id,
        {
          profilePhoto: {
            data: fs.readFileSync(req.body.imagePath),
            contentType: "image/jpg"
          }
        },
        {
          new: true
        },
        function(err, foundUser) {
          if (!err)
            res.json({
              msg: "Your profile has been set successfully",
              data: foundUser.profilePhoto
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
//Delete my profile picture
router.delete(
  "/profilePicture/candidate",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Candidate.findByIdAndUpdate(
        req.id,
        {
          profilePhoto: null
        },
        {
          new: true
        },
        function(err, foundUser) {
          if (!err)
            res.json({
              msg: "Your profile has been set successfully",
              data: foundUser.profilePhoto
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
//View my profile picture
router.get(
  "/profilePicture/candidate",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Candidate.findById(req.id, function(err, foundUser) {
        if (!err) {
          res.contentType(foundUser.profilePhoto.contentType);
          res.send(foundUser.profilePhoto.data);
        } else
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
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Consultancy~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Register a consultancy
router.post("/consultancy/register", async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    Consultancy.create(req.body, function(err, newUser) {
      if (!err)
        res.json({
          msg: "Your profile has been created successfully",
          data: newUser
        });
      else if (err.message.split(" ", 1)[0] === "E11000")
        res.json({
          error: "This emaill already exists"
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
//Update my profile by my id
router.put(
  "/consultancy",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (req.body.password != null) {
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
      }
      Consultancy.findByIdAndUpdate(
        req.id,
        req.body,
        {
          new: true
        },
        function(err, foundUser) {
          if (!err)
            if (!foundUser)
              res.status(404).send({
                error: "This profile does not exist"
              });
            else
              res.json({
                msg: "Your profile has been updated successfully",
                data: foundUser
              });
          else if (err.message.split(" ", 1)[0] === "E11000")
            res.json({
              error: "This emaill already exists"
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
//Delete my profile by my id
router.delete(
  "/consultancy",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Consultancy.findByIdAndDelete(req.id, function(err, foundUser) {
        if (!err)
          if (!foundUser)
            res.status(404).send({
              error: "This profile does not exist"
            });
          else
            res.json({
              msg: "Your profile has been deleted successfully",
              data: foundUser
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
//Set/Update my profile picture
router.post(
  "/profilePicture/consultancy",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Consultancy.findByIdAndUpdate(
        req.id,
        {
          profilePhoto: {
            data: fs.readFileSync(req.body.imagePath),
            contentType: "image/jpg"
          }
        },
        {
          new: true
        },
        function(err, foundUser) {
          if (!err)
            res.json({
              msg: "Your profile has been set successfully",
              data: foundUser.profilePhoto
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
//Delete my profile picture
router.delete(
  "/profilePicture/consultancy",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Consultancy.findByIdAndUpdate(
        req.id,
        {
          profilePhoto: null
        },
        {
          new: true
        },
        function(err, foundUser) {
          if (!err)
            res.json({
              msg: "Your profile has been set successfully",
              data: foundUser.profilePhoto
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
//View my profile picture
router.get(
  "/profilePicture/consultancy",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Consultancy.findById(req.id, function(err, foundUser) {
        if (!err) {
          res.contentType(foundUser.profilePhoto.contentType);
          res.send(foundUser.profilePhoto.data);
        } else
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
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Partner~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Register a partner
router.post("/partner/register", async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    Partner.create(req.body, function(err, newUser) {
      if (!err)
        res.json({
          msg: "Your profile has been created successfully",
          data: newUser
        });
      else if (err.message.split(" ", 1)[0] === "E11000")
        res.json({
          error: "This emaill already exists"
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
//Update my profile by my id
router.put(
  "/partner",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (req.body.password != null) {
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
      }
      Partner.findByIdAndUpdate(
        req.id,
        req.body,
        {
          new: true
        },
        function(err, foundUser) {
          if (!err)
            if (!foundUser)
              res.status(404).send({
                error: "This profile does not exist"
              });
            else
              res.json({
                msg: "Your profile has been updated successfully",
                data: foundUser
              });
          else if (err.message.split(" ", 1)[0] === "E11000")
            res.json({
              error: "This emaill already exists"
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
//Delete my profile by my id
router.delete(
  "/partner",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Partner.findByIdAndDelete(req.id, function(err, foundUser) {
        if (!err)
          if (!foundUser)
            res.status(404).send({
              error: "This profile does not exist"
            });
          else
            res.json({
              msg: "Your profile has been deleted successfully",
              data: foundUser
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
//Set/Update my profile picture
router.post(
  "/profilePicture/partner",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Partner.findByIdAndUpdate(
        req.id,
        {
          profilePhoto: {
            data: fs.readFileSync(req.body.imagePath),
            contentType: "image/jpg"
          }
        },
        {
          new: true
        },
        function(err, foundUser) {
          if (!err)
            res.json({
              msg: "Your profile has been set successfully",
              data: foundUser.profilePhoto
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
//Delete my profile picture
router.delete(
  "/profilePicture/partner",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Partner.findByIdAndUpdate(
        req.id,
        {
          profilePhoto: null
        },
        {
          new: true
        },
        function(err, foundUser) {
          if (!err)
            res.json({
              msg: "Your profile has been set successfully",
              data: foundUser.profilePhoto
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
//View my profile picture
router.get(
  "/profilePicture/partner",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Partner.findById(req.id, function(err, foundUser) {
        if (!err) {
          res.contentType(foundUser.profilePhoto.contentType);
          res.send(foundUser.profilePhoto.data);
        } else
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
module.exports = router;
