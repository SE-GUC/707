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
        const currentUser = await Admin.findById(jwt_payload._id)
        if(!currentUser){
            const currentUser = await Partner.findById(jwt_payload._id)
            if(!currentUser){
                const currentUser = await Consultancy.findById(jwt_payload._id)
                if(!currentUser){
                    const currentUser = await Candidate.findById(jwt_payload._id)
                }
            }
        }

        if(currentUser) return done(null,currentUser)
        return done(null,false)
     }))


     
 }