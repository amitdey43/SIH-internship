import { mentorModel } from "../models/mentorModel.js";
import asyncHandler from "../utilis/asyncHandler.js";
import sendToken from "../utilis/sendToken.js";
import ApiError from "../utilis/ApiError.js";
import { sendMAil } from "../utilis/sendMail.js";
import crypto from "crypto";
import jwt from "jsonwebtoken"
import { userModel } from "../models/userModel.js";
import { muModel } from "../models/mentorUser.js";

export const createMentor= asyncHandler(async(req,res,next)=>{
    let body= {...req.body};

      let email= body.email;
      const existing = await mentorModel.findOne({email });
       if (existing) {
        return next(new ApiError(400,"Email already registered"));
       }

    if(body.expertiseAreas && typeof(body.expertiseAreas)=="string"){
        try{
            body.expertiseAreas = JSON.parse(body.expertiseAreas);
        }catch(err){
            body.expertiseAreas = body.expertiseAreas.split(",").map(expert=>expert.trim());
        }
    }
    let mentor = await mentorModel.create({
        ...body,
        profilePic: req.file?.path || null,
    });

    sendToken(mentor,201,res);
})  
export const loginMentor = asyncHandler(async(req,res,next)=>{
  let {email,password}= req.body;
  let mentor= await mentorModel.findOne({email}).select("+password");
  if(!mentor){
    return next(new ApiError(400,"Email id or password is incorrect"));
  }
  let isCorrectPass= await mentor.verifyPassword(password)
  if(!isCorrectPass){
    return next(new ApiError(400,"Email id or password is incorrect"));
  }
  sendToken(mentor,201,res);
})

export const forgotMentorPasword= asyncHandler(async (req,res,next)=>{
  const {email}= req.body;
  let mentor= await mentorModel.findOne({email});
  if(!mentor){
    return next(new ApiError(400,"This mentor doesn't exist"));
  }
  let resetToken;
  try{
    resetToken = mentor.generateResetPasswordToken();
    await mentor.save({validateBeforeSave:false});
  }catch(err){
    mentor.resetPasswordToken= undefined;
    mentor.resetPasswordExpire= undefined;
    await mentor.save({validateBeforeSave:false});
    return next(new ApiError(500,"There is problem to generate your resettoken"));
  }
  let resetLink= `http://localhost:5173/reset-password/mentor/${resetToken}`;
  let message= `To Reset password click this link ${resetLink}\n\nThis link will expire in 30 minutes\n\nIf you did not request for resetting password Igonr this message`;
  try{
      await sendMAil({
        message,
        email,
        subject:"Request for Reset Password 🔑"
      })
      res.status(200).json({
        success:true,
        resetToken,
        message:"Reset password link, Check your email"
      })
  }catch(err){
      mentor.resetPasswordToken= undefined;
      mentor.resetPasswordExpire= undefined;
      await mentor.save({validateBeforeSave:false});
      return next(new ApiError(400,"There is a problem to send email to you, Try again later"));
  }
})

export const resetForgotMentorPassword = asyncHandler(async (req, res, next) => {
  let { token } = req.params;
  let tokenn = crypto.createHash("sha256").update(token).digest("hex");

  let mentor = await mentorModel.findOne({
    resetPasswordToken: tokenn,
    resetPasswordExpire: { $gt: new Date(Date.now()) },
  });

  if (!mentor) {
    return next(new ApiError(400, "Reset password link is Invalid or Expired"));
  }

  let { newpassword, confirmpassword } = req.body;
  if (newpassword !== confirmpassword) {
    return next(new ApiError(400, "Passwords do not match"));
  }

  mentor.password = newpassword;
  mentor.resetPasswordToken = undefined;
  mentor.resetPasswordExpire = undefined;

  await mentor.save({ validateBeforeSave: false });

  sendToken(mentor, 200, res);
});
export const avaToken = asyncHandler(async(req,res,next)=>{
  let {token} =req.cookies;
  const decoded= jwt.verify(token,process.env.JWT_SECRET);
  let {role}= decoded;
  res.status(200).json({
    token,
    role
  })
})

export const sendMentor = asyncHandler(async(req,res,next)=>{
  let mentor = await mentorModel.findById(req.user._id);
  let users= await userModel.find({mentorAssigned:req.user._id});
  let mu= await muModel.find({mentor:req.user._id}).populate("user");
  res.status(200).json({
    success:true,
    mentor,
    users,
    mu
  })
})
export const logoutMentor = asyncHandler(async (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});