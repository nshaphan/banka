import joi from 'joi';

const name = joi.string().regex(/^[A-Za-z]+$/).lowercase().required();
const email = joi.string().email().lowercase().required();

const userSchema = joi.object().keys({
    firstname: name,
    lastname: name,
    email: email,
    type: joi.string().valid(['client', 'staff']).required(),
});

export default userSchema;