import mongoose from "mongoose";
import config from "../config.js";

const RequestListSchema = new mongoose.Schema({
    passenger_Id: mongoose.Schema.Types.ObjectId,
    passenger_name: String,
    passenger_phone: String,
    passenger_email: String,
    passenger_image: {
        url: String,
        thumbnailURL: String
    },
})

const RequestList = mongoose.model(config.REQUEST_LIST, RequestListSchema);

export default RequestList;