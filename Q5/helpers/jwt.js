const jwt=require("jsonwebtoken");
// const cookies=require("c")

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
  
    if (!token) {
      return res.sendStatus(401); // Unauthorized
    }
  
    jwt.verify(token, process.env.SECRET_KEY_JWT, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
  
      req.user = user;
      next();
    });
  };
  
  module.exports=authenticateJWT;

// .-------------------


// const jwt=require("jsonwebtoken");


// const authMiddleware=(req,res,next)=>{
//     try {

//         // console.log(req.header.authorization);
//         var authHeader = req.headers.authorization;
//         // const authHeader=req.headers["authorization"];
//         console.log("auth",authHeader);
//         const token= authHeader?.split(" ")[1];
//     // const token=req.body.token || req.query.token || req.headers['x-access-token'];
//     console.log("token",token);

//         if(!token)
//         {
//             return res.status(401).send({
//                 message:"Unauthorization access 1",
//                 success:false
//             });

//         }
//         else{

//             const tokenSecret=process.env.SECRET_KEY_JWT;
//             if(tokenSecret && token)
//             {
//                 jwt.verify(token, tokenSecret ,(err,user)=>{
//                     if(err)
//                       return res.status(401).send({success:false,message:err.message})
//                     req.user=user;
//                     next();
    
//                 })
//             }
//         }
//     } catch (error) {
        
//     return res.status(500).send({ error });
// }
// }

// module.exports=authMiddleware;


// const jwt=require("jsonwebtoken");

// const config=process.env;

// const verifyToken=(req,res,next)=>{
//     const token=req.body.token || req.query.token || req.headers['x-access-token'];
//     console.log(token);

//     if(!token)
//     {
//         return res.status(403).send("A token is required for authentication ")
//     }
//     try {
//         const decoded=jwt.verify(token,config.TOKEN_KEY);
//         req.user=decoded;
//     } catch (error) {
//             return res.status(401).send("Invalid token")
//     }   
//     return next();
// }

// module.exports=verifyToken;