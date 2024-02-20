const jwt = require("jsonwebtoken")

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.sendStatus(401);

  jwt.verify(token.split(' ')[1], process.env.SECRET_KEY, (err, user) => {
    if (err) {
      console.error(err);
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
