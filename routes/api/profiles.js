const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
var fs = require("fs");
const Admin = require("../../models/User").User;
const Candidate = require("../../models/User").Candidate;
const Consultancy = require("../../models/User").Consultancy;
const Partner = require("../../models/User").Partner;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Admin~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Register an admin
router.post("/admin/register", async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        Admin.create(req.body, function (err, newUser) {
            if (!err)
                res.json({
                    msg: "Your profile has been created successfully",
                    data: newUser
                });
            else
            if ((err.message.split(" ", 1))[0] === "E11000")
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
//View my profile by my id
router.get("/admin/:id", async (req, res) => {
    try {
        Admin.findById(req.params.id, function (err, foundUser) {
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
//Update my profile by my id
router.put("/admin/:id", async (req, res) => {
    try {
        if (req.body.password != null) {
            const salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body.password, salt);
        }
        Admin.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }, function (err, foundUser) {
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
            else
            if ((err.message.split(" ", 1))[0] === "E11000")
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
//Delete my profile by my id
router.delete("/admin/:id", async (req, res) => {
    try {
        Admin.findByIdAndDelete(req.params.id, function (err, foundUser) {
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
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Candidate~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Register a candidate
router.post("/candidate/register", async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        Candidate.create(req.body, function (err, newUser) {
            if (!err)
                res.json({
                    msg: "Your profile has been created successfully",
                    data: newUser
                });
            else
            if ((err.message.split(" ", 1))[0] === "E11000")
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
//View my profile by my id
router.get("/candidate/:id", async (req, res) => {
    try {
        Candidate.findById(req.params.id, function (err, foundUser) {
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
//Update my profile by my id
router.put("/candidate/:id", async (req, res) => {
    try {
        if (req.body.password != null) {
            const salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body.password, salt);
        }
        Candidate.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }, function (err, foundUser) {
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
            else
            if ((err.message.split(" ", 1))[0] === "E11000")
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
//Delete my profile by my id
router.delete("/candidate/:id", async (req, res) => {
    try {
        Candidate.findByIdAndDelete(req.params.id, function (err, foundUser) {
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
});
//Set/Update my profile picture
router.post("/profilePicture/candidate/:id", async (req, res) => {
    try {
        Candidate.findByIdAndUpdate(req.params.id, {
            profilePhoto: {
                data: fs.readFileSync(req.body.imagePath),
                contentType: "image/jpg"
            }
        }, {
            new: true
        }, function (err, foundUser) {
            if (!err)
                res.json({
                    msg: "Your profile has been set successfully",
                    data: foundUser.profilePhoto
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
//Delete my profile picture
router.delete("/profilePicture/candidate/:id", async (req, res) => {
    try {
        Candidate.findByIdAndUpdate(req.params.id, {
            profilePhoto: null
        }, {
            new: true
        }, function (err, foundUser) {
            if (!err)
                res.json({
                    msg: "Your profile has been set successfully",
                    data: foundUser.profilePhoto
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
//View my profile picture
router.get("/profilePicture/candidate/:id", async (req, res) => {
    try {
        Candidate.findById(req.params.id, function (err, foundUser) {
            if (!err) {
                res.contentType(foundUser.profilePhoto.contentType);
                res.send(foundUser.profilePhoto.data);
            } else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Consultancy~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Register a consultancy
router.post("/consultancy/register", async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        Consultancy.create(req.body, function (err, newUser) {
            if (!err)
                res.json({
                    msg: "Your profile has been created successfully",
                    data: newUser
                });
            else
            if ((err.message.split(" ", 1))[0] === "E11000")
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
//View my profile by my id
router.get("/consultancy/:id", async (req, res) => {
    try {
        Consultancy.findById(req.params.id, function (err, foundUser) {
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
//Update my profile by my id
router.put("/consultancy/:id", async (req, res) => {
    try {
        if (req.body.password != null) {
            const salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body.password, salt);
        }
        Consultancy.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }, function (err, foundUser) {
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
            else
            if ((err.message.split(" ", 1))[0] === "E11000")
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
//Delete my profile by my id
router.delete("/consultancy/:id", async (req, res) => {
    try {
        Consultancy.findByIdAndDelete(req.params.id, function (err, foundUser) {
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
});
//Set/Update my profile picture
router.post("/profilePicture/consultancy/:id", async (req, res) => {
    try {
        Consultancy.findByIdAndUpdate(req.params.id, {
            profilePhoto: {
                data: fs.readFileSync(req.body.imagePath),
                contentType: "image/jpg"
            }
        }, {
            new: true
        }, function (err, foundUser) {
            if (!err)
                res.json({
                    msg: "Your profile has been set successfully",
                    data: foundUser.profilePhoto
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
//Delete my profile picture
router.delete("/profilePicture/consultancy/:id", async (req, res) => {
    try {
        Consultancy.findByIdAndUpdate(req.params.id, {
            profilePhoto: null
        }, {
            new: true
        }, function (err, foundUser) {
            if (!err)
                res.json({
                    msg: "Your profile has been set successfully",
                    data: foundUser.profilePhoto
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
//View my profile picture
router.get("/profilePicture/consultancy/:id", async (req, res) => {
    try {
        Consultancy.findById(req.params.id, function (err, foundUser) {
            if (!err) {
                res.contentType(foundUser.profilePhoto.contentType);
                res.send(foundUser.profilePhoto.data);
            } else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Partner~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Register a partner
router.post("/partner/register", async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        Partner.create(req.body, function (err, newUser) {
            if (!err)
                res.json({
                    msg: "Your profile has been created successfully",
                    data: newUser
                });
            else
            if ((err.message.split(" ", 1))[0] === "E11000")
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
//View my profile by my id
router.get("/partner/:id", async (req, res) => {
    try {
        Partner.findById(req.params.id, function (err, foundUser) {
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
//Update my profile by my id
router.put("/partner/:id", async (req, res) => {
    try {
        if (req.body.password != null) {
            const salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body.password, salt);
        }
        Partner.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }, function (err, foundUser) {
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
            else
            if ((err.message.split(" ", 1))[0] === "E11000")
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
//Delete my profile by my id
router.delete("/partner/:id", async (req, res) => {
    try {
        Partner.findByIdAndDelete(req.params.id, function (err, foundUser) {
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
});
//Set/Update my profile picture
router.post("/profilePicture/partner/:id", async (req, res) => {
    try {
        Partner.findByIdAndUpdate(req.params.id, {
            profilePhoto: {
                data: fs.readFileSync(req.body.imagePath),
                contentType: "image/jpg"
            }
        }, {
            new: true
        }, function (err, foundUser) {
            if (!err)
                res.json({
                    msg: "Your profile has been set successfully",
                    data: foundUser.profilePhoto
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
//Delete my profile picture
router.delete("/profilePicture/partner/:id", async (req, res) => {
    try {
        Partner.findByIdAndUpdate(req.params.id, {
            profilePhoto: null
        }, {
            new: true
        }, function (err, foundUser) {
            if (!err)
                res.json({
                    msg: "Your profile has been set successfully",
                    data: foundUser.profilePhoto
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
//View my profile picture
router.get("/profilePicture/partner/:id", async (req, res) => {
    try {
        Partner.findById(req.params.id, function (err, foundUser) {
            if (!err) {
                res.contentType(foundUser.profilePhoto.contentType);
                res.send(foundUser.profilePhoto.data);
            } else res.json({
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