const mongoose = require('mongoose');
const url = process.env.CONEECTION_STRING
let connection = ()=>{
    mongoose.connect(url).then((res)=>{
        console.log("run");
     }).catch((error)=>{
        console.log("there is error");
     })
}


module.exports = connection