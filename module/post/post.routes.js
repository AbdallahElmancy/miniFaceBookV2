const postRouter = require("express").Router()
let {addPost,allPost} = require("./controller/post.controller")
const auth = require('../../middleware/auth');
postRouter.post("/addPost",auth(),addPost)
postRouter.get("/allPost",allPost)
module.exports = postRouter