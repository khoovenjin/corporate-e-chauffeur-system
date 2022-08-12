import { ObjectId } from "bson";
import DutyList from "../models/DutyList.js";

const apiAddDuty = async (req, res) => {
    try {
        const chauffeur_Id = req.params.chauffeur_Id;

        const name = req.body.name;
        const phone = req.body.phone;
        const email = req.body.email;
        const url = req.body.url;
        const thumbnailURL = req.body.thumbnailURL;
        const vehicle_model = req.body.vehicle_model;
        const vehicle_no_plate = req.body.vehicle_no_plate;

        const image = {
            url: url,
            thumbnailURL: thumbnailURL
        }
        
        const vehicle = {
            vehicle_model: vehicle_model,
            vehicle_no_plate: vehicle_no_plate
        }

        const dutyDoc = { 
            chauffeur_Id: new ObjectId(chauffeur_Id),
            chauffeur_name: name,
            chauffeur_phone: phone,
            chauffeur_email: email,
            chauffeur_image: image,
            chauffeur_vehicle: vehicle
        }

        const duty = await DutyList.create(dutyDoc);

        let result = {}
        if(duty){
            result = { status: "success"}
        }else{
            result = { status: "failed"}
        }
  
        return res.json({ result: result, data: duty })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiDeleteDuty = async (req, res) => {
    try {
        const id = req.params.id

        const duty = await DutyList.deleteOne({
            _id: id
        });

        if(duty.deletedCount === 0){
            throw new Error(
                "unable to delete duty - duty id may not exists"
            )
        }

        res.json({ status: "success" })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export default {
    apiAddDuty,
    apiDeleteDuty
};