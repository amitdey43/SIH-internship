import express from "express"
import { avaToken, createMentor, forgotMentorPasword, loginMentor, resetForgotMentorPassword } from "../controller/mentor.controller.js";
import { upload } from "../utilis/coludinary.js";
const router= express.Router();

router.route("/register").post(upload.single("profilePic"),createMentor);
router.route("/login").post(loginMentor);
router.route("/forgot-password").post(forgotMentorPasword);
router.route("/reset-password/:token").post(resetForgotMentorPassword);
router.route("/check").get(avaToken);
export default router;