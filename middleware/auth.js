const {
    StatusCodes,
    
  } = require("http-status-codes");
  const jwt = require('jsonwebtoken');

const auth = ()=>{
    return (req,res,next)=>{
        const tokenHeader = req.headers['authorization']
        if (tokenHeader) {
            if (tokenHeader.startsWith("Bearer")) {
                const token = tokenHeader.split(" ")[1]
                const decoded = jwt.verify(token,process.env.JWTEMAIL)
                req.user = decoded.id
                next()

                
            }else{
                res.status(StatusCodes.BAD_REQUEST).json({massage:"token is invalied"})
            }
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({massage:"token is invalied"})
        }
    }
}
module.exports = auth