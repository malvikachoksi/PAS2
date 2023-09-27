const db=require("../models");

const User=db.user;
// console.log("user",User);

const jwt=require("jsonwebtoken");
const crypto=require("crypto-js")


exports.signup=async(req,res)=>{
    var {first_name,last_name,phoneno,password}=req.body;

        var users;
        var passwordData=password
        var encryptedPassword=crypto.AES.encrypt(passwordData,process.env.PASSWORD_KEY).toString();
        const PhonenoAvailability={phoneno:phoneno};
        const getUserPhoneo=await User.findOne(PhonenoAvailability);


        if(getUserPhoneo == null)
        {
            users=new User({
                first_name:first_name,
                last_name:last_name,
                phoneno:phoneno,
                password:encryptedPassword,
            })
            users
             .save(users)
             .then((data)=>{
                const token=jwt.sign(
                    {id:data._id , email:data.email},
                    process.env.SECRET_KEY_JWT
                );

                const newData={
                    id:data._id,
                    first_name:first_name,
                    last_name:last_name,
                    phoneno:phoneno,
                    token:token
                }

                // console.log("data",data);
                // console.log("ne",newData);
                // res.status(200).send({
                //     message:"User signup successfully",
                //     success:true,
                //     data:newData,
                // });
                res.render("signup",{data:newData});
                res.redirect("/");
    
             })
             .catch((err)=>{
                // res.status(400).send({
                //     success:false,
                //     message:"some error occure while create user"
                // })
                res.render("signup",{message:err})
             })
        }
        else{
            res.status(400).send({
                success:false,
                message:"phone number already exist"
            })
        }
}

exports.signinWithPhoneno=async(req,res)=>{
    const  {phoneno,password}=req.body

    var condition={
        phoneno:phoneno
    }
    // console.log(condition);

    await User.findOne(condition)
    .then((data)=>{
        // console.log(data);
        if(data.phoneno == null)
        {
            //  res.status(400).send({
            //     message:"phoeno is not register",
            //     success:false
            //  })
            res.render("login",{data:"phoneno is not register"})

        }
        else{
            var decryptPassword=crypto.AES.decrypt(data.password,process.env.PASSWORD_KEY).toString(crypto.enc.Utf8);
            console.log(decryptPassword);

            if(decryptPassword == password)
            {
                const token=jwt.sign(
                    {
                        id:data._id,
                    },
                    process.env.SECRET_KEY_JWT
                )
                    console.log(token);
                const newData={
                    id:data._id,
                    token:token
                }

                // res.status(200).send({
                //     message:"Login user successfully",
                //     success:true,
                //     data:newData
                // })
                res.cookie('token', token);
                res.render("login",{data:newData})
                // res.redirect("/api/student/get-student")
                // res.redirect("/");


            }
            else{
                // res.status(200).send({
                //     message:"Password incorrect",
                //     success:true,
                //     data:newData
                // })
                res.render("login",{data:newData})


            }
        }

    })
    .catch((err)=>{
        res.status(400).send({
            message:"Phoneno is not correct"
        })
    })
}