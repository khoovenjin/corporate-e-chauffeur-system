import openOTPController from "../controllers/openOTPController.js";
import express from "express";

const {
    apiAddOpenOTP,
    apiGetOpenOTPByPincode,
    apiDeleteOpenOTP
} = openOTPController;

const openOTPRouter = express.Router();

openOTPRouter.post("/addOpenOTP/:corporate_Id", apiAddOpenOTP);
openOTPRouter.get("/getOpenOTP/:pincode", apiGetOpenOTPByPincode);
openOTPRouter.delete("/deleteOpenOTP/:id", apiDeleteOpenOTP);

export default openOTPRouter;