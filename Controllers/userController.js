const asyncHandler = require("express-async-handler");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("../models/userModel");

// @desc Register a user
// @route POST /api/users/register
// @access public
const register = asyncHandler(
    async (req,res)=>{
        const {username,email,password}=req.body;
        if (!username || !email || !password) {
            res.status(400);
            throw new Error("All fields are mandatory");
        }
        const userAvailable= await User.findOne({email});
        if(userAvailable){
            res.status(400);
            throw new Error("User Already Register!");
        }
        // Hash Password
        const hashedPassword = await bcrypt.hash(password,10);
        const user=await User.create(
            {
               username,
                email,
                password:hashedPassword,
            }
        );
        console.log(`User created ${user}`);
        if(user){
            res.status(201).json({_id:user.id,email:user.email});
        }else{
            res.status(400);
            throw new Error("User data us not valid");
        }
    }
)

// @desc Login a user
// @route POST /api/users/login
// @access public
const login = asyncHandler(
    async (req,res)=>{
        const {email,password} = req.body;
        if(!email||!password){
            res.status(400);
            throw new Error("All fields are mandatory!");
        }
        const userAvailable=await User.findOne({email});
        if(!userAvailable){
            res.status(400);
            throw new Error("Please register first!");
        }
        // compare password with hashedpassword
        const isMatch=await bcrypt.compare(password,userAvailable.password);
        if(userAvailable && isMatch){
            const acessToken=jwt.sign({
                user:{
                    username:userAvailable.username,
                    email:userAvailable.email,
                    id:userAvailable.id
                }
            },process.env.ACCESS_TOKEN_SECERT,
            {expiresIn:"15m"}
            );
            res.status(200).json({acessToken});
        }else{
            res.status(401);
            throw new Error('Invalid credentials!');
        }
    }
)

// @desc Current User info
// @route GET /api/users/current
// @access private - Authenticated users only
const currentUser=asyncHandler(
    async (req,res)=>{
        res.json(req.user);
    }
)

module.exports={register,login,currentUser};