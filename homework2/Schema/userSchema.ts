import Joi from 'joi';

const userSchema = Joi.object().keys({
    id: Joi.string().required(),
    login: Joi.required(),
    password: Joi.string().regex(/^[A-Za-z0-9]+/),
    age: Joi.number().integer().min(4).max(130),
    isDeleted: Joi.boolean().required()
});

export default userSchema;
