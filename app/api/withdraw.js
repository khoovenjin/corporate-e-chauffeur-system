import client from './client';

const addWithdrawalEndPoint = '/api/withdraw/addWithdraw';

const addWithdraw = (params, body) => client.post(`${addWithdrawalEndPoint}${params}`, body);

export default {
    addWithdraw
};