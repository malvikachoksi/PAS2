module.exports=(app)=>{
    var router=require("express").Router();
    const user=require("../controllers/user.controller");

    router.post("/sign-up",user.signup);
    router.post("/sign-in",user.signinWithPhoneno);

    
    app.use("/api/user",router);
}