
const userModel = require('../../../DB/model/userModel/userRegister.model');
const postModel = require("../../../DB/model/postModel/post.model")
// const commentModel = require("../../../DB/model/commentModel/comment.model")
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode}=require("http-status-codes")



let addComment = async(req,res)=>{
    try {
        let {desc,userId,postId} = req.body
        let isFound = await userModel.findOne({_id:userId})
        if(!isFound){
            res.status(StatusCodes.BAD_REQUEST).json({massage:"the user is not found",stutsErr:getReasonPhrase(StatusCodes.BAD_REQUEST)})
        }else{
            let postFound = await postModel.findOne({_id:postId})
            if(postFound){
                // let addComment = await commentModel.insertMany({desc,userId,postId})
                postFound.comments.push({desc,userId})
                let updatePost = await postModel.findByIdAndUpdate(postFound._id,{comments:postFound.comments},{new:true})
                res.status(StatusCodes.ACCEPTED).json({massage:"success",updatePost})
            }else{
                res.status(StatusCodes.BAD_REQUEST).json({massage:"the post is not found",stutsErr:getReasonPhrase(StatusCodes.BAD_REQUEST)})

            }


        }
    } catch (error) {
        res.status(StatusCodes.BAD_GATEWAY).json({massage:"found error",error,stutsReason:getReasonPhrase(StatusCodes.BAD_GATEWAY)})
    }
}

const updateComment = async(req,res)=>{
    try {
        let {commentId} = req.params
    let {desc,userId,postId} = req.body 

    let postFound = await postModel.findOne({_id:postId})
    if (!postFound) {
        res.status(StatusCodes.BAD_REQUEST).json({massage:"post invalied",StatusErr:getReasonPhrase(StatusCodes.BAD_REQUEST)})
    }else{
        let currentComment
        let findComment = postFound.comments.find((comment,index)=>{
            if (comment._id == commentId && comment.userId == userId) {
                currentComment = index
                return comment
            }
       
        })
        if (currentComment >= 0) {
            postFound.comments[currentComment].desc = desc
            let updateComment = await postModel.findByIdAndUpdate({_id:postFound._id},{comments:postFound.comments},{new:true})
            res.status(StatusCodes.ACCEPTED).json({massage:"updated",updateComment}) 
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({massage:"comment invalied",StatusErr:getReasonPhrase(StatusCodes.BAD_REQUEST)})

        }
    }

    } catch (error) {
        res.status(StatusCodes.BAD_GATEWAY).json({massage:"found error",error,stutsReason:getReasonPhrase(StatusCodes.BAD_GATEWAY)})
    }
}

module.exports ={ addComment,updateComment}