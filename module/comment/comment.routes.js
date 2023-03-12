const commentRouter = require("express").Router()
let {addComment,updateComment} = require("./controller/comment.controller")

commentRouter.post("/addComment",addComment)
commentRouter.post("/updatecomment/:commentId",updateComment)


module.exports = commentRouter