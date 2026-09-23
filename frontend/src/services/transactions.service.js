import axios from 'axios';

const getToken = () => localStorage.getItem('token');

const api = axios.create({
    baseURL: 'http://localhost:5001/budget',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor do dodawania tokenu
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const transactionsService = {

    getTransactions: async () => {
        try {
            const response = await api.get('/');
            return response.data;
        } catch (error) {
            console.error('Błąd pobierania transakcji:', error);
            throw error.response?.data || error;
        }
    },

}