const Category = require("../models/Category");
const router = require("express").Router();

// http://localhost:9000/api/categories

router.get("/", async (request, response) => {
 try {
  const allCategory = await Category.find();
  response.status(200).json(allCategory);
 } catch (error) { response.status(500).json(error) }
})

// Make a new Category
router.post("/", async (request, response) => {
 try {
  const newCategory = new Category(request.body)
  const category = await newCategory.save()
  response.status(200).json(category);
 } catch (error) { response.status(500).json(error) }
})


module.exports = router;