import mongoose from "mongoose";
import config from "../config.js";

const PaymentSchema = new mongoose.Schema({
    corporate_Id: mongoose.Schema.Types.ObjectId,
    amount: mongoose.Schema.Types.Decimal128,
    created_datetime: mongoose.Schema.Types.Date,
})

const Payment = mongoose.model(config.PAYMENT, PaymentSchema);

export default {
    PaymentSchema,
    Payment
};