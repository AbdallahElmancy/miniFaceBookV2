const route = require("express").Router()
const {signUp,signIn,getUsers,updateUser} = require('./controller/user.controller');
const validation = require('../../middleware/validation');
const {signUpValidate,updatedUserValidation,logIn} = require('./user.validator');
route.get("/getAllUser",getUsers)

route.post("/signUp",validation(signUpValidate),signUp)
route.post("/signIn",validation(logIn),signIn)
route.patch("/user/:id",validation(updatedUserValidation),updateUser)

module.exports= route