const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const Admin = require("../models/Admin");
const Partner = require("../models/Partner");
const Consultancy = require("../models/Consultancy");
const Candidate = require("../models/Candidate");
const tokenKey = require('./keys').secretOrKey
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = tokenKey
module.exports = passport => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        const admin = await Admin.findById(jwt_payload._id)
        if (admin) return done(null, admin)
        if (!admin) {
            const partner = await Partner.findById(jwt_payload._id)
            if (partner) return done(null, partner)
            if (!partner) {
                const consultancy = await Consultancy.findById(jwt_payload._id)
                if (consultancy) return done(null, consultancy)
                if (!consultancy) {
                    const candidate = await Candidate.findById(jwt_payload._id)
                    if (candidate) return done(null, candidate)
                }
            }
        }
        return done(null, false)
    }))
}