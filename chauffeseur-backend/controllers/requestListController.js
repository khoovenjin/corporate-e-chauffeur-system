import { ObjectId } from "bson"
import RequestList from "../models/RequestList.js";

const apiAddRequest = async (req, res) => {
    try {
        const passenger_Id = req.params.passenger_Id;

        const name = req.body.name;
        const phone = req.body.phone;
        const email = req.body.email;
        const url = req.body.url;
        const thumbnailURL = req.body.thumbnailURL;

        const image = {
            url: url,
            thumbnailURL: thumbnailURL
        }

        const requestDoc = { 
            passenger_Id: new ObjectId(passenger_Id),
            passenger_name: name,
            passenger_phone: phone,
            passenger_email: email,
            passenger_image: image
        }

        const request = await RequestList.create(requestDoc);

        let result = {}
        if(request){
            result = { status: "success"}
        }else{
            result = { status: "failed"}
        }
  
        return res.json({ result: result, data: request })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiGetRequestFirstDocument = async (req, res) => {
    try {
        const request = await RequestList.findOne();

        return res.json(request);
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const apiDeleteRequest = async (req, res) => {
    try {
        const request_Id = req.params.id

        const request = await RequestList.deleteOne({
            _id: request_Id
        });

        if(request.deletedCount === 0){
            throw new Error(
                "unable to delete request - request id may not exists"
            )
        }

        res.json({ status: "success" })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export default {
    apiAddRequest,
    apiGetRequestFirstDocument,
    apiDeleteRequest
};