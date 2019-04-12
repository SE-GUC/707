const jwt = require("jsonwebtoken");
const tokenKey = require("../config/keys").secretOrKey;
const logger = (req, res, next) => {
    if (!req.originalUrl.includes("api/login") && !req.originalUrl.includes("/register"))
        jwt.verify((req.headers.authorization).replace("Bearer ", ""), tokenKey, async (err, decodedToken) => {
            if (!err)
                req.id = decodedToken._id;
            else {
                res.json(err.message);
            }
        });
    next();
}
module.exports = logger;