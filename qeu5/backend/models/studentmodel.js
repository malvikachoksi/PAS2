const mongoose=require("mongoose");

const studentsq5=new mongoose.Schema({
    username:String,
    email:String,
    password:String
});

const studentmodel=new mongoose.model("stud",studentsq5);

module.exports=studentmodel;