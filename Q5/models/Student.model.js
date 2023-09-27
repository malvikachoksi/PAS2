// const mongoose=require("mongoose")
module.exports=mongoose=>{
    var schema = mongoose.Schema({
        user_id:mongoose.Schema.Types.ObjectId,
        name:String,
        standeard:String,
        gender:String,
        age:Number,
        city:String,
        email:String
    
    },
    {timestamps:true})

    const Student=mongoose.model("studentass",schema);
    return Student;
}