import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import bodyParser from "body-parser";
import authRouter from "./routes/authRoutes.js";
import chauffeurRouter from "./routes/chauffeurRoutes.js";
import corporateRouter from "./routes/corporateRoutes.js";
import dutyListRouter from "./routes/dutyListRoutes.js";
import openOTPRouter from "./routes/openOTPRoutes.js";
import passengerRouter from "./routes/passengerRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import requestListRouter from "./routes/requestListRoutes.js";
import tripRouter from "./routes/tripRoutes.js";
import withdrawRouter from "./routes/withdrawRoutes.js";

const init = () => {
    const app = express();

    app.use(cors());
    app.use(express.static("public"));
    app.use(express.json());
    app.use(helmet());
    app.use(compression());

    //morgan used for logging HTTP requests to the console
    app.use(morgan("dev"));

    //bodyParser middleware used for resolving the req and res body objects (urlEncoded and json formats)
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use("/api/auth", authRouter);
    app.use("/api/chauffeur", chauffeurRouter);
    app.use("/api/corporate", corporateRouter);
    app.use("/api/dutyList", dutyListRouter);
    app.use("/api/openOTP", openOTPRouter);
    app.use("/api/passenger", passengerRouter);
    app.use("/api/payment", paymentRouter);
    app.use("/api/requestList", requestListRouter);
    app.use("/api/trip", tripRouter);
    app.use("/api/withdraw", withdrawRouter);

    return app;
};

export default init;