const userModel = require("../models/user.model");
const userServices= require("../services/user.service");
const {validationResult} = require("express-validator");

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