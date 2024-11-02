const jwt = require('jsonwebtoken');

module.exports= authMiddleware = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

    if (token) {
        jwt.verify(token, "secret", (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Недійсний токен' });
                
            }
            
            req.userId = decoded._id;
            next();
            
        });
    } else {
        return res.status(403).json({ message: 'Токен не надано' });
    }
};

