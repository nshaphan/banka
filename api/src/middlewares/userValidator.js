import joi from 'joi';

const name = joi.string().regex(/^[A-Za-z]+$/).lowercase().required();
const email = joi.string().email({minDomainAtoms: 2 }).lowercase().required();

const userSchema = joi.object().keys({
    firstname: name,
    lastname: name,
    email: email,
    password: joi.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required()
});

export default () => {
    const validationOptions = {
        abortEarly: false, // Abort after the last validation error
        allowUnknown: true // allow unknown keys that will be ignored
        //stripUnkown: true // remove unknown keys from the validated data
    }

    // return the validation middleware
    return (req, res, next) => {
        return joi.validate(req.body, userSchema, validationOptions, (err, data) => {
            if(err) {
                const errors = [];
                err.details.map((e) => {
                     errors.push({field: e.path[0], message: e.message});
                });

                const error = {
                    status: 400,
                    error: errors
                }

                // Send back the JSON error response
                res.status(400).json(error);
            } else {
                // Replace req.body with the data after validation
                req.body = data;
                next();
            }
        });
    }
};