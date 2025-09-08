import express from "express"
import { createInternship, forgotHrPasword, getInternship, hrCreate, loginHr, resetForgotHrPassword } from "../controller/hr.controller.js";
import { IsLoggedin } from "../middleware/isLoggedin.js";

const router= express.Router();

router.route("/register").post(hrCreate);
router.route("/login").post(loginHr);
router.route("/forgot-password").post(forgotHrPasword);
router.route("/reset-password/:token").post(resetForgotHrPassword);
router.route("/create-internship").post(IsLoggedin,createInternship);
router.route("/get-internships").get(IsLoggedin,getInternship);


export default router;