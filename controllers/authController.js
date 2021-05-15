const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });
    req.session.user = newUser;
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
    });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (matchPassword) {
      req.session.user = user;
      res.status(200).json({
        status: 'success',
        message: 'Login successful',
      });
    } else {
      res.status(400).json({
        status: 'fail',
        message: 'Invalid password',
      });
    }
  } catch (e) {
    res.status(400).json({
      status: 'fail',
    });
  }
};
