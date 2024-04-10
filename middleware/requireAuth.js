const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in" })
    }
    const token = authorization.replace("Bearer ", "");
    try {
        const { _id } = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findById(_id).select('_id');
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "request not authorized" })

    }

}

module.exports = requireAuth;