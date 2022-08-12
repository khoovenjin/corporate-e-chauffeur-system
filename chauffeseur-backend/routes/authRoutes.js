import authController from "../controllers/authController.js";
import express from "express";
// import Joi from "joi";
// import validateWith from "../middleware/validation.js";

const {
    apiAuthenticateUser
} = authController;

// const schema = {
//   email: Joi.string().email().required(),
//   password: Joi.string().required().min(3),
// };

const authRouter = express.Router();

authRouter.post("/", apiAuthenticateUser);

export default authRouter;