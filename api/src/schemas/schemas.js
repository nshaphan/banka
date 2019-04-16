import joi from 'joi';

const name = joi.string().regex(/^[A-Za-z]+$/).lowercase().required();
const email = joi.string().email().lowercase().required();

const userSchema = joi.object().keys({
    firstname: name,
    lastname: name,
    email: email,
    type: joi.string().valid(['client', 'staff']).required(),
});

const signinSchema = joi.object().keys({
    email: email,
    password: joi.string().min(8).required()
});


export default userSchema;