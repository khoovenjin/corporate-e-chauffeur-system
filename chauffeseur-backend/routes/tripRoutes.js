import tripController from "../controllers/tripController.js";
import express from "express";

const {
    apiAddTrip,
    apiGetTripById,
    apiGetTripByPassengerId,
    apiGetTrips,
    apiUpdateTripAddGeolocation,
    apiUpdateTripChangeStatus,
    apiDeleteTrip
} = tripController;

const tripRouter = express.Router();

tripRouter.post("/addTrip", apiAddTrip);

tripRouter.get("/getTrip/ById/:id", apiGetTripById);
tripRouter.get("/getTrip/ByPassengerId/:passenger_Id", apiGetTripByPassengerId);
tripRouter.get("/getTrips", apiGetTrips);

tripRouter.put("/updateTrip/AddGeolocation/:id", apiUpdateTripAddGeolocation);
tripRouter.put("/updateTrip/ChangeStatus/:id", apiUpdateTripChangeStatus);

tripRouter.delete("/deleteTrip/:id", apiDeleteTrip);

export default tripRouter;