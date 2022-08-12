import client from './client';

const addPaymentEndPoint = '/api/payment/addPayment/';

const addPayment = (params, body) => client.post(`${addPaymentEndPoint}${params}`, body);

export default {
    addPayment
};