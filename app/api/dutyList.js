import client from './client';

const addDutyEndPoint = '/api/dutyList/addDuty/';
const deleteDutyEndPoint = '/api/dutyList/deleteDuty/';

const addDuty = (params, body) => client.post(`${addDutyEndPoint}${params}`, body);

const deleteDuty = (params) => client.delete(`${deleteDutyEndPoint}${params}`);

export default {
    addDuty,
    deleteDuty
};