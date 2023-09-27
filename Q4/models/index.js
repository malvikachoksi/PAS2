const dbconfig=require("../db/config");

const mongoose=require("mongoose");
mongoose.Promise=global.Promise;

const db={};

db.mongoose=mongoose;
db.mongoose.set("strictQuery",false);

db.url=dbconfig.url;


// module routes 
db.user=require("./user.model")(mongoose);
db.student=require("./Student.model")(mongoose);


module.exports=db;