const express=require('express');
const router=express.Router();
const {register,login, currentUser}=require("../Controllers/userController");
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/current").get(currentUser);

module.exports = router;