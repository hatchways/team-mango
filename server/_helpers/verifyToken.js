const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();
const verifyToken = async (req, res, next) => {
  const token = req.cookies.token || '';
  
  try {
    if (!token) {
      return res.status(401).json('You need to Login')
    }
    
    const decrypt = await jwt.verify(token, process.env.secret);
    req.user = {
      id: decrypt.id,
      firstname: decrypt.firstname,
    };
    
    next();
  } catch (err) {
      console.log(err);
    return res.status(500).json(err.toString());
  }
};

module.exports = verifyToken;
