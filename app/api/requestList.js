import client from './client';

const addReqEndPoint = '/api/requestList/addRequest/';
const getReqFirstDocEndPoint = '/api/requestList/getRequest';
const deleteReqEndPoint = '/api/requestList/deleteRequest/';

const addRequest = (params, body) => client.post(`${addReqEndPoint}${params}`, body);
const getRequestFirstDocument = () => client.put(getReqFirstDocEndPoint);
const deleteRequest = (params) => client.delete(`${deleteReqEndPoint}${params}`);

export default {
    addRequest,
    getRequestFirstDocument,
    deleteRequest
};