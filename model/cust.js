const mongoose=require("mongoose");
const nodemon = require("nodemon");
const custschema=mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    state:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    

})
const cust =new mongoose.model("cust",custschema)
module.exports= cust;