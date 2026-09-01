import axios from 'axios';

const API_URL = '/budget';

const getToken = () => localStorage.getItem('token');

const api = axios.create({
    baseURL: API_URL,
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

export const budgetService = {
    // Pobierz budżet
    getBudget: async () => {
        try {
            const response = await api.get('/');
            return response.data;
        } catch (error) {
            console.error('Błąd pobierania budżetu:', error);
            throw error.response?.data || error;
        }
    },

    // Stwórz budżet
    createBudget: async (budgetData) => {
        try {
            const response = await api.post('/', budgetData);
            return response.data;
        } catch (error) {
            console.error('Błąd tworzenia budżetu:', error);
            throw error.response?.data || error;
        }
    },

    // Dodaj kategorię
    addCategory: async (budgetId, categoryData) => {
        try {
            const response = await api.post(`/${budgetId}/categories`, categoryData);
            return response.data;
        } catch (error) {
            console.error('Błąd dodawania kategorii:', error);
            throw error.response?.data || error;
        }
    },

    // Dodaj wydatek
    addExpense: async (budgetId, categoryId, expenseData) => {
        try {
            const response = await api.post(
                `/${budgetId}/categories/${categoryId}/expenses`,
                expenseData
            );
            return response.data;
        } catch (error) {
            console.error('Błąd dodawania wydatku:', error);
            throw error.response?.data || error;
        }
    }
};