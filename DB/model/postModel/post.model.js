const mongoose = require('mongoose');
const replySchema = new mongoose.Schema({
    desc:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
 
})
const commentSchema = new mongoose.Schema({
    desc:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    replys:[replySchema]
    // postId:{
    //     type:mongoose.Types.ObjectId,
    //     ref:'post'
    // }
})
let postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    comments:[commentSchema]
})

let postModel = mongoose.model("post",postSchema)
module.exports = postModel