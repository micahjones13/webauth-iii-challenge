const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
  //get the token from Authorization header 
  const token = req.headers.authorization;
  //const jwtSecret = process.env.JWT_SECRET || 'keep it secret, keep it safe!';
  //verify the token
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        //invalid token
        res.status(401).json({
          you: "Shall not pass"
        });
      } else {
        //valid token
        req.jwtToken = decodedToken; // pass the decodedToken to any middleware that get executed after this one
        next();
      }
    });
  } else {
    res.status(401).json({
      message: "No token"
    });
  }

};