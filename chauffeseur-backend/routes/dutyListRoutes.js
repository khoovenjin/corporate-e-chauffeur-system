import dutyListController from "../controllers/dutyListController.js";
import express from "express";

const {
    apiAddDuty,
    apiDeleteDuty
} = dutyListController;

const dutyListRouter = express.Router();

dutyListRouter.post("/addDuty/:chauffeur_Id", apiAddDuty);
dutyListRouter.delete("/deleteDuty/:id", apiDeleteDuty);

export default dutyListRouter;