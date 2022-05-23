const bcryptjs = require("bcryptjs");
const Post = require("../models/Post");
const User = require("../models/User");

const router = require("express").Router();

// http://localhost:9000/api/user

// get user by Id
router.get("/:userId", async (request, response) => {
 try {
  const user = await User.findById(request.params.userId);
  const { password, ...others } = user._doc;
  response.status(200).json(others)
 } catch (error) { response.status(500).json(error) }
})

// update user by userId  
router.put("/:userId", async (request, response) => {
 if (request.params.userId === request.body.userId) {
  // 1 
  if (request.body.password) {
   const salt = await bcryptjs.genSalt(10);
   request.body.password = await bcryptjs.hash(request.body.password, salt);
  }
  // 2 
  try {
   const updatedUser = await User.findByIdAndUpdate(request.params.userId, { $set: request.body }, { new: true })
   response.status(200).json(updatedUser);
  } catch (error) { response.status(500).json(error) }
 } else {
  response.status(401).json("you can only update your Account")
 }
})

// delete user by ID
router.delete("/:userId", async (request, response) => {
 if (request.params.userId === request.body.userId) {
  // first check if the user exists and then only delete the user and then delete his posts.
  try {
   const user = await User.findById(request.params.id);
   try {
    await User.findByIdAndDelete(request.params.userId);
    await Post.deleteMany({ username: user.username })
    response.status(200).json(`${user.username} has been deleted from this Application`)
   } catch (error) { response.status(500).json(error) }
  } catch (error) { response.status(200).json("user not Found") }

 } else { response.status(401).json("you can only delete you Account") }
})

module.exports = router;