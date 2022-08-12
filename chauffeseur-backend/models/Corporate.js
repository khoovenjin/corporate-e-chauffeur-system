import mongoose from "mongoose";
import OpenOTP from "./OpenOTP.js";
import Trip from './Trip.js';
import Payment from './Payment.js';
import config from "../config.js";

const CorporateSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    password: String,
    image: {
        url: String,
        thumbnailURL: String
    },
    open_otp: [
        OpenOTP.OpenOTPSchema
    ],
    passenger_list: [
        {
            passenger_Id: mongoose.Schema.Types.ObjectId,
            name: String,
            phone: String,
            email: String,
            image: {
                url: String,
                thumbnailURL: String
            },
        }
    ],
    trips: [
        Trip.TripSchema
    ],
    bulk_payment: [
        Payment.PaymentSchema
    ]   
})

const Corporate = mongoose.model(config.CORPORATE, CorporateSchema);

export default Corporate;