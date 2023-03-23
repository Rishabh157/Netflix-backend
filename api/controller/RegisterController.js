const RegisterModel = require('../model/RegisterSchema');
const jwt = require('jsonwebtoken');
const SERVER_KEY = process.env.SERVER_KEY;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const registerUserController = {};

/** for added unique ragister **/
registerUserController.addUser = async (req, res) => {

    const { email, password, isProfileComplete, isSubscribed } = req.body;

    try {
        const findUser = await RegisterModel.find({ email })
        if (findUser.length > 0) {
            res.send({ status: 'ok', msg: 'founded', data: findUser })
        } else {
            try {
                const addedUser = await RegisterModel.create({
                    email,
                    password,
                    isProfileComplete,
                    isSubscribed
                })
                res.send({ status: 'ok', msg: 'user successfully registered', data: addedUser })
            } catch (err) {
                res.send({ status: 'error', msg: 'network problem', data: null })
            }
        }
    } catch (err) {
        res.send({ status: 'error', msg: 'network problem', data: null })
    }
};

/** for update password or hash and isProfileComplete fields via existing email **/
registerUserController.addPassword = async (req, res) => {

    const { email, password, isProfileComplete } = req.body;

    if (password.length > 4) {
        bcrypt.hash(password, saltRounds, async (err, hashPassword) => {
            if (err) {
                res.send({ status: 'error', msg: 'hash password is not genrated', data: err })
            } else {
                try {
                    const addedPassword = await RegisterModel.findOneAndUpdate(
                        { email },                       // filter via email
                        { password: hashPassword, isProfileComplete }, // update this fields
                        { new: true }                    // document after update was applied.
                    )
                    const authToken = jwt.sign({ email }, SERVER_KEY);
                    res.send({ status: 'ok', msg: 'password updated successfully', data: { data: addedPassword, token: authToken } })
                } catch (err) {
                    res.send({ status: 'error', msg: 'network problem', data: null })
                }
            }
        })
    } else {
        res.send({ status: 'error', msg: 'password must contain at least 4 latters', data: null })
    }
};

/** for user login via email or not **/
registerUserController.isUserLogin = async (req, res) => {

    const { email, password } = req.body;

    try {

        const foundedData = await RegisterModel.find({ email });

        if (foundedData?.length > 0) {

            const { password: encryptedPassword } = foundedData[0]

            bcrypt.compare(password, encryptedPassword, async (err, result) => {
                if (result) {
                    const authToken = jwt.sign({ email }, SERVER_KEY);
                    res.send({ status: 'ok', msg: `user founded`, data: { data: foundedData, token: authToken } })
                } else {
                    res.send({ status: 'error', msg: `password is incorrect`, data: null })
                }
            });

        } else {
            res.send({ status: 'ok', msg: `${email} is not registered`, data: null })
        }


        // const { password: hashPassword } = foundedData


    } catch (err) {
        res.send({ status: 'error', msg: 'network problem', data: null })
    }

};

/** for user Auth check only takes header Authorization jwt token **/
registerUserController.isAuththicationCheck = async (req, res) => {

    const { authorization } = req.headers;

    jwt.verify(authorization, SERVER_KEY, async (err, result) => {
        if (err) {
            res.send({ status: 'error', msg: 'authentication failed', Authorization: false })
        } else {
            res.send({ status: 'ok', msg: `authorization passed`, Authorization: true })
        }
    });

};


registerUserController.subscribe = async (req, res) => {


    const { } = req.body;

};

module.exports = registerUserController;
