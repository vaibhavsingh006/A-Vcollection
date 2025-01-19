// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
    const token = req.cookies.token;
    console.log(token, 'protect token')

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log(decoded, 'protect decode')
        let user = await User.findOne({ email: decoded.email })
        console.log(user, 'protect')
        if (!user) {
            return res.status(403).json({ message: 'Access denied. User ID mismatch.' });
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = protect;
