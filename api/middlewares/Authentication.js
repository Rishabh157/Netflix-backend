
const jwt = require('jsonwebtoken');
const SERVER_KEY = process.env.SERVER_KEY;

const isAuthenticated = async (req, res, next) => {

    const { authorization } = req.headers;

    jwt.verify(authorization, SERVER_KEY, async (err, result) => {
        if (err) {
            res.send({ status: 'error', msg: 'authentication failed', Authorization: false })
        } else {
            next()
        }
    });
}

module.exports = isAuthenticated;
