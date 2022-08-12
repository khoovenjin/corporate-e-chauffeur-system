import paymentController from "../controllers/paymentController.js";
import express from "express";

const {
    apiAddPayment
} = paymentController;

const paymentRouter = express.Router();

paymentRouter.post("/addPayment/:corporate_Id", apiAddPayment);

export default paymentRouter;