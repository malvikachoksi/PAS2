// const { mongoose } = require(".");

module.exports=mongoose=>{
    var schema=mongoose.Schema({
            first_name:String,
            last_name:String,
            phoneno:String,
            password:String,
    },
    {timestamps:true}
    )

    const User=mongoose.model("user",schema)

    return User;
}