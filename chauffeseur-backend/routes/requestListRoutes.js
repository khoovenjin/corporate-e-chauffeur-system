import requestListController from "../controllers/requestListController.js";
import express from "express";

const {
    apiAddRequest,
    apiGetRequestFirstDocument,
    apiDeleteRequest
} = requestListController;
const requestListRouter = express.Router();

requestListRouter.post("/addRequest/:passenger_Id", apiAddRequest);
requestListRouter.get("/getRequest", apiGetRequestFirstDocument);
requestListRouter.delete("/deleteRequest/:id", apiDeleteRequest);

export default requestListRouter;