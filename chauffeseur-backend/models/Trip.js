import mongoose from "mongoose";
import config from "../config.js";

const TripSchema = new mongoose.Schema({
    passenger_Id: mongoose.Schema.Types.ObjectId,
    chauffeur_Id: mongoose.Schema.Types.ObjectId,
    corporate_Id: mongoose.Schema.Types.ObjectId,
    trip_detail: [
        {
            trip_track_time: mongoose.Schema.Types.Date,
            trip_track_coordinate: {
                latitude: mongoose.Schema.Types.Decimal128,
                longitude: mongoose.Schema.Types.Decimal128
            }
        }
    ],
    trip_status: String,
    trip_information: {
        pick_up_address: {
            latitude: mongoose.Schema.Types.Decimal128,
            longitude: mongoose.Schema.Types.Decimal128
        },
        destination_address: {
            latitude: mongoose.Schema.Types.Decimal128,
            longitude: mongoose.Schema.Types.Decimal128
        },
        trip_distance: mongoose.Schema.Types.Decimal128,
        trip_amount: mongoose.Schema.Types.Decimal128,
        trip_vehicle: {
            vehicle_model: String,
            vehicle_no_plate: String
        }
    },
    created_datetime: mongoose.Schema.Types.Date
})

const Trip = mongoose.model(config.TRIP, TripSchema);

export default {
    TripSchema,
    Trip
};