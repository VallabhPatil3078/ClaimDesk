// server/middleware/authMiddleware

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded?.id || decoded?.user?.id).select('-password');


      if (!user) {
        return res.status(401).json({ message: 'User not found, not authorized' });
      }

      req.user = {
        id: user._id,
        role: user.role,
        email: user.email
      };

      console.log('Authenticated user:', req.user);

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'No token, not authorized' });
  }
};

module.exports = { protect };
