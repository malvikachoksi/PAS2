module.exports=(app)=>{
    const route=require("express").Router();
    const student=require("../controllers/student.controller");

    const middleware=require("../helpers/jwt");
    route.post("/create-student",middleware,student.create);
    route.get("/get-student",middleware,student.getStudent);
    route.post("/delete-student",student.deletestudent);
    route.post("/update-student",student.updatestudent);

    app.use("/api/student",route);
}