import axios from 'axios';

const getToken = () => localStorage.getItem('token');

const api = axios.create({
    baseURL: 'http://localhost:5001/accounts',
    headers: {
        'Content-Type': 'application/json'
    }
});

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

export const accountService = {
    getAccounts: async () => {
        try {
            const response = await api.get('/');
            return response.data;
        } catch (error) {
            console.error('Błąd pobierania kont:', error);
            throw error.response?.data || error;
        }
    },

    createAccount: async (accountData) => {
        try {
            const response = await api.post('/', accountData);
            return response.data;
        } catch (error) {
            console.error('Błąd tworzenia konta:', error);
            throw error.response?.data || error;
        }
    },

    updateAccount: async (accountId, accountData) => {
        try {
            const response = await api.patch(`/${accountId}`, accountData);
            return response.data;
        } catch (error) {
            console.error('Błąd aktualizacji konta:', error);
            throw error.response?.data || error;
        }
    },

    deleteAccount: async (accountId) => {
        try {
            const response = await api.delete(`/${accountId}`);
            return response.data;
        } catch (error) {
            console.error('Błąd usuwania konta:', error);
            throw error.response?.data || error;
        }
    }
};