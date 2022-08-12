import client from './client';

const addCorpEndPoint = '/api/corporate/addCorporate';

const getCorpByIdEndPoint = '/api/corporate/getCorporate/ById/';
const getCorpByEmailEndPoint = '/api/corporate/getCorporate/ByEmail/';
const getCorpsEndPoint = '/api/corporate/getCorporates';

const updateCorpAddOpenOTPEndPoint = '/api/corporate/updateCorporate/AddOpenOTP/';
const updateCorpDelOpenOTPEndPoint = '/api/corporate/updateCorporate/DeleteOpenOTP/';
const updateCorpAddTripEndPoint = '/api/corporate/updateCorporate/AddTrip/';
const updateCorpAddConEndPoint = '/api/corporate/updateCorporate/AddCon/';
const updateCorpDelConEndPoint = '/api/corporate/updateCorporate/DeleteCon/';
const updateCorpAddPaymentEndPoint = '/api/corporate/updateCorporate/AddPayment/';
const updateCorpSettingEndPoint = '/api/corporate/updateCorporate/Setting/';
const updateCorpSecurityEndPoint = '/api/corporate/updateCorporate/Security/';

const deleteCorpEndPoint = '/api/corporate/deleteCorporate/';

const addCorporate = (body) => client.post(addCorpEndPoint, body);

const getCorporateById = (params) => client.get(`${getCorpByIdEndPoint}${params}`);
const getCorporateByEmail = (params) => client.get(`${getCorpByEmailEndPoint}${params}`);
const getCorporates = () => client.get(getCorpsEndPoint);

const updateCorporateAddOpenOTP = (params, body) => client.put(`${updateCorpAddOpenOTPEndPoint}${params}`, body);
const updateCorporateAddPassengerConnection = (params, body) => client.put(`${updateCorpAddConEndPoint}${params}`, body);
const updateCorporateDeleteOpenOTP = (params, body) => client.put(`${updateCorpDelOpenOTPEndPoint}${params}`, body);
const updateCorporateAddTrip = (params, body) => client.put(`${updateCorpAddTripEndPoint}${params}`, body);
const updateCorporateDeletePassengerConnection = (params, body) => client.put(`${updateCorpDelConEndPoint}${params}`, body);
const updateCorporateAddPayment = (params, body) => client.put(`${updateCorpAddPaymentEndPoint}${params}`, body);
const updateCorporateSettingProfile = (params, body) => client.put(`${updateCorpSettingEndPoint}${params}`, body);
const updateCorporateSecurityProfile = (params, body) => client.put(`${updateCorpSecurityEndPoint}${params}`, body);

const deleteCorporate = (params) => client.delete(`${deleteCorpEndPoint}${params}`);

export default {
    addCorporate,
    getCorporateById,
    getCorporateByEmail,
    getCorporates,
    updateCorporateAddOpenOTP,
    updateCorporateAddPassengerConnection,
    updateCorporateDeleteOpenOTP,
    updateCorporateAddTrip,
    updateCorporateDeletePassengerConnection,
    updateCorporateAddPayment,
    updateCorporateSettingProfile,
    updateCorporateSecurityProfile,
    deleteCorporate
};