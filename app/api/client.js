import { create } from 'apisauce';
import URLs from '../config/URLs';

const apiClient = create({
    baseURL: URLs.baseURL
});

export default apiClient;