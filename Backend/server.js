import dotenv from "dotenv";
dotenv.config({path:"./.env"});
import app from "./app.js";
import mongoDBConnect from "./config/db.js";

process.on("uncaughtException",(err)=>{
    console.log(`Error ${err.message}`);
    console.log("Server is shutting down, due to uncaught exception errors");
    process.exit(1);
    
})
mongoDBConnect()
    let port = process.env.PORT || 8000;
    app.listen(port,()=>{
        console.log(`app is running on ${port} port`);      
    })


process.on("unhandledRejection",(err)=>{
    console.log("Error",err.message);
    console.log("Server is shutting down, due to unhandle promise rejection");
    server.close(()=>{
        process.exit(1);
    })
    
})


