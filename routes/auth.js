const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const router = require("express").Router();

// http://localhost:9000/api/auth

router.post("/register", async (request, response) => {
 const { username, email, password } = request.body;
 try {
  const salt = await bcryptjs.genSalt(10);
  const hashedPass = await bcryptjs.hash(password, salt);
  const newUser = new User({ username: username, email: email, password: hashedPass })
  const user = await newUser.save();

  response.status(200).json(user);

 } catch (error) { response.status(500).json(error) }
})

router.post("/login", async (request, response) => {
 const { username, password } = request.body;
 try {
  const foundUser = await User.findOne({ username: username })
  if (!foundUser) { return response.status(400).json("Wrong username or user doesnt exist") }

  const passValidation = await bcryptjs.compare(password, foundUser.password);
  // if (!passValidation) { response.status(400).json("Wrong password") } // not needed here because , if username is wrong , then the foundUser is null, so we cant compare the password, so is the username is exist and then the password is wrong, then only send response as wrond password.

  if (foundUser && passValidation === true) {
   const { password, ...others } = foundUser._doc
   response.status(200).json(others);
  }
  else {
   response.status(400).json("Wrong password")
  }
 } catch (error) { response.status(500).json(error) }
})

module.exports = router;