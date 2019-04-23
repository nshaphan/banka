import jwt from 'jsonwebtoken'
import config from '../config/config'

export default (req, res, next) => {
    let token = req.headers['x-access-token'];

    if(!token)
        req.body.user.role = 'public';
        next();
    
    // verify secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
        if(err)
            return res.status(500).json({
                auth: false,
                message: 'Failed to authenticate token.'
            });

        
        
        req.body.user = decoded;
        next();
    });
}