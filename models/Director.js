const mongoose = require("mongoose")
const Scheme=mongoose.Schema

const DirectorSchema = new Scheme ( {
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,

    },
    bio:{
        type:String,

    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("director",DirectorSchema)