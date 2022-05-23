const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const cors = require("cors");


dotenv.config();
app.use(cors());
app.use(express.json());



// Database connection
mongoose.connect(process.env.MONGO_URL, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
}).then(() => { console.log("Database connection successful") }).catch((error) => console.log(error));

// image upload
const storage = multer.diskStorage({
 destination: (req, file, cb) => {
  cb(null, "images");
 },
 filename: (req, file, cb) => {
  cb(null, req.body.name);
 },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
 res.status(200).json("File has been uploaded");
});


// http://localhost:9000
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/images", express.static(path.join(__dirname, "/images")));

//  This must be always after the routes Mounting . Kind of wasted 2 days
app.use(express.static(path.join(__dirname, "/client/build")));
// For any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
 res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

// starting the server
const port = process.env.PORT || 9000;
app.listen(port, () => {
 console.log(`Sever is Running on the port: ${port}`)
})