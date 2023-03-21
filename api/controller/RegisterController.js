const RegisterModel = require('../model/RegisterSchema');
const registerUserController = {};

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
                res.send({ status: 'ok', msg: 'success', data: addedUser })
            } catch (err) {
                res.send({ status: 'error', msg: 'network problem', data: null })
            }
        }
    } catch (err) {
        res.send({ status: 'error', msg: 'network problem', data: null })
    }
};



registerUserController.addPassword = async (req, res) => {

    const { email, password, isProfileComplete } = req.body;

    try {
        const addedPassword = await RegisterModel.findOneAndUpdate(
            { email },
            { password, isProfileComplete: true }
        )
        res.send({ status: 'ok', msg: 'password updated successfully', data: addedPassword })
    } catch (err) {
        res.send({ status: 'error', msg: 'network problem', data: null })
    }
};

module.exports = registerUserController;
