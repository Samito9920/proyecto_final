const jwt = require('jsonwebtoken')
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")?.[1];
  
  try{
      const decoded = jwt.verify(token, JWT_SECRET)
      req.user = decoded.data
      next();
  } catch(error){
      return res.send({
          error: error.message
      })
  }
}

module.exports = authMiddleware;
