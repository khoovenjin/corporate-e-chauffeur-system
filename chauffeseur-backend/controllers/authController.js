import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import Chauffeur from "../models/Chauffeur.js";
import Passenger from "../models/Passenger.js";
import Corporate from "../models/Corporate.js";

dotenv.config()

const apiAuthenticateUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        let user = [];
        
        if(role === "passenger") {
            user = await Passenger.Passenger.find({ email: email });
        } else if (role === "chauffeur") {
            user = await Chauffeur.find({ email: email });
        } else {
            user = await Corporate.find({ email: email });
        }
        
        const userObject = user[0];

        if (user.length === 0 || userObject.password !== password)
        return res.status(400).send({ error: "Invalid email or password." });

        const token = jwt.sign(
            { userId: userObject._id, name: userObject.name, email, role },
            process.env.AUTH_JWT_SECRET_KEY
        );
        res.send(token);
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
};

export default {
    apiAuthenticateUser
};