const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const tokenKey = require("./keys").secretOrKey;
const User = require("../models/User").User;
let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: tokenKey
};
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      const user = await User.findById(jwt_payload._id);
      if (user) return done(null, user);
      return done(null, false);
    })
  );
};
