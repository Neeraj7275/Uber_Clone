const userModel = require("../models/user.model");
const userServices= require("../services/user.service");
const {validationResult} = require("express-validator");
const blacklistModel = require("../models/blacklistToken.model");

// dekh bhai jo validation result se (mtlb ki user.router vali file se jo kux bhi error aayega jaise ki invalid email or less character in firstname or less character in password) req me milega jo ki niche register vali function me likha gya hai


module.exports.registerUser = async (req,res,next)=>{
     const errors = validationResult(req)
     if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
     }

     const {fullname,email,password} = req.body;
     const user = await userServices.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password
     })

     const token = user.genrateToken();
     res.status(200).json({user,token})
}

module.exports.loginUser =  async (req,res,next)=>{
   const errors = validationResult(req)
   if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
   }

   const {email,password} = req.body;
  
   const user = await userModel.findOne({email});
   if(!user){
      return res.status(400).json({msg: "user not found"});
   }

   const isMatchPassword = await user.comparePassword(password);
   if(!isMatchPassword){
      return res.status(400).json({msg: "invalid password password is incorrect"});
   }

   const token = user.genrateToken();

   res.status(200).json({user,token})
}

module.exports.getUserProfile = async (req,res,next)=>{
   res.status(200).json(req.user)
}

module.exports.logoutUser = async (req,res,next)=>{
   res.clearCookie("token");
   const token = req.cookies("token");
   await blacklistModel.create({token:token});
   res.status(200).json({msg:"logout User"});
}