const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = (async (req, res) => {
  const { username, password } = req.body;
  // const userExists = await User.findOne({username});
  // if (userExists) {
  //   return res.status(400).json("Username already exists.");
  // }

  try {
    const user = await User.create({
      username,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    })
    const token_value = jwt.sign({username, id: user._id}, process.env.JWT_SECRET)
    res.cookie('access_token', token_value, {sameSite: 'none', secure: true}).json({id: user._id, username})
  } catch (err) {
    res.status(400).json(err);
  }
})

const loginUser = (async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({username});
  if (!user) {
    return res.status(400).json('User not found.');
  }
  const passwordCorrect = bcrypt.compareSync(password, user.password);
  if (passwordCorrect) {
    const token_value = jwt.sign({username, id: user._id}, process.env.JWT_SECRET)
    res.cookie('access_token', token_value, {sameSite: 'none', secure: true}).json({id: user._id, username}) // Chrome dev tools - Network - login - Preview
  } else {
    res.status(400).json('Incorrect password.');
  }
})

const logoutUser = (async (req, res) => {
  // clearCookie() only works if we pass the same options parameter (sameSite, secure) as we did when we created the token during login
  res.clearCookie('access_token', {sameSite: 'none', secure: true}).redirect('/post/');  
})

module.exports = {
  registerUser,
  loginUser,
  logoutUser
}