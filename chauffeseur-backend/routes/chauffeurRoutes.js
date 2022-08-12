import chauffeurController from "../controllers/chauffeurController.js";
import express from "express";
import auth from "../middleware/auth.js";

const {
    apiAddChauffeur,
    apiGetChauffeurById,
    apiGetChauffeurByEmail,
    apiGetChauffeurs,
    apiUpdateChauffeurAddTrip,
    apiUpdateChauffeurAddWithdrawal,
    apiUpdateChauffeurSettingProfile,
    apiUpdateChauffeurSecurityProfile,
    apiDeleteChauffeur
} = chauffeurController;

const chauffeurRouter = express.Router();

chauffeurRouter.post("/addChauffeur", apiAddChauffeur);

chauffeurRouter.get("/getChauffeur/ById/:id", apiGetChauffeurById);
chauffeurRouter.get("/getChauffeur/ByEmail/:email", apiGetChauffeurByEmail);
chauffeurRouter.get("/getChauffeurs", apiGetChauffeurs);

chauffeurRouter.put("/updateChauffeur/AddTrip/:id", apiUpdateChauffeurAddTrip);
chauffeurRouter.put("/updateChauffeur/AddWithdrawal/:id", apiUpdateChauffeurAddWithdrawal);
chauffeurRouter.put("/updateChauffeur/Setting/:id", apiUpdateChauffeurSettingProfile);
chauffeurRouter.put("/updateChauffeur/Security/:id", apiUpdateChauffeurSecurityProfile);

chauffeurRouter.delete("/deleteChauffeur/:id", apiDeleteChauffeur);

export default chauffeurRouter;