import client from './client';

const addPassEndPoint = '/api/passenger/addPassenger';

const getPassByIdEndPoint = '/api/passenger/getPassenger/ById/';
const getPassByEmailEndPoint = '/api/passenger/getPassenger/ByEmail/';
const getPassEndPoint = '/api/passenger/getPassengers';

const updatePassAddConEndPoint = '/api/passenger/updatePassenger/AddCon/';
const updatePassAddTripEndPoint = '/api/passenger/updatePassenger/AddTrip/';
const updatePassDelConEndPoint = '/api/passenger/updatePassenger/DeleteCon/';
const updatePassSecurityEndPoint = '/api/passenger/updatePassenger/Security/';
const updatePassSettingEndPoint = '/api/passenger/updatePassenger/Setting/';

const deletePassEndPoint = '/api/passenger/deletePassenger/';

const addPassenger = (body) => {
    return client.post(addPassEndPoint, body);
};

const getPassengerById = (params) => {
    return client.get(`${getPassByIdEndPoint}${params}`)
};
const getPassengerByEmail = (params) => {
    return client.get(`${getPassByEmailEndPoint}${params}`)
};
const getPassengers = () => client.get(getPassEndPoint);

const updatePassengerAddConnection = (params, body) => {
    return client.put(`${updatePassAddConEndPoint}${params}`, body)
};
const updatePassengerAddTrip = (params, body) => {
    return client.put(`${updatePassAddTripEndPoint}${params}`, body)
};
const updatePassengerDeleteConnection = (params, body) => {
    return client.put(`${updatePassDelConEndPoint}${params}`, body)
};
const updatePassengerSecurityProfile = (params, body) => {
    return client.put(`${updatePassSecurityEndPoint}${params}`, body)
};
const updatePassengerSettingProfile = (params, body) => {
    return client.put(`${updatePassSettingEndPoint}${params}`, body)
};

const deletePassenger = (params) => {
    return client.delete(`${deletePassEndPoint}${params}`)
};

export default {
    addPassenger,
    getPassengerById,
    getPassengerByEmail,
    getPassengers,
    updatePassengerAddConnection,
    updatePassengerAddTrip,
    updatePassengerDeleteConnection,
    updatePassengerSecurityProfile,
    updatePassengerSettingProfile,
    deletePassenger
};