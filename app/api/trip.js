import client from './client';

const addTripEndPoint = '/api/trip/addTrip';

const getTripByIdEndPoint = '/api/trip/getTrip/ById/';
const getTripByPassIdEndPoint = '/api/trip/getTrip/ByPassengerId/';
const getTripsEndPoint = '/api/trip/getTrips';

const updateTripAddGeoEndPoint = '/api/trip/updateTrip/AddGeolocation/';
const updateTripChangeStatusEndPoint = '/api/trip/updateTrip/ChangeStatus/';

const deleteTripEndPoint = '/api/trip/deleteTrip/';

const addTrip = (body) => client.post(addTripEndPoint, body);

const getTripById = (params) => client.get(`${getTripByIdEndPoint}${params}`);
const getTripByPassengerId = (params) => client.get(`${getTripByPassIdEndPoint}${params}`);
const getTrips = () => client.get(getTripsEndPoint);

const updateTripAddGeolocation = (params, body) => client.put(`${updateTripAddGeoEndPoint}${params}`, body);
const updateTripChangeStatus = (params, body) => client.put(`${updateTripChangeStatusEndPoint}${params}`, body);

const deleteTrip = (params) => client.delete(`${deleteTripEndPoint}${params}`);

export default {
    addTrip,
    getTripById,
    getTripByPassengerId,
    getTrips,
    updateTripAddGeolocation,
    updateTripChangeStatus,
    deleteTrip
};