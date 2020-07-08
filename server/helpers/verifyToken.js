const jwt = require("jsonwebtoken");
const userService = require("../users/user.service");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token || "";
   
  try {
    if (!token) {
      return res.status(401).json("You need to Login");
    }

    const decrypt = await jwt.verify(token, process.env.secret);

    userService
      .getById(decrypt.sub)
      .then((user) => (user ? (req.user = user) : res.status(404)))
      .then(() => next())
      .catch(res.status(401));
    
   
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.toString());
  }
};

module.exports = verifyToken;
