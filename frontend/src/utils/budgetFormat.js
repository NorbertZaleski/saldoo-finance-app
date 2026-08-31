// Formatowanie kwoty w PLN (lub innej walucie podanej jako symbol)
export const formatCurrency = (amount, currency = 'zł') => {
    return new Intl.NumberFormat('pl-PL', {
        style: 'currency',
        currency: 'PLN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount || 0).replace('zł', currency);
};

// Procent wykorzystania budżetu kategorii (0-100)
export const calculateProgress = (spent, budget) => {
    if (!budget || budget === 0) return 0;
    return Math.min((spent / budget) * 100, 100);
};

// Kolor paska postępu w zależności od wykorzystania
export const getProgressColor = (percentage) => {
    if (percentage < 50) return 'bg-green-500';
    if (percentage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
};

// Zamienia surowy obiekt budżetu z API na ujednolicony kształt
// używany identycznie przez widżet na dashboardzie i pełną stronę budżetu.
export const formatBudgetEntry = (budget, user) => {
    if (!budget) return null;

    const totalSpent = budget.categories?.reduce((sum, cat) => sum + (cat.spent || 0), 0) || 0;

    return {
        user: user || null,
        budget,
        categories: budget.categories || [],
        totalBudget: budget.limit || 0,
        totalSpent,
        remaining: (budget.limit || 0) - totalSpent,
        name: budget.name || `Budżet ${new Date(0, budget.month).toLocaleString('pl-PL', { month: 'long' })} ${budget.year}`,
        id: budget._id || budget.id,
        month: budget.month,
        year: budget.year,
        period: budget.period || 'monthly',
        isActive: budget.isActive,
        alertThreshold: budget.alertTreshold || 80
    };
};

// Wyciąga listę budżetów z różnych możliwych kształtów odpowiedzi API
// (backend bywa niespójny — trzymamy tę logikę w jednym miejscu)
export const extractBudgetsList = (response) => {
    if (Array.isArray(response?.data)) return response.data;
    if (response?.data?.budgets) return response.data.budgets;
    if (response?.data?.data) return response.data.data;
    return [];
};