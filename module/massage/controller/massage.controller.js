const massageModel = require('../../../DB/Model/massageModel');

const userModel = require('../../../DB/Model/userModel');
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode}=require("http-status-codes")


const addMassage = async (req,res)=>{
    try {
        let {sendto,createdby} = req.params;
        let {massagebody,title}= req.body;
        let sendFind = await userModel.findOne({_id:sendto})
        if (sendFind) {
            let insertMassage =await massageModel.insertMany({massagebody,title,sendto,createdby})
            res.json({massage:"Done",insertMassage})
    
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({massage:"usernot found"})
        }
    } catch (error) {
        res.json({massage:"erorr",error})
    }
  
}
const myMassage = async (req,res)=>{
    let {id} = req.params
    let getMyMassage = await massageModel.find({sendto:id}).select("-createdby")
    res.json({massage:"your massages",getMyMassage})
}
const allMassage = async (req,res)=>{
    let allMassage = await massageModel.find().populate([{path:"sendto"},{path:"createdby",select:"username"}])
    res.json({massage:"all massages",allMassage})
}

module.exports = {addMassage,myMassage,allMassage}