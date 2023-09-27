const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/olymics').then(()=>{
    console.log('conncet with the database');
}).catch((err)=>{
console.log(err);
})