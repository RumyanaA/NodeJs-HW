import jwt from 'jsonwebtoken';
import config from '../config/index.js';
const checkToken = (req, res, next) => {
    const token = req.headers['auth_token'];
    if (!token) {
        return res.status(401).send({ success:false, message:'No token provided.' });
    }
    try {
        jwt.verify(token, config.jwtSecret);
        return next();
    } catch (e) {
        return res.status(403).send({ success: false, message: 'Failed to authenticate token.' });
    }
};

export default checkToken;
