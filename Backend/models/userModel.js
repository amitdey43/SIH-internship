import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto"

const appliedInternshipSchema = new mongoose.Schema({
  internship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Internship",
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "shortlisted", "rejected", "accepted"], // your choices
    default: "pending"
  }
});

let userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Student name is required"],
        trim:true,
        minLength: [3,"Name should contain atleast 3 character"],
    },
    email: {
        type: String,
        required: [true,"Student email is required"],
        trim:true,
        lowercase:true,
        validate: [validator.isEmail, "please enter valid email"],
        unique: true
    },
    password:{
        type: String,
        required: [true,"Please enter your password"],
        minLength: [6, "Password should be contain more than 6 character"],
        select: false,
    },
    profilePic:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        minlength: [10,"Phone number should be of 10 digit"],
        trim:true,
        maxlength: [15,"Phone number should be of 10 digit"], 
    },
    university: { 
        type: String, 
        trim:true,
        required: [true, "University name is required"]
    },
    degree: { 
        type: String, 
        trim:true,
        required: [true, "Some qualification is required"],
    }, 
    branch: { 
        type: String, 
        required: [true, "University branch name is required"],
    },
    yearOfStudy: { 
        type: Number, 
        required: [true, "Current study year is required"],
        max: [5, "Study year cannot be greater than 5"],
        min: [1, "Study year cannot be less than 1"],
    },
    cgpa: { 
        type: Number,
        required:[true, "CGPA is required"],
        min: [1, "Study year cannot be less than 1"],
    },
    skills: {
        type:[String],
        required:[true, "Please enter your skills"],
    },
    projects: [{
        title: String,
        description: String,
        technologies: [String],
        link: String
    }],
    resume:{
        type:String,
        required: [true, "Please upload your resume"]
    },
    linkedIn: {
         type: String
    },
    github: { 
        type: String 
    },
    portfolio: { 
        type: String 
    },
    prefferedDomain: {
        type: [String],
        required: [true, "Preffered domain is required"]
    },
    appliedInterships: [appliedInternshipSchema],
    mentorAssigned: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentor" 
    },
    role: { 
        type: String, 
        default: "Student" ,
        enum: ["Student","Mentor","HR"],
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date 
},{timestamps:true});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password= await bcrypt.hash(this.password,10);
})

userSchema.methods.getJWTToken= function(){
    return jwt.sign({id:this._id,role:this.role},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}
userSchema.methods.verifyPassword= async function(oldpassword){
    return await bcrypt.compare(oldpassword,this.password)
}

userSchema.methods.generateResetPasswordToken= function(){
    let resetToken= crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken= crypto.createHash("sha256").update(resetToken).digest('hex');
    this.resetPasswordExpire= new Date(Date.now()+30*60*1000)
    return resetToken;
}

export let userModel= mongoose.model("User",userSchema);