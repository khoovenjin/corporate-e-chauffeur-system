import { ObjectId } from "bson";
import OpenOTP from "../models/OpenOTP.js";

const apiAddOpenOTP = async (req, res) => {
    try {
        const corporate_Id = req.params.corporate_Id;

        const name = req.body.name;
        const pincode = req.body.pincode;
        const created_datetime = new Date();

        const openOTPDoc = { 
            corporate_Id: new ObjectId(corporate_Id),
            name: name,
            pincode: pincode,
            created_datetime: created_datetime
        }

        const openOTP = await OpenOTP.OpenOTP.create(openOTPDoc);

        let result = {}
        if(openOTP){
            result = { status: "success"}
        }else{
            result = { status: "failed"}
        }
  
        return res.json({ result: result, data: openOTP })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiGetOpenOTPByPincode = async (req, res) => {
    try{
        const pincode = req.params.pincode;

        const openOTP = await OpenOTP.OpenOTP.find({ pincode: pincode });

        return res.json(openOTP);
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiDeleteOpenOTP = async (req, res) => {
    try {
        const id = req.params.id

        const openOTP = await OpenOTP.OpenOTP.deleteOne({
            _id: id,
        });

        if(openOTP.deletedCount === 0){
            throw new Error(
                "unable to delete openOTP - openOTP id may not exists"
            )
        }

        res.json({ status: "success" })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export default {
    apiAddOpenOTP,
    apiGetOpenOTPByPincode,
    apiDeleteOpenOTP
};