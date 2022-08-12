import { ObjectId } from "bson"
import Corporate from "../models/Corporate.js";

const apiAddCorporate = async (req, res) => {
    try {
        const name = req.body.name;
        const phone = req.body.phone;
        const email = req.body.email;
        const password = req.body.password;
        const url = req.body.url;
        const thumbnailURL = req.body.thumbnailURL;
        const open_otp = [];
        const passenger_list = [];
        const trips = [];
        const bulk_payment = [];

        const image = {
            url: url,
            thumbnailURL: thumbnailURL
        }

        const corporateDoc = { 
            name: name,
            phone: phone,
            email: email,
            password: password,
            image: image,
            open_otp: open_otp,
            passenger_list: passenger_list,
            trips: trips,
            bulk_payment: bulk_payment
        }

        const corporate = await Corporate.create(corporateDoc);

        let result = {}
        if(corporate){
            result = { status: "success"}
        }else{
            result = { status: "failed"}
        }
  
        return res.json({ result: result, data: corporate })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiGetCorporateById = async (req, res) => {
    try{
        const id = req.params.id;

        const corporate = await Corporate.findById(id);

        return res.json(corporate);
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiGetCorporates = async (req, res) => {
    try {
        const corporates = await Corporate.find();

        return res.json(corporates);
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
};

const apiGetCorporateByEmail = async (req, res) => {
    try{
        const email = req.params.email;

        const corporate = await Corporate.find({ email: email });

        return res.json(corporate);
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiUpdateCorporateAddOpenOTP = async (req, res) => {
    try {
        const corporate_Id = req.params.id;
        const name = req.body.name;
        const pincode = req.body.pincode;
        const created_datetime = new Date();

        const open_otp = {
            corporate_Id: new ObjectId(corporate_Id),
            name: name,
            pincode: pincode,
            created_datetime: created_datetime
        };

        const result = await Corporate.findById(corporate_Id);
        if(!result){
            throw new Error(
                "unable to update corporate info"
            )
        }

        const updated_info = {
            name: result.name,
            phone: result.phone,
            email: result.email,
            password: result.password,
            image: result.image,
            open_otp: [...result.open_otp, open_otp],
            passenger_list: result.passenger_list,
            trips: result.trips,
            bulk_payment: result.bulk_payment
        }

        const updateResponse = await Corporate.findByIdAndUpdate(corporate_Id, updated_info)

        var { error } = updateResponse
        if (error) {
            res.status(400).json({ error })
        }

        const updateResult = await Corporate.findById(corporate_Id);

        res.json({ status: "success", data: updateResult })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiUpdateCorporateDeleteOpenOTP = async (req, res) => {
    try {
        const corporate_Id = req.params.id;

        const name = req.body.name;
        const pincode = req.body.pincode;

        const result = await Corporate.findById(corporate_Id);
        if(!result){
            throw new Error(
                "unable to update corporate info"
            )
        }

        const open_otp = result.open_otp.filter((elem)=>{
            return !(elem.name === name && elem.pincode === pincode);
        });

        const updated_info = {
            name: result.name,
            phone: result.phone,
            email: result.email,
            password: result.password,
            image: result.image,
            open_otp: open_otp,
            passenger_list: result.passenger_list,
            trips: result.trips,
            bulk_payment: result.bulk_payment
        }

        const updateResponse = await Corporate.findByIdAndUpdate(corporate_Id, updated_info)

        var { error } = updateResponse
        if (error) {
            res.status(400).json({ error })
        }

        const updateResult = await Corporate.findById(corporate_Id);

        res.json({ status: "success", data: updateResult })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiUpdateCorporateAddTrip = async (req, res) => {
    try {
        const corporate_Id = req.params.id;

        const passenger_Id = req.body.passenger_Id;
        const chauffeur_Id = req.body.chauffeur_Id;
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

        const result = await Corporate.findById(corporate_Id);
        if(!result){
            throw new Error(
                "unable to update Corporate info"
            )
        }

        const updated_info = {
            name: result.name,
            phone: result.phone,
            email: result.email,
            password: result.password,
            image: result.image,
            open_otp: result.open_otp,
            passenger_list: result.passenger_list,
            trips: [...result.trips, trips],
            bulk_payment: result.bulk_payment
        }

        const updateResponse = await Corporate.findByIdAndUpdate(corporate_Id, updated_info)

        var { error } = updateResponse
        if (error) {
            res.status(400).json({ error })
        }

        const updateResult = await Corporate.findById(corporate_Id);

        res.json({ status: "success", data: updateResult })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiUpdateCorporateAddPassengerConnection = async (req, res) => {
    try {
        const corporate_Id = req.params.id;

        const passenger_Id = req.body.passenger_Id;
        const name = req.body.name;
        const phone = req.body.phone;
        const email = req.body.email;
        const url = req.body.url;
        const thumbnailURL = req.body.thumbnailURL;
        const created_datetime = new Date();

        const passenger_list = {
            passenger_Id: new ObjectId(passenger_Id),
            name: name,
            phone: phone,
            email: email,
            image: {
                url: url,
                thumbnailURL: thumbnailURL
            },
            created_datetime: created_datetime
        }

        const result = await Corporate.findById(corporate_Id);
        if(!result){
            throw new Error(
                "unable to update Corporate info"
            )
        }

        const updated_info = {
            name: result.name,
            phone: result.phone,
            email: result.email,
            password: result.password,
            image: result.image,
            open_otp: result.open_otp,
            passenger_list: [...result.passenger_list, passenger_list],
            trips: result.trips,
            bulk_payment: result.bulk_payment
        }

        const updateResponse = await Corporate.findByIdAndUpdate(corporate_Id, updated_info)

        var { error } = updateResponse
        if (error) {
            res.status(400).json({ error })
        }

        const updateResult = await Corporate.findById(corporate_Id);

        res.json({ status: "success", data: updateResult })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiUpdateCorporateDeletePassengerConnection =  async (req, res) => {
    try {
        const corporate_Id = req.params.id;

        const _id = req.body._id;

        const result = await Corporate.findById(corporate_Id);
        if(!result){
            throw new Error(
                "unable to update corporate info"
            )
        }

        const passenger_list = result.passenger_list.filter((elem)=>{
            return elem._id.toString() !== _id;
        });

        const updated_info = {
            name: result.name,
            phone: result.phone,
            email: result.email,
            password: result.password,
            image: result.image,
            open_otp: result.open_otp,
            passenger_list: passenger_list,
            trips: result.trips,
            bulk_payment: result.bulk_payment
        }

        const updateResponse = await Corporate.findByIdAndUpdate(corporate_Id, updated_info)

        var { error } = updateResponse
        if (error) {
            res.status(400).json({ error })
        }

        const updateResult = await Corporate.findById(corporate_Id);

        res.json({ status: "success", data: updateResult })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiUpdateCorporateAddPayment = async (req, res) => {
    try {
        const corporate_Id = req.params.id;

        const amount = req.body.amount;
        const created_datetime = new Date();

        const bulk_payment = {
            corporate_Id: new ObjectId(corporate_Id),
            amount: amount,
            created_datetime: created_datetime
        };

        const result = await Corporate.findById(corporate_Id);
        if(!result){
            throw new Error(
                "unable to update corporate info"
            )
        }

        const updated_info = {
            name: result.name,
            phone: result.phone,
            email: result.email,
            password: result.password,
            image: result.image,
            open_otp: result.open_otp,
            passenger_list: result.passenger_list,
            trips: result.trips,
            bulk_payment: [...result.bulk_payment, bulk_payment]
        }

        const updateResponse = await Corporate.findByIdAndUpdate(corporate_Id, updated_info)

        var { error } = updateResponse
        if (error) {
            res.status(400).json({ error })
        }

        const updateResult = await Corporate.findById(corporate_Id);

        res.json({ status: "success", data: updateResult })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiUpdateCorporateSettingProfile = async (req, res) => {
    try {
        const corporate_Id = req.params.id;

        const name = req.body.name;
        const phone = req.body.phone;
        const email = req.body.email;
        const url = req.body.url;
        const thumbnailURL = req.body.thumbnailURL;

        const image = {
            url: url,
            thumbnailURL: thumbnailURL
        }

        const result = await Corporate.findById(corporate_Id);
        if(!result){
            throw new Error(
                "unable to update corporate info"
            )
        }

        const updated_info = {
            name: name,
            phone: phone,
            email: email,
            password: result.password,
            image: image,
            open_otp: result.open_otp,
            passenger_list: result.passenger_list,
            trips: result.trips,
            bulk_payment: result.bulk_payment
        }

        const updateResponse = await Corporate.findByIdAndUpdate(corporate_Id, updated_info)

        var { error } = updateResponse
        if (error) {
            res.status(400).json({ error })
        }

        const updateResult = await Corporate.findById(corporate_Id);

        res.json({ status: "success", data: updateResult })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiUpdateCorporateSecurityProfile = async (req, res) => {
    try {
        const corporate_Id = req.params.id;

        const password = req.body.password;

        const result = await Corporate.findById(corporate_Id);
        if(!result){
            throw new Error(
                "unable to update corporate info"
            )
        }

        const updated_info = {
            name: result.name,
            phone: result.phone,
            email: result.email,
            password: password,
            image: result.image,
            open_otp: result.open_otp,
            passenger_list: result.passenger_list,
            trips: result.trips,
            bulk_payment: result.bulk_payment
        }

        const updateResponse = await Corporate.findByIdAndUpdate(corporate_Id, updated_info)

        var { error } = updateResponse
        if (error) {
            res.status(400).json({ error })
        }

        const updateResult = await Corporate.findById(corporate_Id);

        res.json({ status: "success", data: updateResult })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiDeleteCorporate = async (req, res) => {
    try {
        const corporate_Id = req.params.id

        const corporate = await Corporate.deleteOne({
            _id: corporate_Id
        });

        if(corporate.deletedCount === 0){
            throw new Error(
                "unable to delete corporate account - user id may not exists"
            )
        }

        res.json({ status: "success" })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export default {
    apiAddCorporate,
    apiGetCorporateById,
    apiGetCorporateByEmail,
    apiGetCorporates,
    apiUpdateCorporateAddOpenOTP,
    apiUpdateCorporateDeleteOpenOTP,
    apiUpdateCorporateAddTrip,
    apiUpdateCorporateAddPassengerConnection,
    apiUpdateCorporateDeletePassengerConnection,
    apiUpdateCorporateAddPayment,
    apiUpdateCorporateSettingProfile,
    apiUpdateCorporateSecurityProfile,
    apiDeleteCorporate
};