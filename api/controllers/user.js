const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
  verifyLogin: ((req, res) => {
    const {access_token} = req.cookies;
    if (!access_token) {
      return res.status(400).json("User is not logged in.");
    }
    jwt.verify(access_token, process.env.JWT_SECRET, {}, (err, info) => {
      if (err) throw err;
      res.json(info);
    })
  })
}