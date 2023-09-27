const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/olymics', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("conncet with databse");
}).catch((error) => {
    console.log(error);
});

// const storage = multer.diskStorage({
//     destination: './public/uploads/',
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });
const storage = multer.memoryStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
}); // Store files as buffers in memory

const upload = multer({ storage });

app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// MongoDB schema and model setup
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    avatar: String
    // avatar: Buffer

});

const User = mongoose.model('User', UserSchema);

// Routes
app.get('/', (req, res) => {
    res.render('index');
});
// upload.array('files',3)
app.post('/register', upload.single('avatar'), async (req, res) => {
    const { username, email } = req.body;
    // const imageupoloadd=req.files.map((file)=>{
    //     filename:file.originalname
    // })
    // console.log(imageupoloadd);
    // const collection=new Collection({image:imageupoloadd});
    // await collection.save();
    // console.log(collection);
    const newUser = new User({
        username,
        email,
        avatar: req.file.originalname,
    });
    // console.log(req.file);
    // ----------------

    // const avatarPath = req.file ? req.file.path : null;
    // const avatarPath = req.files ? `/uploads/${req.file.filename}` : null; // Construct the image URL
    // const avatarPath=req.files.map(file => file.filename);
    // console.log(avatarPath);
    // singal
    // const avatarBuffer = req.file ? req.file.buffer : null; // Get the image buffer
    // ----------------
    // mutipal
    // const avatarBuffers = req.files.map(file => file.buffer); // Get an array of image buffers

    // const newUsers = avatarBuffers.map(buffer => ({
    //     username,
    //     email,
    //     avatar: buffer
    // }));
    // await User.insertMany(newUser);





    await newUser.save();
    res.send('Registration successful!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
