
const jwt = require('jsonwebtoken');
const SERVER_KEY = process.env.SERVER_KEY;

const isAuthenticated = async (req, res, next) => {

    const { authorization } = req.headers;
    // console.log(authorization)

    jwt.verify(authorization, SERVER_KEY, async (err, result) => {
        if (err) {
            res.send({ status: 'error', msg: 'authentication failed', Authorization: false })
        } else {
            // res.send({ status: 'ok', msg: `authorization passed`, Authorization: true })
            next()
        }
    });
}

module.exports = isAuthenticated;
