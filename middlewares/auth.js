const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  let token = req.header('authorization')
  if (!token) 
    return res.status(401).send("Access denied");

  try {
    token = token.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send("Access denied");    
  }
}