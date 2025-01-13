const userModel = require('../model/user.js');
const { verifyJwt } = require('./jwtVerify');

const verifyToken = async (req, res, next) => {
  try {
    const bearerHeader = req.headers?.authorization;
    if (bearerHeader) {
      const token = bearerHeader.replace('Bearer ', '');

      const userDetails = verifyJwt(token);

      if (userDetails) {
        const user = await userModel.findOne({ email: userDetails.email });

        if (user) {
          req.user = user;
          return next();
        }
      }
    }
    throw 'Unauthorized';
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
};

module.exports = { verifyToken };
