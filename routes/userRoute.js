const express = require("express");

// Import Controller
const userController = require("../controllers/userController");
const router = express.Router();

router
  .route("/signup")
  .post(userController.signup)
  .get(userController.getAllUsers);
router.route("/login").post(userController.login);

module.exports = router;
