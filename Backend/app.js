import express from "express";
import { midError } from "./middleware/error.js";
import userRouter from "./route/user.route.js";
import mentorRouter from "./route/mentor.route.js"
import hrRouter from "./route/hr.route.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import { hrCreate } from "./controller/hr.controller.js";

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/app/mentor",mentorRouter);
app.use("/app/user",userRouter);
app.use("/app/hr",hrRouter);
app.use(midError);

export default app;