const express = require("express");

// Import Controller
const productsController = require("../controllers/productsController");
const router = express.Router();

router
  .route("/")
  .post(productsController.createProducts)
  .get(productsController.getAllProducts);
router
  .route("/:id")
  .get(productsController.getProduct)
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);

// Product Count
router.route("/get/count").get(productsController.productCount);
// Featured Product
router.route("/get/featured/:count").get(productsController.featuredProduct);

module.exports = router;
