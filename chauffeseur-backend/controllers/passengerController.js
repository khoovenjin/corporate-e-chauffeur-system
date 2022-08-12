import { ObjectId } from "bson"
import Passenger from "../models/Passenger.js";

const apiAddPassenger = async (req, res) => {
    try {
        const name = req.body.name;
        const phone = req.body.phone;
        const email = req.body.email;
        const password = req.body.password;
        const url = req.body.url;
        const thumbnailURL = req.body.thumbnailURL;
        const trips = [];
        const corp_con = [];

        const image = {
            url: url,
            thumbnailURL: thumbnailURL
        }

        const passengerDoc = { 
            name: name,
            phone: phone,
            email: email,
            password: password,
            image: image,
            trips: trips,
            corp_con: corp_con
        }

        const passenger = await Passenger.Passenger.create(passengerDoc);

        let result = {}
        if(passenger){
            result = { status: "success"}
        }else{
            result = { status: "failed"}
        }
  
        return res.json({
            result: result,
            data: passenger
        })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiGetPassengerById = async (req, res) => {
    try{
        const id = req.params.id;

        const passenger = await Passenger.Passenger.findById(id);

        return res.json(passenger);
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiGetPassengers = async (req, res) => {
    try {
        const passengers = await Passenger.Passenger.find();

        return res.json(passengers);
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
};

const apiGetPassengerByEmail = async (req, res) => {
    try{
        const email = req.params.email;

        const passenger = await Passenger.Passenger.find({ email: email });

        return res.json(passenger);
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiUpdatePassengerAddConnection = async (req, res) => {
    try {
        const passenger_Id = req.params.id;
        const corporate_Id = req.body.corporate_Id;
        const name = req.body.name;
        const pincode = req.body.pincode;
        const created_datetime = new Date();

        const corp_con = {
            corporate_Id: new ObjectId(corporate_Id),
            name: name,
            pincode: pincode,
            created_datetime: created_datetime
        };

        const result = await Passenger.Passenger.findById(passenger_Id);
        if(!result){
            throw new Error(
            "unable to update passenger info"
            )
        }

        const updated_info = {
            name: result.name,
            phone: result.phone,
            email: result.email,
            password: result.password,
            image: result.image,
            trips: result.trips,
            corp_con: [...result.corp_con, corp_con]
        }

        const updateResponse = await Passenger.Passenger.findByIdAndUpdate(passenger_Id, updated_info)

        var { error } = updateResponse
        if (error) {
            res.status(400).json({ error })
        }

        const updateResult = await Passenger.Passenger.findById(passenger_Id);

        res.json({ status: "success", data: updateResult })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiUpdatePassengerAddTrip = async (req, res) => {
    try {
        const passenger_Id = req.params.id;

        const chauffeur_Id = req.body.chauffeur_Id;
        const corporate_Id = req.body.corporate_Id;
        const trip_detail = req.body.trip_detail;
        const trip_status = req.body.trip_status;
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

        const trips = {
            passenger_Id: new ObjectId(passenger_Id),
            chauffeur_Id: new ObjectId(chauffeur_Id),
            corporate_Id: new ObjectId(corporate_Id),
            trip_detail: trip_detail,
            trip_status: trip_status,
            trip_information: trip_information,
            created_datetime: created_datetime
        }

        const result = await Passenger.Passenger.findById(passenger_Id);
        if(!result){
            throw new Error(
                "unable to update passenger info"
            )
        }

        const updated_info = {
            name: result.name,
            phone: result.phone,
            email: result.email,
            password: result.password,
            image: result.image,
            trips: [...result.trips, trips],
            corp_con: result.corp_con,
        }

        const updateResponse = await Passenger.Passenger.findByIdAndUpdate(passenger_Id, updated_info)

        var { error } = updateResponse
        if (error) {
            res.status(400).json({ error })
        }

        const updateResult = await Passenger.Passenger.findById(passenger_Id);

        res.json({ status: "success", data: updateResult })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiUpdatePassengerSettingProfile = async (req, res) => {
    try {
        const passenger_Id = req.params.id;

        const name = req.body.name;
        const phone = req.body.phone;
        const email = req.body.email;
        const url = req.body.url;
        const thumbnailURL = req.body.thumbnailURL;

        const image = {
            url: url,
            thumbnailURL: thumbnailURL
        }

        const result = await Passenger.Passenger.findById(passenger_Id);
        if(!result){
            throw new Error(
                "unable to update passenger info"
            )
        }

        const updated_info = {
            name: name,
            phone: phone,
            email: email,
            password: result.password,
            image: image,
            trips: result.trips,
            corp_con: result.corp_con,
        }

        const updateResponse = await Passenger.Passenger.findByIdAndUpdate(passenger_Id, updated_info)

        var { error } = updateResponse
        if (error) {
            res.status(400).json({ error })
        }

        const updateResult = await Passenger.Passenger.findById(passenger_Id);

        res.json({ status: "success", data: updateResult })
    } catch (e) {
        return res.status(500).json({ error: e.message, data: updateResult })
    }
}

const apiUpdatePassengerSecurityProfile = async (req, res) => {
    try {
        const passenger_Id = req.params.id;

        const password = req.body.password;

        const result = await Passenger.Passenger.findById(passenger_Id);
        if(!result){
            throw new Error(
                "unable to update passenger info"
            )
        }

        const updated_info = {
            name: result.name,
            phone: result.phone,
            email: result.email,
            password: password,
            image: result.image,
            trips: result.trips,
            corp_con: result.corp_con,
        }

        const updateResponse = await Passenger.Passenger.findByIdAndUpdate(passenger_Id, updated_info)

        var { error } = updateResponse
        if (error) {
            res.status(400).json({ error })
        }

        const updateResult = await Passenger.Passenger.findById(passenger_Id);

        res.json({ status: "success", data: updateResult })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiUpdatePassengerDeleteConnection = async (req, res) => {
    try {
        const passenger_Id = req.params.id;

        const name = req.body.name;
        const pincode = req.body.pincode;

        const result = await Passenger.Passenger.findById(passenger_Id);
        if(!result){
            throw new Error(
                "unable to update passenger info"
            )
        }

        const corp_con = result.corp_con.filter((elem)=>{
            return !(elem.name === name && elem.pincode === pincode);
        });

        const updated_info = {
            name: result.name,
            phone: result.phone,
            email: result.email,
            password: result.password,
            image: result.image,
            trips: result.trips,
            corp_con: corp_con
        }

        const updateResponse = await Passenger.Passenger.findByIdAndUpdate(passenger_Id, updated_info)

        var { error } = updateResponse
        if (error) {
            res.status(400).json({ error })
        }

        const updateResult = await Passenger.Passenger.findById(passenger_Id);

        res.json({ status: "success", data: updateResult })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiDeletePassenger = async (req, res) => {
    try {
        const passenger_Id = req.params.id

        const passenger = await Passenger.Passenger.deleteOne({
            _id: passenger_Id
        });

        if(passenger.deletedCount === 0){
            throw new Error(
                "unable to delete passenger account - user id may not exists"
            )
        }

        res.json({ status: "success" })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export default {
    apiAddPassenger,
    apiGetPassengerById,
    apiGetPassengerByEmail,
    apiGetPassengers,
    apiUpdatePassengerAddConnection,
    apiUpdatePassengerAddTrip,
    apiUpdatePassengerDeleteConnection,
    apiUpdatePassengerSecurityProfile,
    apiUpdatePassengerSettingProfile,
    apiDeletePassenger
};