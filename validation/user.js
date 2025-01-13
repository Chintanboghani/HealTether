const joi = require('joi');

exports.signUpValidation = (req, res, next) => {
  try {
    const validation = joi.object({
      email: joi.string().required().email(),
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      password: joi.string().required(),
      mobileNumber: joi
        .string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
    });

    const { error } = validation.validate(req.body);
    if (error) {
      return res.status(402).json({
        status: 402,
        message: `${error.message}.`,
      });
    } else {
      return next();
    }
  } catch (error) {
    return error;
  }
};

exports.loginValidation = (req, res, next) => {
  try {
    const validation = joi.object({
      email: joi.string().required().email(),
      password: joi.string().required(),
    });

    const { error } = validation.validate(req.body);
    if (error) {
      return res.status(402).json({
        status: 402,
        message: `${error.message}.`,
      });
    } else {
      return next();
    }
  } catch (error) {
    return error;
  }
};
