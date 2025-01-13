const user = require('../model/user.js');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const payload = req.body;

    const checkEmail = await user.findOne({ email: payload.email });
    if (checkEmail) {
      return res.status(402).json({
        status: 402,
        message: `${payload.email} email is already exist.`,
      });
    }

    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(payload.password, salt);

    const userData = new user({
      email: payload.email,
      password: hashedPassword,
      firstName: payload.firstName,
      lastName: payload.lastName,
      mobileNumber: payload.mobileNumber,
    });

    await userData.save();

    return res.status(200).json({ status: 200, message: 'signed up', data: userData });
  } catch (error) {
    res.status(400).json({ status: 400, message: 'something went wrong' });
  }
};

exports.login = async (req, res) => {
  try {
    const payload = req.body;
    const checkUser = await user.findOne({ email: payload.email });

    if (!checkUser) {
      return res.status(402).json({ status: 402, message: 'User not exist' });
    }

    const validPass = await bcrypt.compare(payload.password, checkUser.password);

    if (!validPass) {
      return res.status(402).json({ status: 402, message: 'Enter valid credential' });
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.status(200).json({
      status: 200,
      message: 'logged in',
      data: checkUser,
      token: token,
    });
  } catch (error) {
    res.status(400).json({ status: 400, message: 'something went wrong' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userData = await user.find({});
    return res.status(200).json({ status: 200, message: 'success', data: userData });
  } catch (error) {
    res.status(400).json({ status: 400, message: 'something went wrong' });
  }
};
