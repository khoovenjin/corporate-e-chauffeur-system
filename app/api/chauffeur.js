import client from './client';

const addChaufEndPoint = '/api/chauffeur/addChauffeur';

const getChaufByIdEndPoint = '/api/chauffeur/getChauffeur/ById/';
const getChaufByEmailEndPoint = '/api/chauffeur/getChauffeur/ByEmail/';
const getChaufEndPoint = '/api/chauffeur/getChauffeurs';

const updateChaufAddTripEndPoint = '/api/chauffeur/updateChauffeur/AddTrip/';
const updateChaufAddWithdrawalEndPoint = '/api/chauffeur/updateChauffeur/AddWithdrawal/';
const updateChaufSecurityEndPoint = '/api/chauffeur/updateChauffeur/Security/';
const updateChaufSettingEndPoint = '/api/chauffeur/updateChauffeur/Setting/';

const deleteChaufEndPoint = '/api/chauffeur/deleteChauffeur/';

const addChauffeur = (body) => {
    return client.post(addChaufEndPoint, body)
};

const getChauffeurById = (params) => {
    return client.get(`${getChaufByIdEndPoint}${params}`)
};
const getChauffeurByEmail = (params) => {
    return client.get(`${getChaufByEmailEndPoint}${params}`)
};
const getChauffeurs = () => client.get(getChaufEndPoint);

const updateChauffeurAddTrip = (params, body) => {
    return client.put(`${updateChaufAddTripEndPoint}${params}`, body)
};
const updateChauffeurAddWithdrawal = (params, body) => {
    return client.put(`${updateChaufAddWithdrawalEndPoint}${params}`, body)
};
const updateChauffeurSettingProfile = (params, body) => {
    return client.put(`${updateChaufSettingEndPoint}${params}`, body)
};
const updateChauffeurSecurityProfile = (params, body) => {
    return client.put(`${updateChaufSecurityEndPoint}${params}`, body)
};

const deleteChauffeur = (params) => {
    return client.delete(`${deleteChaufEndPoint}${params}`)
};

export default {
    addChauffeur,
    getChauffeurById,
    getChauffeurByEmail,
    getChauffeurs,
    updateChauffeurAddTrip,
    updateChauffeurAddWithdrawal,
    updateChauffeurSettingProfile,
    updateChauffeurSecurityProfile,
    deleteChauffeur
};