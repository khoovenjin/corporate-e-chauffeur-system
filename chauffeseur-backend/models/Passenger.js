import mongoose from "mongoose";
import Trip from './Trip.js';
import OpenOTP from './OpenOTP.js';
import config from "../config.js";

const PassengerSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    password: String,
    image: {
        url: String,
        thumbnailURL: String
    },
    trips: [
        Trip.TripSchema
    ],
    corp_con: [
        OpenOTP.OpenOTPSchema
    ]
})

const Passenger = mongoose.model(config.PASSENGER, PassengerSchema);

export default {
    PassengerSchema,
    Passenger
};