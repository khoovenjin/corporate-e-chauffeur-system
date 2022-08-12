import corporateController from "../controllers/corporateController.js";
import express from "express";
import auth from "../middleware/auth.js";

const {
    apiAddCorporate,
    apiGetCorporateById,
    apiGetCorporateByEmail,
    apiGetCorporates,
    apiUpdateCorporateAddOpenOTP,
    apiUpdateCorporateAddPassengerConnection,
    apiUpdateCorporateDeleteOpenOTP,
    apiUpdateCorporateAddTrip,
    apiUpdateCorporateDeletePassengerConnection,
    apiUpdateCorporateAddPayment,
    apiUpdateCorporateSettingProfile,
    apiUpdateCorporateSecurityProfile,
    apiDeleteCorporate
} = corporateController;

const corporateRouter = express.Router();

corporateRouter.post("/addCorporate", apiAddCorporate);

corporateRouter.get("/getCorporate/ById/:id", apiGetCorporateById);
corporateRouter.get("/getCorporate/ByEmail/:email", apiGetCorporateByEmail);
corporateRouter.get("/getCorporates", apiGetCorporates);

corporateRouter.put("/updateCorporate/AddOpenOTP/:id", apiUpdateCorporateAddOpenOTP);
corporateRouter.put("/updateCorporate/DeleteOpenOTP/:id", apiUpdateCorporateDeleteOpenOTP);
corporateRouter.put("/updateCorporate/AddTrip/:id", apiUpdateCorporateAddTrip);
corporateRouter.put("/updateCorporate/AddCon/:id", apiUpdateCorporateAddPassengerConnection);
corporateRouter.put("/updateCorporate/DeleteCon/:id", apiUpdateCorporateDeletePassengerConnection);
corporateRouter.put("/updateCorporate/AddPayment/:id", apiUpdateCorporateAddPayment);
corporateRouter.put("/updateCorporate/Setting/:id", apiUpdateCorporateSettingProfile);
corporateRouter.put("/updateCorporate/Security/:id", apiUpdateCorporateSecurityProfile);

corporateRouter.delete("/deleteCorporate/:id", apiDeleteCorporate);


export default corporateRouter;