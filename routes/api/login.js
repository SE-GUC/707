const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const passport = require('passport')
const tokenKey = require('../../config/keys').secretOrKey
require('../../config/passport')(passport)
const validator = require("../../validations/loginValidations");
const Admin = require("../../models/Admin");
const Partner = require("../../models/Partner");
const Consultancy = require("../../models/Consultancy");
const Candidate = require("../../models/Candidate");
//login
router.post('/', async (req, res) => {
    try {
        const isValidated = validator.createValidation(req.body);
        if (isValidated.error)
            return res
                .status(400)
                .send({
                    error: isValidated.error.details[0].message
                });
        const {
            email,
            password
        } = req.body;
        const admin = await Admin.findOne({
            email
        });
        if (admin) {
            const match = bcrypt.compareSync(password, admin.password);
            if (match) {
                const payload = {
                    _id: admin._id,
                    name: admin.name,
                    email: admin.email
                }
                const token = jwt.sign(payload, tokenKey, {
                    expiresIn: '1h'
                })
                res.json({
                    data: `Bearer ${token}`
                })
                return res.json({
                    data: 'Token'
                })
            } else return res.status(400).send({
                password: 'Wrong password'
            });
        } else {
            const partner = await Partner.findOne({
                email
            });
            if (partner) {
                const match = bcrypt.compareSync(password, partner.password);
                if (match) {
                    const payload = {
                        _id: partner._id,
                        name: partner.name,
                        email: partner.email
                    }
                    const token = jwt.sign(payload, tokenKey, {
                        expiresIn: '1h'
                    })
                    res.json({
                        data: `Bearer ${token}`
                    })
                    return res.json({
                        data: 'Token'
                    })
                } else return res.status(400).send({
                    password: 'Wrong password'
                });
            } else {
                const consultancy = await Consultancy.findOne({
                    email
                });
                if (consultancy) {
                    const match = bcrypt.compareSync(password, consultancy.password);
                    if (match) {
                        const payload = {
                            _id: consultancy._id,
                            name: consultancy.name,
                            email: consultancy.email
                        }
                        const token = jwt.sign(payload, tokenKey, {
                            expiresIn: '1h'
                        })
                        res.json({
                            data: `Bearer ${token}`
                        })
                        return res.json({
                            data: 'Token'
                        })
                    } else return res.status(400).send({
                        password: 'Wrong password'
                    });
                } else {
                    const candidate = await Candidate.findOne({
                        email
                    });
                    if (candidate) {
                        const match = bcrypt.compareSync(password, candidate.password);
                        if (match) {
                            const payload = {
                                _id: candidate._id,
                                name: candidate.name,
                                email: candidate.email
                            }
                            const token = jwt.sign(payload, tokenKey, {
                                expiresIn: '1h'
                            })
                            res.json({
                                data: `Bearer ${token}`
                            })
                            return res.json({
                                data: 'Token'
                            })
                        } else return res.status(400).send({
                            password: 'Wrong password'
                        });
                    } else {
                        return res.status(404).json({
                            email: 'Email does not exist'
                        });
                    }
                }
            }
        }
    } catch (error) {
        res.json({
            msg: error.message
        });
    }
});
module.exports = router;