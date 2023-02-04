const Joi = require('joi');
const signUpValidate = {
    body:Joi.object().required().keys({
        name:Joi.string(),
        username:Joi.string().required(),
        email:Joi.string().email().messages({
            "string.empty":"you must add email",
            "string.email":"giv valied email"

        }),
        password:Joi.string(),
        cpassword:Joi.ref("password"),
        picurl:Joi.string()
    }),
    params:Joi.object(),
    query:Joi.object()
}

const updatedUserValidation = {
    body:Joi.object().required().keys({
        name:Joi.string().required()
    }),
    params:Joi.object().required().keys({
        id:Joi.string().required().min(24).max(24)
    }),
    query:Joi.object()
}

const logIn = {
    body:Joi.object().required().keys({
        email:Joi.string().email().required(),
        password:Joi.string().required()
    }
    ),
    params:Joi.object(),
    query:Joi.object()

}
module.exports = {signUpValidate,updatedUserValidation,logIn}