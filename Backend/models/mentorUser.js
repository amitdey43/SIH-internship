import mongoose from "mongoose";

let muSchema= new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  
        required: true
    },
    rate: {
        type: Number,
        min: 1,
        max: 5
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentor",
    },
    status: {
        type: String,
        default:"pending",
        enum: ["pending","active"]
    }
},{timestamps:true})


export const muModel = mongoose.model("MU",muSchema);