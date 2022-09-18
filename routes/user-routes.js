const express = require("express");
const { check } = require("express-validator");

const userController = require("../controllers/user-controller");

const router = express.Router();

// router.get("/login", userController.loginPage);
// router.get("/signup", userController.signupPage);
// router.post(
//   "/login",
//   [check("email").isEmail(), check("password").isLength({ min: 6 })],
//   userController.login
// );

router.post(
  "/signup",
  [check("email").isEmail(), check("password").isLength({ min: 6 })],
  userController.signup
);

module.exports = router;
