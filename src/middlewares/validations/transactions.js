import Joi from 'joi';

export const AmountSchema = (req, res, next) => {
  const schema = Joi.object({
    description: Joi.string().required().messages({
      'any.required': 'Description is required',
      'string.empty': 'Description can not be empty',
    }),
    amount: Joi.number().required().messages({
      'number.base': 'Amount must be a number',
      'number.empty': 'Please fill the amount',
      'any.required': 'Amount is required',
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
