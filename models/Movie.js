const mongoose = require("mongoose")

const Schema = mongoose.Schema

const MovieSchema = new Schema({
    title:{
        type:String,
        required:[true,"`{PATH}` alanı zorunlu"],
        maxLength:[15,"{PATH} -- ({VALUE}) en fazla  , ({MAXLENGTH}) karakter girebilirsiniz"],
        minLength:[2,"{PATH} -- ({VALUE}) en az  , ({MINLENGTH}) karakter girebilirsiniz"]

    },
    category:{
        type:String,
        maxLength: 30,
        minLength: 1
    },
    country:{
        type:String,
        maxLength: 30,
        minLength: 1
    },
    year:{
        type:Number,
        max:2040,
        min:1900
    },
    imdb_score:{
        type:Number,
        max: 10,
        min: 0
    },
    director_id:Schema.Types.ObjectId,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("movie",MovieSchema)