const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const jwt = require("jsonwebtoken");
app.use(express.static("public"));
// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
app.use(cors());

const stud = require("./models/studentmodel");

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  await stud
    .find({ username: username })
    .then((data) => {
      const token = jwt.sign(
        {
          id: data._id,
        },
        process.env.SECRATE_KEY
      );
      const newdata = {
        id:data._id,
        token: token,
      };
      // console.log(newdata, " tokn fetch",token);
      res.send(newdata);
      res.redirect("/backend/public/index.html")
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/login",async(req,res)=>{
  res.send("hello user")

})

const auth=require("./verify")
// // Define API routes
const apiRoutes = require("./routes/student");
app.use("/api",jwt.verify, apiRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
