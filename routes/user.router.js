const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const userController = require("../controllers/user.controller");

router.post("/register",[body("email").isEmail().withMessage("invalid email"),
    body("password").isLength().withMessage("invalid password"),
    body("fullname.firstname").isLength().withMessage("password should be atleast 3characters"),
],
  userController.registerUser
)

module.exports = router;