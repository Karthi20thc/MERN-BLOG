const Post = require("../models/Post");

const router = require("express").Router();


// http://localhost:9000/api/post

// create post
router.post("/", async (request, response) => {
 const newPost = new Post(request.body);
 try {
  const post = await newPost.save();
  response.status(200).json(post)
 } catch (error) { response.status(500).json(error) }
})

// Get post by PostId
router.get("/:postId", async (request, response) => {
 try {
  const post = await Post.findById(request.params.postId);
  response.status(200).json(post)
 } catch (error) { response.status(500).json(error) }

})

// Get all post by category name and all post by user.
router.get("/", async (request, response) => {
 const username = request.query.user;
 const categoryname = request.query.category;

 try {
  let post;
  if (username) {
   post = await Post.find({ username: username })
  }
  else if (categoryname) {
   post = await Post.find({ categories: { $in: categoryname } })
  }
  else {
   post = await Post.find()
  }
  response.status(200).json(post)
 } catch (error) { response.status(500).json(error) }

})

// update post
router.put("/:postId", async (request, response) => {
 try {
  // 1
  const post = await Post.findById(request.params.postId);
  // 2
  if (request.body.username === post.username) {
   try {
    const updatedpost = await Post.findByIdAndUpdate(request.params.postId, { $set: request.body }, { new: true });
    response.status(200).json(updatedpost);
   } catch (error) { response.status(500).json(error) }
  } else {
   response.status(401).json("You can only update your post")
  }
 } catch (error) { response.status(500).json(error) }
})


// Delete Post 
router.delete("/:postId", async (request, response) => {
 try {
  // 1
  const post = await Post.findById(request.params.postId);
  // 2
  if (request.body.username === post.username) {
   try {
    await post.delete();
    response.status(200).json("Post has been deleted...");
   } catch (error) { response.status(500).json(error) }
  } else {
   response.status(401).json("You can delete only your post")
  }
 } catch (error) { response.status.json(error) }
})
module.exports = router;