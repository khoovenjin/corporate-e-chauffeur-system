import mongoose from "mongoose";
import config from "../config.js";

const DutyListSchema = new mongoose.Schema({
    chauffeur_Id: mongoose.Schema.Types.ObjectId,
    chauffeur_name: String,
    chauffeur_phone: String,
    chauffeur_email: String,
    chauffeur_image: {
        url: String,
        thumbnailURL: String
    },
    chauffeur_vehicle: {
        vehicle_model: String,
        vehicle_no_plate: String
    },
})

const DutyList = mongoose.model(config.DUTY_LIST, DutyListSchema);

export default DutyList;