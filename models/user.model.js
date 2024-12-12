const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fullname:{
        firstname: {
            type: String,
            required:true,
            minlength:[3,"first name should be atleast 3 characters long"]
        },
        lastname:{
            type: String,
            minlength:[3,"first name should be atleast 3 characters long"]
        }
    },
    email:{
        type: String,
        required:true,
    },
    password:{
        type: String,
        required:true,
        // select false har bar password ko show nhi hone deta hai
        select:false ,
        minlength:[3,"first name should be atleast 3 characters long"]
    },
    socketId:{
        type:String
    }
})

userSchema.methods.genrateToken = ()=>{
    return jwt.sign({_id:this._id},process.env.tokensecret)
}

userSchema.methods.comparePassword = async ()=>{
    return await bcrypt.compare(password,this.password)
}

userSchema.statics.hashPassword = async ()=>{
    return await bcrypt.hash(password,10)
}

module.exports = mongoose.model("user",userSchema)