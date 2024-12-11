const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());

app.get("/",function(req,res){
    res.send("hello jee kaise hai");
})

module.exports = app;