let headerData = ["body","params","query"]
const validation = (schema)=>{
    return (req,res,next)=>{
        const errorList =[]
        headerData.forEach((key)=>{
            if(req[key]){
                const validateRe = schema[key].validate(req[key])
                if(validateRe.error){
                    errorList.push(validateRe.error)
                }
            }
        })
     
        if(errorList.length){
            res.json({massage:"there eroor validation:",errorList})
        }else{
            next()
        }
    }
}

module.exports = validation