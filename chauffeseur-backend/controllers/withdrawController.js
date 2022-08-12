import { ObjectId } from "bson";
import Withdraw from "../models/Withdraw.js";

const apiAddWithdraw = async (req, res) => {
    try {
        const chauffeur_Id = req.params.chauffeur_Id;

        const amount = req.body.amount;
        const created_datetime = new Date();

        const withdrawDoc = { 
            chauffeur_Id: new ObjectId(chauffeur_Id),
            amount: amount,
            created_datetime: created_datetime
        }

        const withdraw = await Withdraw.Withdraw.create(withdrawDoc);

        let result = {}
        if(withdraw){
            result = { status: "success"}
        }else{
            result = { status: "failed"}
        }
  
        return res.json({ result: result, data: withdraw })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
};

export default {
    apiAddWithdraw,
};