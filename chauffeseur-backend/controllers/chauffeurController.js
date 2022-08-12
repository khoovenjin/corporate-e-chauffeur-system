import { ObjectId } from "bson"
import Chauffeur from "../models/Chauffeur.js";

const apiAddChauffeur = async (req, res) => {
    try {
        const name = req.body.name;
        const phone = req.body.phone;
        const email = req.body.email;
        const password = req.body.password;
        const url = req.body.url;
        const thumbnailURL = req.body.thumbnailURL;
        const vehicle_model = req.body.vehicle_model;
        const vehicle_no_plate = req.body.vehicle_no_plate;
        const trips = [];
        const withdrawal = [];

        const image = {
            url: url,
            thumbnailURL: thumbnailURL
        }
        
        const vehicle = {
            vehicle_model: vehicle_model,
            vehicle_no_plate: vehicle_no_plate
        }

        const chauffeurDoc = { 
            name: name,
            phone: phone,
            email: email,
            password: password,
            image: image,
            vehicle: vehicle,
            trips: trips,
            withdrawal: withdrawal
        }

        const chauffeur = await Chauffeur.create(chauffeurDoc);

        let result = {}
        if(chauffeur){
            result = { status: "success"}
        }else{
            result = { status: "failed"}
        }
  
        return res.json({ result: result, data: chauffeur })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiGetChauffeurById = async (req, res) => {
    try{
        const id = req.params.id;

        const chauffeur = await Chauffeur.findById(id);

        return res.json(chauffeur);
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiGetChauffeurs = async (req, res) => {
    try {
        const chauffeurs = await Chauffeur.find();

        return res.json(chauffeurs);
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
};

const apiGetChauffeurByEmail = async (req, res) => {
    try{
        const email = req.params.email;

        const chauffeur = await Chauffeur.find({ email: email });

        return res.json(chauffeur);
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiUpdateChauffeurAddWithdrawal = async (req, res) => {
    try {
        const chauffeur_Id = req.params.id;

        const amount = req.body.amount;
        const created_datetime = new Date();

        const withdrawal = {
            chauffeur_Id: new ObjectId(chauffeur_Id),
            amount: amount,
            created_datetime: created_datetime
        };
        
        const result = await Chauffeur.findById(chauffeur_Id);
        if(!result){
            throw new Error(
                "unable to update chauffeur info"
            )
        }

        const updated_info = {
            name: result.name,
            phone: result.phone,
            email: result.email,
            password: result.password,
            image: result.image,
            vehicle: result.vehicle,
            trips: result.trips,
            withdrawal: [...result.withdrawal, withdrawal],
        }

        const updateResponse = await Chauffeur.findByIdAndUpdate(chauffeur_Id, updated_info)

        var { error } = updateResponse
        if (error) {
            res.status(400).json({ error })
        }

        const updateResult = await Chauffeur.findById(chauffeur_Id);

        res.json({ status: "success", data: updateResult })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiUpdateChauffeurAddTrip = async (req, res) => {
    try {
        const chauffeur_Id = req.params.id;

        const passenger_Id = req.body.passenger_Id;
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

        const result = await Chauffeur.findById(chauffeur_Id);
        if(!result){
            throw new Error(
                "unable to update chauffeur info"
            )
        }

        const updated_info = {
            name: result.name,
            phone: result.phone,
            email: result.email,
            password: result.password,
            image: result.image,
            vehicle: result.vehicle,
            trips: [...result.trips, trips],
            withdrawal: result.withdrawal,
        }

        const updateResponse = await Chauffeur.findByIdAndUpdate(chauffeur_Id, updated_info)

        var { error } = updateResponse
        if (error) {
            res.status(400).json({ error })
        }

        const updateResult = await Chauffeur.findById(chauffeur_Id);

        res.json({ status: "success", data: updateResult })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiUpdateChauffeurSettingProfile = async (req, res) => {
    try {
        const chauffeur_Id = req.params.id;

        const name = req.body.name;
        const phone = req.body.phone;
        const email = req.body.email;
        const url = req.body.url;
        const thumbnailURL = req.body.thumbnailURL;

        const image = {
            url: url,
            thumbnailURL: thumbnailURL
        }

        const result = await Chauffeur.findById(chauffeur_Id);
        if(!result){
            throw new Error(
                "unable to update chauffeur info"
            )
        }

        const updated_info = {
            name: name,
            phone: phone,
            email: email,
            password: result.password,
            image: image,
            vehicle: result.vehicle,
            trips: result.trips,
            withdrawal: result.withdrawal,
        }

        const updateResponse = await Chauffeur.findByIdAndUpdate(chauffeur_Id, updated_info)

        var { error } = updateResponse
        if (error) {
            res.status(400).json({ error })
        }

        const updateResult = await Chauffeur.findById(chauffeur_Id);

        res.json({ status: "success", data: updateResult })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiUpdateChauffeurSecurityProfile = async (req, res) => {
    try {
        const chauffeur_Id = req.params.id;

        const password = req.body.password;

        const result = await Chauffeur.findById(chauffeur_Id);
        if(!result){
            throw new Error(
                "unable to update chauffeur info"
            )
        }

        const updated_info = {
            name: result.name,
            phone: result.phone,
            email: result.email,
            password: password,
            image: result.image,
            vehicle: result.vehicle,
            trips: result.trips,
            withdrawal: result.withdrawal,
        }

        const updateResponse = await Chauffeur.findByIdAndUpdate(chauffeur_Id, updated_info)

        var { error } = updateResponse
        if (error) {
            res.status(400).json({ error })
        }

        const updateResult = await Chauffeur.findById(chauffeur_Id);

        res.json({ status: "success", data: updateResult })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiDeleteChauffeur = async (req, res) => {
    try {
        const chauffeur_Id = req.params.id

        const chauffeur = await Chauffeur.deleteOne({
            _id: chauffeur_Id
        });

        if(chauffeur.deletedCount === 0){
            throw new Error(
                "unable to delete chauffeur account - user id may not exists"
            )
        }

        res.json({ status: "success" })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export default {
    apiAddChauffeur,
    apiGetChauffeurById,
    apiGetChauffeurByEmail,
    apiGetChauffeurs,
    apiUpdateChauffeurAddTrip,
    apiUpdateChauffeurAddWithdrawal,
    apiUpdateChauffeurSettingProfile,
    apiUpdateChauffeurSecurityProfile,
    apiDeleteChauffeur,
};