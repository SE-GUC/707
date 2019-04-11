const jwt = require("jsonwebtoken");
const LoggedOutUser = require("../models/LoggedOutUser");
const logger = (req, res, next) => {
    if (!req.originalUrl.includes("api/login") && !req.originalUrl.includes("/register"))
        jwt.verify((req.headers.authorization).replace("Bearer ", ""), "verysecretkey", async (err, decodedToken) => {
            if (!err)
                LoggedOutUser.findById(decodedToken._id, function (err) {
                    if (!err)
                        req.id = decodedToken._id;
                    else
                        console.log(err);
                });
            else
                console.log(err);
        });
    next();
}
module.exports = logger;