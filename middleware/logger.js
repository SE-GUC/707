const jwt = require('jsonwebtoken');
const LoggedOutUser = require("../models/LoggedOutUser");
const logger = (req, res, next) => {
    if (!req.originalUrl.includes("api/login") && !req.originalUrl.includes("/register")) {
        const token = (req.headers.authorization).replace("Bearer ", "");
        jwt.verify(token, 'verysecretkey', async (err, decodedToken) => {
            if (err) {
                console.log(err)
            } else {
                const loggedOutUser = await LoggedOutUser.findOne({
                    id: decodedToken._id
                })
                if (!loggedOutUser) {
                    req.id = decodedToken._id;
                }
            }
        });
    }
    next();
}
module.exports = logger
