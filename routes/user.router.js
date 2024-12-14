const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register",[body("email").isEmail().withMessage("invalid email"),
    body("password").isLength().withMessage("invalid password"),
    body("fullname.firstname").isLength().withMessage("password should be atleast 3characters"),
],
  userController.registerUser
)

router.post("/login",[body("email").isEmail().withMessage("invalid email"),
  body("password").isLength().withMessage("invalid password"),
],
userController.loginUser
)

router.get("/profile",authMiddleware.authUser,userController.getUserProfile)

router.get("/logout",authMiddleware.authUser,userController.logoutUser);

module.exports = router;