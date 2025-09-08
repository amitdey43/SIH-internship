import { hrModel } from "../models/hrModel.js";
import asyncHandler from "../utilis/asyncHandler.js";
import sendToken from "../utilis/sendToken.js";
import ApiError from "../utilis/ApiError.js";
import { sendMAil } from "../utilis/sendMail.js";
import crypto from "crypto"
import { internshipModel } from "../models/internShip.js";

export const hrCreate= asyncHandler(async(req,res,next)=>{
    const existing = await hrModel.findOne({email:req.body.email});
    if(existing){
        return next(new ApiError(400,"Email already registered"));
    }
    const hr= await hrModel.create(req.body);
    sendToken(hr,201,res);
})

export const loginHr = asyncHandler(async(req,res,next)=>{
  let {email,password}= req.body;
  let hr= await hrModel.findOne({email}).select("+password");
  if(!hr){
    return next(new ApiError(400,"Email id or password is incorrect"));
  }
  let isCorrectPass= await hr.verifyPassword(password)
  if(!isCorrectPass){
    return next(new ApiError(400,"Email id or password is incorrect"));
  }
  sendToken(hr,201,res);
})

export const forgotHrPasword= asyncHandler(async (req,res,next)=>{
  const {email}= req.body;
  let hr= await hrModel.findOne({email});
  if(!hr){
    return next(new ApiError(400,"This user doesn't exist"));
  }
  let resetToken;
  try{
    resetToken = hr.generateResetPasswordToken();
    await hr.save({validateBeforeSave:false});
  }catch(err){
    hr.resetPasswordToken= undefined;
    hr.resetPasswordExpire= undefined;
    await hr.save({validateBeforeSave:false});
    return next(new ApiError(500,"There is problem to generate your resettoken"));
  }
  let resetLink= `http://localhost:5173/reset-password/hr/${resetToken}`;
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
      hr.resetPasswordToken= undefined;
      hr.resetPasswordExpire= undefined;
      await hr.save({validateBeforeSave:false});
      return next(new ApiError(400,"There is a problem to send email to you, Try again later"));
  }
})

export const resetForgotHrPassword = asyncHandler(async(req,res,next)=>{
  let {token}= req.params;
  let tokenn= crypto.createHash("sha256").update(token).digest("hex");
  let hr = await hrModel.findOne({
    resetPasswordToken:tokenn,
    resetPasswordExpire:{$gt: new Date(Date.now())}
  })

  if(!hr){
    return next(new ApiError(400,"Reset password link is Invalid or Expire"));
  }
  let {newpassword,confirmpassword} = req.body;
  if(newpassword !== confirmpassword){
    return next(new ApiError(400,"Password doesn't match"));
  }
  hr.password= newpassword;
  hr.resetPasswordToken=undefined;
  hr.resetPasswordExpire=undefined;
  await hr.save({validateBeforeSave:false});
  sendToken(hr,200,res);
})

export const createInternship = asyncHandler(async(req,res,next)=>{
    req.body.createdBy= req.user.id;
    req.body.companyname= req.user.companyName;
    let internShip= await internshipModel.create(req.body);
    let hr= await hrModel.findById(req.user.id);
    hr.internshipsPosted=internShip._id;
    hr.save({validateBeforeSave:false});
    res.status(201).json({
      success: true,
      message: "Internship created successfully",
      internShip,
    });
})

export const getInternship= asyncHandler(async(req,res,next)=>{
    let internships= await internshipModel.find({createdBy:req.user.id});
    res.status(200).json({
      success:true,
      internships
    })
})