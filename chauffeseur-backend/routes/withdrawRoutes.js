import withdrawController from "../controllers/withdrawController.js";
import express from "express";

const {
    apiAddWithdraw
} = withdrawController;

const withdrawRouter = express.Router();

withdrawRouter.post("/addWithdraw/:chauffeur_Id", apiAddWithdraw);

export default withdrawRouter;