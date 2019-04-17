
export default (roles = []) => {
    
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        
        if (roles.length && !roles.includes(req.body.user.role)) {
            // user's role is not authorized
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // authorization successful
        next();
    }
    
}