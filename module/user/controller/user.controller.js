

//hash 
const userModel = require('../../../DB/Model/userModel');
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode}=require("http-status-codes")
const bcrypte = require('bcrypt');
const SaltRound = parseInt(process.env.SALT_ROUND)
const signUp = async(req,res)=>{
   try {
       let {name,username,email,password,cpassword,picurl}= req.body
          let userFounded = await userModel.findOne({email})
   if(userFounded){
           res.status(StatusCodes.BAD_REQUEST).json({massage:"email already register"})

   }else{
        if(password == cpassword){
        bcrypte.hash(password,SaltRound,async(err,hash)=>{
            let adduser = await userModel.insertMany({name,username,email,password:hash,picurl})
            res.json({massage:"done",adduser})
        })
          
       }else{
           res.status(StatusCodes.BAD_REQUEST).json({massage:"password not match"})
           
       }
   }
       
   } catch (error) {
       res.json({massage:"email already register",error})

   }
}

const signIn = async(req,res)=>{
   let {email,password}= req.body
   let userFounded = await userModel.findOne({email})
   if(userFounded){
    bcrypte.compare(password,userFounded.password,(err,result)=>{
        if(result){
            res.json({massage:"welcome"})
        }else{
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({massage:"password wrong",error:getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY)})
        }   
    })
 
     
   }else{
       res.json({massage:"email is not register"})
   }

}

const getUsers = async (req,res)=>{
   let getUsers = await userModel.find({})
   res.json({massage:"done",getUsers})
}
const updateUser = async (req, res) => {
   const { id } = req.params;
   const { name } = req.body;
   const updateUser = await userModel.findByIdAndUpdate(id, { name },{new:true});
   res.status(200).json({ massage: "updated", updateUser });
 };

module.exports = {signUp,signIn,getUsers,updateUser}



//**************
 //encrypte decrypte



//  const userModel = require('../../../DB/Model/userModel');
//  const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode}=require("http-status-codes")
//  let CryptoJs = require('crypto-js')
//  const signUp = async(req,res)=>{
//     try {
//         let {name,username,email,password,cpassword,picurl}= req.body
//         if(password == cpassword){
//             let ciphertex = CryptoJs.AES.encrypt(password,process.env.SECRET_KEY).toString()
//             let adduser = await userModel.insertMany({name,username,email,password : ciphertex,picurl})
//             res.json({massage:"done",adduser})
//         }else{
//             res.status(StatusCodes.BAD_REQUEST).json({massage:"password not match"})
            
//         }
        
//     } catch (error) {
//         res.json({massage:"email already register",error})

//     }
//  }

//  const signIn = async(req,res)=>{
//     let {email,password}= req.body
//     let userFounded = await userModel.findOne({email})
//     if(userFounded){
//         let decryptData = CryptoJs.AES.decrypt(userFounded.password,process.env.SECRET_KEY).toString(CryptoJs.enc.Utf8)
  
//         if(decryptData == password){
//             res.json({massage:"welcome"})
//         }else{
//             res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({massage:"password wrong",error:getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY)})
//         }
//     }else{
//         res.json({massage:"email is not register"})
//     }

//  }

//  const getUsers = async (req,res)=>{
//     let getUsers = await userModel.find({})
//     res.json({massage:"done",getUsers})
//  }
//  const updateUser = async (req, res) => {
//     const { id } = req.params;
//     const { name } = req.body;
//     const updateUser = await userModel.findByIdAndUpdate(id, { name },{new:true});
//     res.status(200).json({ massage: "updated", updateUser });
//   };

//  module.exports = {signUp,signIn,getUsers,updateUser}
