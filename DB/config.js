const mongoose = require('mongoose');

const runConnection= ()=>{
 return mongoose.connect(process.env.CONEECTION_STRING).then((res)=>{
    console.log("run");
 }).catch((error)=>{
    console.log("there is error");
 })
}


module.exports = runConnection