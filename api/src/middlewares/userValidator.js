import joi from 'joi';
import userSchema from '../schemas/schemas'

export default () => {
    const validationOptions = {
        abortEarly: false, // Abort after the last validation error
        allowUnknown: true, // allow unknown keys that will be ignored
        //stripUnkown: true // remove unknown keys from the validated data
    }

    // return the validation middleware
    return (req, res, next) => {
        const route = req.route.path;
        const method = req.method.toLowerCase();
        
        return joi.validate(req.body, userSchema, validationOptions, (err, data) => {
            if(err) {
                const error = {
                    status: 400,
                    error: err.details
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

    next();
};