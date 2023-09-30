const express = require('express');
const router = express.Router();
const studmodel=require("../models/studentmodel");

// Route to create a new data entry
router.post('/data', async (req, res) => {
  try {
    console.log("req",req.body);
      const newData = new studmodel(req.body); // Create a new instance of your model
      console.log("new",newData);
    const savedData = await newData.save(); // Save the data to MongoDB
    res.json(savedData); // Respond with the saved data
  } catch (error) {
    res.status(500).json({ error: 'Error creating data' });
  }
});

router.get("/fetch",(req,res)=>{
  studmodel.find({}).then((data)=>{
    // console.log(data);
    res.send(data);
  }).catch((err)=>{
    console.error(err);
  })
})


router.put("/update/:id",async(req,res)=>{
  console.log("id:-",req.params.id);
  // const id=req.params.id;
  const {newEmail,newName}=req.body;
  console.log("apo respo",req.body);
 const updatestud=await studmodel.findOneAndUpdate({ "_id": req.params.id },
   {username:newName , email:newEmail},
  { new: true })
  .then((data) => { 
    console.log(data);
    res.status(200).send(data); 
  })
  .catch((err) => {
      if (err) return res.status(500).send(
          "There was a problem updating.");
  })
});


router.delete("/:id", (req, res) => {
  //DELETE req.params.id deleteOne() deleteMany() findOneAndRemove()
  console.log("id:-",req.params.id);
  studmodel.findOneAndRemove({ "_id": req.params.id })
      .then((data) => {
          res.status(200).send(data);
      })
      .catch((err) => {
          if (err) return res.status(500).send(
              "There was a problem deleting.");
      })
});

module.exports = router;
