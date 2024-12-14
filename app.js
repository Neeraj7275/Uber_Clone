const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();

const userRouter = require("./routes/user.router");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const dbconnection = require("./db/db");
dbconnection();

app.get("/",function(req,res){
    res.send("hello jee kaise hai");
})

app.use("/user",userRouter);

module.exports = app;