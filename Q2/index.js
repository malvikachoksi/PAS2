const express=require("express");
const cookiepars=require("cookie-parser");
const sessions=require("express-session");
const cookieParser = require("cookie-parser");

const app=express();

app.use(sessions({
    secret:"taikhnnbwausyklnA",
    saveUninitialized:true,
    cookie:{},
    resave:false
}));
// 
app.use(express.json());
app.use(express.urlencoded({extended:true}))
// public static
app.use(express.static(__dirname));
// set cookie parames middelware
app.use(cookieParser());


//username and password
const myusername = 'user1'
const mypassword = 'mypassword'

// a variable to save a session
var session;

app.get("/",(req,res)=>{
    session=req.session;
    if(session.userid)
    {
        res.send("welcome user <a href=\'/logout'>click to logout</a>")
    }
    else{
        res.sendFile('./view/login.html',{root:__dirname});
    }
})

app.post('/user',(req,res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.send(`Hey there, welcome  <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
})

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});


app.listen(3000,()=>{
    console.log('login server listening on port 3000');
})