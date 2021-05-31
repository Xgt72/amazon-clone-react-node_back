require("dotenv").config();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const createToken = (req, res, next) => {
  const { user } = req.body;
  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: "1h",
  });
  user.token = token;
  const { password, ...userWithoutPassword } = user;
  res.status(200).json(userWithoutPassword);
};

const authenticateWithJsonWebToken = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(req.headers);
    jwt.verify(token, JWT_SECRET, (err) => {
      if (err) {
        res.status(401).json({
          errorMessage: "You're not authorized to access this data",
        });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({
      errorMessage: "You're not authorized to access this data",
    });
  }
};

module.exports = {
  createToken,
  authenticateWithJsonWebToken,
};
