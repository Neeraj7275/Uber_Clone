const app = require("./app");


const http = require("http");
const server = http.createServer(app);


server.listen(process.env.PORT||4000,()=>{
    console.log(`server is listning on port ${process.env.PORT}`); 
})