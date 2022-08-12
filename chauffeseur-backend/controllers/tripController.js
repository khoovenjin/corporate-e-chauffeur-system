import { ObjectId } from "bson"
import Trip from "../models/Trip.js";

const apiAddTrip = async (req, res) => {
    try {
        const passenger_Id = req.body.passenger_Id;
        const chauffeur_Id = req.body.chauffeur_Id;
        const corporate_Id = req.body.corporate_Id;
        const trip_detail = [];
        const trip_status = "Ontheway";
        const pick_up_address = req.body.pick_up_address;
        const destination_address = req.body.destination_address;
        const trip_distance = req.body.trip_distance;
        const trip_amount = req.body.trip_amount;
        const vehicle_model = req.body.vehicle_model;
        const vehicle_no_plate = req.body.vehicle_no_plate;
        const created_datetime = new Date();

        const trip_vehicle = {
            vehicle_model: vehicle_model,
            vehicle_no_plate: vehicle_no_plate
        }

        const trip_information = {
            pick_up_address: pick_up_address,
            destination_address: destination_address,
            trip_distance: trip_distance,
            trip_amount: trip_amount,
            trip_vehicle: trip_vehicle,
        };

        const tripDoc = { 
            passenger_Id: new ObjectId(passenger_Id),
            chauffeur_Id: new ObjectId(chauffeur_Id),
            corporate_Id: new ObjectId(corporate_Id),
            trip_detail: trip_detail,
            trip_status: trip_status,
            trip_information: trip_information,
            created_datetime: created_datetime
        }

        const trip = await Trip.Trip.create(tripDoc);

        let result = {}
        if(trip){
            result = { status: "success"}
        }else{
            result = { status: "failed"}
        }
  
        return res.json({ result: result, data: trip })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiGetTripByPassengerId = async (req, res) => {
    try{
        const passenger_Id = req.params.passenger_Id;

        const trip_distance = req.body.trip_distance;
        const trip_amount = req.body.trip_amount;
        const trip_status = "Ontheway";

        const trip = await Trip.Trip.find({
            "passenger_Id": passenger_Id,
            "trip_information.trip_distance": trip_distance,
            "trip_information.trip_amount": trip_amount,
            "trip_information.trip_status": trip_status
        });
            
        return res.json(trip);
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiGetTripById = async (req, res) => {
    try{
        const id = req.params.id;

        const trip = await Trip.Trip.findById(id);

        return res.json(trip);
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiGetTrips = async (req, res) => {
    try{
        const trips = await Trip.Trip.find();

        return res.json(trips);
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiUpdateTripAddGeolocation = async (req, res) => {
    try {
        const id = req.params.id;

        const latitude = req.body.latitude;
        const longitude = req.body.longitude;
        const trip_track_time = new Date();

        const trip_track_coordinate = {
            latitude: latitude,
            longitude: longitude
        };

        const trip_detail = {
            trip_track_time: trip_track_time,
            trip_track_coordinate: trip_track_coordinate
        }

        const result = await Trip.Trip.findById(id);
        if(!result){
            throw new Error(
                "unable to update trip info"
            )
        }

        const updated_info = {
            passenger_Id: result.passenger_Id,
            chauffeur_Id: result.chauffeur_Id,
            corporate_Id: result.corporate_Id,
            trip_detail: [...result.trip_detail, trip_detail],
            trip_status: result.trip_status,
            trip_information: result.trip_information,
            created_datetime: result.created_datetime
        }

        const updateResponse = await Trip.Trip.findByIdAndUpdate(id, updated_info)

        var { error } = updateResponse
        if (error) {
            res.status(400).json({ error })
        }

        const updateResult = await Trip.Trip.findById(id);

        res.json({ status: "success", data: updateResult })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiUpdateTripChangeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const trip_status = req.body.trip_status;

        const result = await Trip.Trip.findById(id);
        if(!result){
            throw new Error(
                "unable to update trip info"
            )
        }

        const updated_info = {
            passenger_Id: result.passenger_Id,
            chauffeur_Id: result.chauffeur_Id,
            corporate_Id: result.corporate_Id,
            trip_detail: result.trip_detail,
            trip_status: trip_status,
            trip_information: result.trip_information,
            created_datetime: result.created_datetime
        }

        const updateResponse = await Trip.Trip.findByIdAndUpdate(id, updated_info)

        var { error } = updateResponse
        if (error) {
            res.status(400).json({ error })
        }

        const updateResult = await Trip.Trip.findById(id);

        res.json({ status: "success", data: updateResult })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiDeleteTrip = async (req, res) => {
    try {
        const id = req.params.id

        const trip = await Trip.Trip.deleteOne({
            _id: id
        });

        if(trip.deletedCount === 0){
            throw new Error(
                "unable to delete trip - trip id may not exists"
            )
        }

        res.json({ status: "success" })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export default {
    apiAddTrip,
    apiGetTripById,
    apiGetTripByPassengerId,
    apiGetTrips,
    apiUpdateTripAddGeolocation,
    apiUpdateTripChangeStatus,
    apiDeleteTrip
};