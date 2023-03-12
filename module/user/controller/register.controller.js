const userRegisterModel = require("../../../DB/model/userModel/userRegister.model");
const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const sendEmail = require("../../../middleware/sendEmail")

let registerContoller = async (req, res) => {
  try {
    let { username, email, password, phone } = req.body;
    let isFounded = await userRegisterModel.findOne({ email });
    if (isFounded) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          massage: "email is found",
          error: getReasonPhrase(StatusCodes.BAD_REQUEST),
        });
    } else {
      let newUser = new userRegisterModel({ username, email, password, phone });
      let addUser = await newUser.save();
      const token = jwt.sign({ email: email }, process.env.JWTEMAIL);
      sendEmail(email,`<h1>hello</h1><a href = '${process.env.HREFEMAIL}${token}'>button here to confirm</a>`)
      res.status(StatusCodes.ACCEPTED).json({ massage: "added", addUser });
    }
  } catch (error) {
    res
      .status(StatusCodes.BAD_GATEWAY)
      .json({
        massage: "found error",
        error,
        stutsReason: getReasonPhrase(StatusCodes.BAD_GATEWAY),
      });
  }
};
const signInContoller = async (req, res) => {
  try {
    let { email, password } = req.body;
    let isFounded = await userRegisterModel.findOne({ email });
    if (isFounded) {
      bcrypt.compare(password, isFounded.password, function (err, result) {
        if (result) {
          const token = jwt.sign({ id: isFounded._id }, process.env.JWTEMAIL);

          res
            .status(StatusCodes.ACCEPTED)
            .json({ massage: "token", token });
        } else {
          res
            .status(StatusCodes.BAD_REQUEST)
            .json({
              massage: "password is wrong",
              err,
              StutsErr: getReasonPhrase(StatusCodes.BAD_REQUEST),
            });
        }
      });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          massage: "email is not found",
          err,
          StutsErr: getReasonPhrase(StatusCodes.BAD_REQUEST),
        });
    }
  } catch (error) {
    res
      .status(StatusCodes.BAD_GATEWAY)
      .json({
        massage: "found error",
        error,
        stutsReason: getReasonPhrase(StatusCodes.BAD_GATEWAY),
      });
  }
};
const confirmEmail = async(req,res)=>{
try {

  let {token} =req.params
  const decoded = jwt.verify(token, process.env.JWTEMAIL);
  let {email} =decoded

  let emailFound = await  userRegisterModel.findOne({email})
  if (emailFound) {
    if (emailFound.isConfirm) {
      res.status(StatusCodes.BAD_REQUEST).json({massage:"email have confirmed",stutasErr:getReasonPhrase(StatusCodes.BAD_REQUEST)})
    }else{
      emailFound.isConfirm = true
      let confirmUpdate = await userRegisterModel.findOneAndUpdate({email},{isConfirm:emailFound.isConfirm},{new:true})
      res.status(StatusCodes.BAD_REQUEST).json({massage:"email confirmed",confirmUpdate})
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({massage:"email is not register",stutasErr:getReasonPhrase(StatusCodes.BAD_REQUEST)})
  }
} catch (error) {
  res
  .status(StatusCodes.BAD_GATEWAY)
  .json({
    massage: "found error",
    error,
    stutsReason: getReasonPhrase(StatusCodes.BAD_GATEWAY),
  });
}
}

module.exports = { registerContoller, signInContoller,confirmEmail };
