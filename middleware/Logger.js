const jwt = require('jsonwebtoken');

const logger = (req,res,next) =>  {
    if(!req.originalUrl.includes("api/login") && !req.originalUrl.includes("/register")){
    const token = (req.headers.authorization).replace("Bearer ","");
    jwt.verify(token, 'verysecretkey', function(err, decodedToken) {
        if(err) { console.log(err) }
        else {
             req.id = decodedToken._id;  // Add to req object
        }
      });
    }
    next()
}

module.exports = logger