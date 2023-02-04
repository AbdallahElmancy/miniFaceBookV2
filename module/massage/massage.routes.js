const route = require("express").Router()
const {addMassage,myMassage,allMassage} = require("./controller/massage.controller")
route.post("/addMassage/:sendto/:createdby",addMassage)
route.get("/myMassage/:id",myMassage)
route.get("/allMassage",allMassage)

module.exports= route