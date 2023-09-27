const { verify } = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const Student = db.student;

// const isAuthorizes=async(user)=>{
//     if(!user)
//     {
//         return false;
//     }
//     await user.find({_id:user.id}).then((verify)=>{
//         if(verify !==null)
//         {
//             return true
//         }
//         else{
//             return false
//         }
// })

// }

exports.create = async (req, res) => {
//   var { city, age, gender, standeard, name, email } = req.body; 
console.log(req.body);
  var {  age, name ,email} = req.body;

  //   const user=req.user;
  //   if (isAuthorizes(user) == false) {
  //     return res.status(401).send({
  //       success: false,
  //       message: "Unauthorized Access",
  //     });
  //   }
  var student;
  const EmailAvability = { email: email };
  // console.log(EmailAvability);

  const getEmail = await Student.findOne(EmailAvability);
  // console.log("getemail",getEmail);
  if (getEmail === null) {
    student = new Student({
      //   user_id:user.id,
      name: name,
    //   standeard: standeard,
    //   gender: gender,
      age: age,
    //   city: city,
      email: email,
    });

    // console.log("id",user.id);
    student
      .save(student)
      .then((data) => {
        console.log(data);
        // res.status(201).send({
        //   message: "Student Craete successfully",
        //   scuccess: true,
        //   data: data,
        // });
  return  res.render("new", { data: data });
        //  res.redirect("/api/student/get-student");
      })
      .catch((err) => {
        return res.render("new", { data: err });

        // res.status(400).send({
        //   message: "some error occure whill create student",
        //   success: false,
        //   error: err,
        // });
      });
  } else {
    res.status(400).send({
      success: false,
      message: "Email alreay exits",
    });
  }
};
// app.get('/students', async (req, res) => {
//     try {
//       const students = await Student.find();
//       res.render('students/index', { students });
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Error retrieving students');
//     }
//   });

exports.getStudent = async (req, res) => {
  const student = Student.find({})
    .then((data) => {
    //   console.log(data);
      if (data == []) {
        // return res.status(400).send({
        //   message: "Student not exits",
        //   success: false,
        //   data: {},
        // });
        return res.render("index", { data: {} });
      } else {
                res.render("index", { data: data });

        // res.status(200).send({
        //   message: "Student data fetch successfully",
        //   success: true,
        //   data: data,
        //   length: data.length,
        // });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving students");
      //   res.status(400).send({
      //     message: err,
      //     success: false,
      //   });
    });
};

exports.updatestudent = async (req, res) => {
//   var { student_id, email, city, age, gender, standeard, name } = req.body;
console.log(req.body);
var {id}=req.params.id;
  var { age,name } = req.body;

//   const id=req.params.id;
  console.log("id", id);

  await Student.findById({ _id: id})
    .then(async (data) => {
      if (data) {
        update = {
          name: name,
          email: email,
        //   city: city,
          age: age,
        //   gender: gender,
        //   standeard: standeard,
        };

        await Student.findByIdAndUpdate(req.params.id, update, {
          useFindAndModify: false,
        })
          .then((data) => {
            console.log("up",data);
            res.render("update",{data:data})
            // res.status(200).send({
            //   message: "Student Update successfully",
            //   success: true,
            //   data: update,
            // });
          })
          .catch((err) => {
            res.render("update",{data:err})
            // res.status(200).send({
            //   message: err,
            //   success: false,
            //   // data:data
            // });
          });
      } else {
        return res.status(400).send({
          message: "Student Update Not Proper",
          success: false,
          // data:data
        });
      }
    })
    .catch((err) => {
      res.status(200).send({
        message: err.message,
        success: false,
        // data:data
      });
    });
};

exports.deletestudent = async (req, res) => {
  var { student_id } = req.body;
  console.log("id", student_id);

  Student.findOne({ _id: student_id })
    .then(async (data) => {
      if (data) {
        await Student.deleteOne({ _id: student_id });
        res.status(200).send({
          message: "delete student successfully",
          success: true,
        });
      } else {
        res.status(200).send({
          message: " student is not avalabile",
          success: true,
        });
      }
    })
    .catch((err) => {
      res.send({
        message: err.message,
        success: false,
      });
    });
};
