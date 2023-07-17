const express=require('express');
const router=express.Router();
const {register,login, currentUser}=require("../Controllers/userController");
const validateToken=require("../middleware/validateTokenHandler")

router.post("/register",register);
router.post("/login",login);
router.get("/current",validateToken,currentUser);

module.exports = router;