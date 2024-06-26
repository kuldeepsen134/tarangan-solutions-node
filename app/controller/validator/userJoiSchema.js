const Joi = require("joi")

const registerUser = Joi.object().keys({
    full_name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(32).required(),
    mobile: Joi.string().min(10).max(13),
    role: Joi.string(),
})

const updateUser = Joi.object().keys({
    _id: Joi.string(),
    full_name: Joi.string(),
    email: Joi.string().email(),
    mobile: Joi.string().min(10).max(13),
})


const updateUserProfile = Joi.object().keys({
    full_name: Joi.string(),
    email: Joi.string().email(),
    mobile: Joi.string().min(10).max(13),
})


const loginUser = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(32).required(),

})

const resetUserPassword = Joi.object().keys({
    email: Joi.string().email().required(),
})

const updateUserPassword = Joi.object().keys({
    token: Joi.string().required(),
    newPassword: Joi.string().min(8).max(32),
    confirmPassword:  Joi.string().min(8).max(32),
})

module.exports = {
    registerUser,
    updateUser,
    updateUserProfile,
    loginUser,
    resetUserPassword,
    updateUserPassword,
}