const mongoose = require("mongoose")

module.exports=()=>{
    const dbUrl="mongodb+srv://ibrahim:asd123@nodeblog.nhgj3tt.mongodb.net/?retryWrites=true&w=majority"
    mongoose.connect(dbUrl, {useUnifiedTopology: true , useNewUrlParser:true })
        .then((result)=>console.log("veri tabanına bağlanıldı"))
        .catch((err)=>console.log(err))

}