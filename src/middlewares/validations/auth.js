import Joi from 'joi';

export const SignupSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .messages({
        'any.required': 'Name is required',
        'string.empty': 'Name can not be empty',
      }),
    username: Joi.string()
      .required()
      .messages({
        'any.required': 'Username is required',
        'string.empty': 'Username can not be empty',
      }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'any.required': 'Email is required',
        'string.empty': 'Email can not be empty',
      }),
    password: Joi.string()
      .required()
      .regex(RegExp('^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$'))
      .messages({
        'any.required': 'Password is required',
        'string.pattern.base': 
          'Password must be at least 8 characters including 1 uppercase and special character'
        ,
        'string.empty': 'Password can not be empty',
      }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};

export const LoginSchema = (req, res, next) => {
    const schema = Joi.object({
      username: Joi.string()
        .messages({
          'string.empty': 'Username can not be empty',
        }),
      email: Joi.string()
        .email()
        .messages({
          'string.empty': 'Email can not be empty',
        }),
      password: Joi.string()
        .required()
        .messages({
          'any.required': 'Password is required',
          'string.empty': 'Password can not be empty',
        }),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    return next();
  };