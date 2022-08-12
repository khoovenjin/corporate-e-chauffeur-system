import client from './client';

const addOpenOTPEndPoint = '/api/openOTP/addOpenOTP/';
const getOpenOTPByPincodeEndPoint = '/api/openOTP/getOpenOTP/';
const deleteOpenOTPEndPoint = '/api/openOTP/deleteOpenOTP/';

addOpenOTP = (params, body) => client.post(`${addOpenOTPEndPoint}${params}`, body);
getOpenOTPByPincode = (params) => client.get(`${getOpenOTPByPincodeEndPoint}${params}`);
deleteOpenOTP = (params) => client.delete(`${deleteOpenOTPEndPoint}${params}`);

export default {
    addOpenOTP,
    getOpenOTPByPincode,
    deleteOpenOTP
};