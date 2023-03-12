const userModel = require('../../../DB/model/userModel/userRegister.model');
const postModel = require("../../../DB/model/postModel/post.model")
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode}=require("http-status-codes");
const { Cursor } = require('mongoose');
const commentModel = require('../../../DB/model/commentModel/comment.model');


const addPost = async(req,res)=>{
    try {
        let userId = req.user
        let {title,desc} = req.body
        let isFound = await userModel.findOne({_id:userId})
        if(!isFound){
            res.status(StatusCodes.BAD_REQUEST).json({massage:"the user is not found",stutsErr:getReasonPhrase(StatusCodes.BAD_REQUEST)})
        }else{
            let addPost = await postModel.insertMany({title,desc,userId})
            res.status(202).json({massage:"the post added",addPost})
        }
    } catch (error) {
        res.status(StatusCodes.BAD_GATEWAY).json({massage:"found error",error,stutsReason:getReasonPhrase(StatusCodes.BAD_GATEWAY)})
    }

}

const allPost = async(req,res)=>{
    const allPost = await postModel.find({}).populate({
        path:"userId",
        model:"user",
        select:"username"
    })
    // .cursor();
    // let allData = []
    // for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    //     let commentsPost = await commentModel.find({postId:doc._id})  
    //     allData.push({...doc._doc,commentsPost})       
    // }
    res.status(StatusCodes.ACCEPTED).json({massage:"done",allPost})

  
}


module.exports = {addPost,allPost}