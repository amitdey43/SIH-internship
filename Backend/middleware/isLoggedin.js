import { hrModel } from "../models/hrModel.js";
import { mentorModel } from "../models/mentorModel.js";
import { userModel } from "../models/userModel.js";
import ApiError from "../utilis/ApiError.js";
import jwt from "jsonwebtoken";

export const IsLoggedin= async(req,res,next)=>{
    let {token} =req.cookies;
    if(token===""){
        return next(new ApiError(401,"You have to login first"));
    }
    const decoded= jwt.verify(token,process.env.JWT_SECRET);
    if(decoded.role==="Student"){
        let user= await userModel.findById(decoded.id);
        req.user= user;
    }
    if(decoded.role==="Mentor"){
        let mentor= await mentorModel.findById(decoded.id);
        req.user= mentor;
    }
    if(decoded.role==="HR"){
        let hr= await hrModel.findById(decoded.id);
        req.user= hr
    }
    next()
}