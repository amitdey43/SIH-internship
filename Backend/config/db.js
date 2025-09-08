import mongoose from "mongoose";

let mongoDBConnect= ()=>{
    try{
        mongoose.connect(`${process.env.MONGO_URL}/Internship`)
        .then((res)=> console.log(`MongoDB connect on ${res.connection.host}`));
    }catch(error){
        console.log("Cann't connect to MongoDB url");
    }
}

export default mongoDBConnect;