const express = require('express');
require("dotenv").config()
const port = process.env.PORT
const app = express()
const {userRouter,postRouter,commentRouter} = require('./routes/routes');
let connection = require("./DB/config")
connection()
app.use(express.json())
app.use(userRouter)
app.use(postRouter)
app.use(commentRouter)

app.listen(port)