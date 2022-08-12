import mongoose from "mongoose";
import config from "../config.js";

const WithdrawSchema = new mongoose.Schema({
    chauffeur_Id: mongoose.Schema.Types.ObjectId,
    amount: mongoose.Schema.Types.Decimal128,
    created_datetime: mongoose.Schema.Types.Date
})

const Withdraw = mongoose.model(config.WITHDRAW, WithdrawSchema);

export default {
    WithdrawSchema,
    Withdraw
};