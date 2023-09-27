const express=require("express");
const app=express();
const port=5000;

// file upload

const multer=require("multer");
const path=require("path");

// db

require("./config/conn");

// server static file
app.use(express.static("public"));
// midel ware for the handeling
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// file upload cord

var options=multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file.mimetype != 'image/jpeg')
        {
            return cb("InValid File Types.[Jpeg formate only]")
        }
        return cb(null,'./public/uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,(Math.random().toString(30)).slice(5, 10) + Date.now() + path.extname(file.originalname));
    }
})

var upload=multer({storage:options});



// endpoints
app.get("/",(req,res)=>{
    // res.send("Hello 2000");
    res.sendFile(path.join(__dirname,"view",'index.html'));
})

app.post("/register",upload.array('files',3),(req,res)=>{
    const { name, email } = req.body;
    const files = req.files.map(file => file.path);
    console.log(req.body);
    console.log(files);
    
    res.send("Register Done successfully!!");
})




app.listen(port,()=>{
    console.log(`Listening on  port ${port}`);
})

