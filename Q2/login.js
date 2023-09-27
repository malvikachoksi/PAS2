const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const path = require('path');


const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "",
    database: "user"
})

app.use((req, res, next) => {
    console.log(req.method + " " + req);
    next();
});


app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: new fileStore({ path: "./session-data.js" })
}))

app.use(express.urlencoded({ extended: false }));


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'./login.html'));
})

app.post('/validate', (req, res) => {
    res.send("post url");
    res.end();
    // var username = req.body.username;
    // var password = req.body.password;
    // if (username && password) {
    //     connection.query('SELECT * FROM user where username= ? and password=?',[username,password],(err,result,fields)=>{
    //         if(result != null && result.length >0)
    //         {
    //             req.session.loggedin=true;
    //             req.session.username=username;
    //         }

    //     });
    // }
})


app.listen(2000, () => {
    console.log('server start on 2000 port');
})