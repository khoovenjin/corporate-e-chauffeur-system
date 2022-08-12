import mongoose from "mongoose";
import Trip from './Trip.js';
import Withdraw from './Withdraw.js';
import config from "../config.js";

const ChauffeurSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    password: String,
    image: {
        url: String,
        thumbnailURL: String
    },
    vehicle: {
        vehicle_model: String,
        vehicle_no_plate: String
    },
    trips: [
        Trip.TripSchema
    ],
    withdrawal: [
        Withdraw.WithdrawSchema
    ]
})

const Chauffeur = mongoose.model(config.CHAUFFEUR, ChauffeurSchema);

export default Chauffeur;