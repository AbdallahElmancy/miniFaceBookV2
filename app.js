const express = require('express')
require("dotenv").config()
const app = express()
const port = process.env.PORT
app.use(express.json())

const {userRoute,massageRoute} = require('./routes/routes');

const runConnection = require('./DB/config');
runConnection()
app.use(userRoute)
app.use(massageRoute)
app.listen(port)