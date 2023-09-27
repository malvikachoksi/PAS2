// // const express=require("express");
// // const mongoose=require("mongoose");
// // const bodyParser = require("body-parser");
// // const ejs=require("ejs");
// // const path=require("path");
// // const app=express();
// // require("dotenv").config();
// const  PORT=process.env.PORT||2000;

// const express = require('express');
// const app = express();
// app.use(express.static('public'));
// app.set("view engine", "ejs")
// const path = require('path');
// // const url = 'mongodb+srv://krima2992:OJ1ObsphkBkXSgTA@mongoclusteer.9zeswxv.mongodb.net/test'
// const mongoose = require('mongoose');
// // const session=require('express-session');
// const dotenv = require('dotenv');
// dotenv.config();
// // const StudentRoutes=require('./routes/student.routes');
// require("./db/config");
// app.use('/', express.static(path.join(__dirname, 'static')))

// app.use(
//     express.urlencoded({ extended: true })
// );

// app.use(
//     express.json()
// );
// // app.use(express.json());
// // app.use(
// //     express.urlencoded({extended:false})
// // );
// // // app.use(bodyParser.urlencoded({extended:true}))
// // app.use(express.static("public"));
// // app.use("/",express.static(path.join(__dirname,'static')))
// // app.set("view engine","ejs");
// // const Student = db.student;

// // db connection

// const db=require("./models");
// db.mongoose.connect(db.url).then(()=>{
// console.log("Connection with database")
// })
// .catch((error)=>{
// console.log("Not connect with database",error);
// })

// // app.use(express.static("public"));
// app.get("/",(req,res)=>{
//     res.send("hello")
//     // console.log("get");
// })

// app.get('/a1',(res,err)=>{
//     res.render('./views/index.ejs')
// })
// // // routes
// // require("./routes/user.routes")(app);

// const Student = db.student;

// app.get('/students', async (req, res) => {
//     try {
//       const students = await Student.find();
//       res.render('index', { students });
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Error retrieving students');
//     }
//   });

// app.listen(PORT,()=>{
//     console.log(`Server satrt on port ${PORT} `);
// })

const express = require("express");
const app = express();
const ejs = require("ejs");
const PORT = process.env.PORT || 2000;
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieparser=require("cookie-parser")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());
app.use(express.static(__dirname));
// const prod_rount=require("./routes/prod_route");

app.set("view engine", "ejs");

const db = require("./models");
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connection with database");
  })
  .catch((error) => {
    console.log("Not connect with database", error);
  });

require("./routes/Student.routes")(app);
require("./routes/user.routes")(app);

app.get("/page",(req,res)=>{
  res.sendFile(__dirname + "./views/form.html");
})
app.get("/", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});
app.get("/create", (req, res) => {
  res.render("new");
});


const Student = db.student;

app.get("/edit/:id", async (req, res) => {
  // // console.log(req.params.id);
  // const id=req.params.id;
  // res.render("update",{data:id});
  try {
    const student = await Student.findById(req.params.id);
    console.log(student);
    res.render("update", { data: student });
  } catch (err) {
    console.error(err);
    res.status(404).send("Student not found");
  }
});

app.post("/edit/:id", async (req, res) => {
  try {
    console.log("upateid", req.body);
    const { name, age } = req.body;
    await Student.findByIdAndUpdate(req.params.id, { name, age });
    res.redirect("/api/student/get-student");
  } catch (err) {
    console.error(err);
    res.status(400).send("Error updating student");
  }
});

app.post("/delete/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    await Student.findByIdAndRemove(req.params.id);
    res.redirect("/api/student/get-student");
  } catch (err) {
    console.error(err);
    res.status(400).send("Error deleting student");
  }
});


app.listen(PORT, () => {
  console.log("server connectted");
});
