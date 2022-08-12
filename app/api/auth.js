import client from './client';

const login = (email, password, role) => client.post('/api/auth', {email, password, role})

export default {
    login
};