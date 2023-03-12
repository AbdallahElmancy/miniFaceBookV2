const joi = require("joi");
const userSignUp ={
    body:joi.object().required().keys({
        username:joi.string().required(),
        email:joi.string().email().required(),
        password:joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        cpassword:joi.ref("password"),
        phone:joi.string()
    }),
    params:joi.object(),
    query:joi.object(),


}

const userSignIn ={
    body:joi.object().required().keys({
        email:joi.string().email().required(),
        password:joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    }),
    params:joi.object(),
    query:joi.object(),


}

module.exports = {userSignUp,userSignIn}