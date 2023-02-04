const mongoose = require('mongoose');

let massageSchema = new mongoose.Schema({
    massagebody:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    sendto:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    createdby:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    }
})

const massageModel = mongoose.model("massage",massageSchema)
module.exports = massageModel