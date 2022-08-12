import mongoose from "mongoose";
import config from "../config.js";

const OpenOTPSchema = new mongoose.Schema({
    corporate_Id: mongoose.Schema.Types.ObjectId,
    name: String,
    pincode: String,
    created_datetime: mongoose.Schema.Types.Date
})

const OpenOTP = mongoose.model(config.OPEN_OTP, OpenOTPSchema);

export default {
    OpenOTPSchema,
    OpenOTP
};