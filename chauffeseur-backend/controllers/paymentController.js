import { ObjectId } from "bson";
import Payment from "../models/Payment.js";

const apiAddPayment = async (req, res) => {
    try {
        const corporate_Id = req.params.corporate_Id;

        const amount = req.body.amount;
        const created_datetime = new Date();

        const paymentDoc = {
            corporate_Id: new ObjectId(corporate_Id),
            amount: amount,
            created_datetime: created_datetime
        }

        const payment = await Payment.Payment.create(paymentDoc);

        let result = {}
        if(payment){
            result = { status: "success"}
        }else{
            result = { status: "failed"}
        }
  
        return res.json({ result: result, data: payment })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

export default {
    apiAddPayment
};