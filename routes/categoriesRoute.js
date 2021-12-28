const express = require("express");

// Import Controller
const categoriesController = require("../controllers/categoriesController");
const router = express.Router();

router
  .route("/")
  .post(categoriesController.createCategory)
  .get(categoriesController.getAllCategories);
router
  .route("/:id")
  .delete(categoriesController.deleteCategory)
  .get(categoriesController.getCategory)
  .patch(categoriesController.updateCategory);
module.exports = router;
