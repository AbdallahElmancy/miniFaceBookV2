const mongoose = require('mongoose');
const bcrypte = require("bcrypt");
const saltRound = process.env.SALTROUND
let schema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String
        },
    isConfirm:{
        type:Boolean,
        default:false
    }

})
schema.pre("save",function (next){
    this.password = bcrypte.hashSync(this.password,parseInt(saltRound))
    next()
})


let registerSchema = mongoose.model("user",schema)

module.exports = registerSchema