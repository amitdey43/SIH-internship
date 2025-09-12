import express from "express"
import { avaToken, createMentor, forgotMentorPasword, loginMentor, resetForgotMentorPassword, sendMentor } from "../controller/mentor.controller.js";
import { upload } from "../utilis/coludinary.js";
import { IsLoggedin } from "../middleware/isLoggedin.js";
const router= express.Router();

router.route("/register").post(upload.single("profilePic"),createMentor);
router.route("/login").post(loginMentor);
router.route("/forgot-password").post(forgotMentorPasword);
router.route("/reset-password/:token").post(resetForgotMentorPassword);
router.route("/check").get(avaToken);
router.route("/dashboard").get(IsLoggedin,sendMentor);
export default router;