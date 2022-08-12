import passengerController from "../controllers/passengerController.js";
import express from "express";
import auth from "../middleware/auth.js";

const {
    apiAddPassenger,
    apiGetPassengerById,
    apiGetPassengerByEmail,
    apiGetPassengers,
    apiUpdatePassengerAddConnection,
    apiUpdatePassengerAddTrip,
    apiUpdatePassengerDeleteConnection,
    apiUpdatePassengerSecurityProfile,
    apiUpdatePassengerSettingProfile,
    apiDeletePassenger
} = passengerController;

const passengerRouter = express.Router();

passengerRouter.post("/addPassenger", apiAddPassenger);

passengerRouter.get("/getPassenger/ById/:id", apiGetPassengerById);
passengerRouter.get("/getPassenger/ByEmail/:email", apiGetPassengerByEmail);
passengerRouter.get("/getPassengers", apiGetPassengers);

passengerRouter.put("/updatePassenger/AddCon/:id", apiUpdatePassengerAddConnection);
passengerRouter.put("/updatePassenger/AddTrip/:id", apiUpdatePassengerAddTrip);
passengerRouter.put("/updatePassenger/DeleteCon/:id", apiUpdatePassengerDeleteConnection);
passengerRouter.put("/updatePassenger/Security/:id", apiUpdatePassengerSecurityProfile);
passengerRouter.put("/updatePassenger/Setting/:id", apiUpdatePassengerSettingProfile);

passengerRouter.delete("/deletePassenger/:id", apiDeletePassenger);

export default passengerRouter;