import { useState, useEffect, useCallback, useMemo } from 'react';
import { budgetService } from '../services/budgetService';
import { formatBudgetEntry, extractBudgetsList } from '../utils/budgetFormat';

export function useBudgets() {
    const [allBudgets, setAllBudgets] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const load = useCallback(async () => {
        try {
            setLoading(true);
            const response = await budgetService.getBudget();
            setAllBudgets(extractBudgetsList(response));
            setUser(response.user || null);
            setError(null);
        } catch (err) {
            console.error('Błąd pobierania budżetu:', err);
            setError(err.message || 'Nie udało się pobrać budżetu');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    // Zwraca sformatowany budżet dla danego miesiąca/roku, albo null gdy go nie ma
    const getBudgetFor = useCallback((month, year) => {
        const found = allBudgets.find(b => b.month === month && b.year === year);
        return formatBudgetEntry(found, user);
    }, [allBudgets, user]);

    // Płaska, zdeduplikowana lista kategorii użytych kiedykolwiek przez usera
    // (do wyboru "wcześniej stworzona kategoria" przy dodawaniu nowej).
    // ZAŁOŻENIE: b.categories ma pola name/icon/budget/subcategories w tym samym
    // kształcie co budgetData.categories po formatBudgetEntry — sprawdź, jeśli
    // lista wyjdzie pusta lub z dziwnymi wartościami.
    const existingCategories = useMemo(() => {
        const map = new Map();
        allBudgets.forEach((b) => {
            (b.categories || []).forEach((cat) => {
                if (!cat?.name || map.has(cat.name)) return;
                map.set(cat.name, {
                    name: cat.name,
                    icon: cat.icon || '📁',
                    budget: cat.budget || 0,
                    subcategories: (cat.subcategories || []).map((s) => ({
                        name: s.name,
                        icon: s.icon || '📁'
                    }))
                });
            });
        });
        return Array.from(map.values());
    }, [allBudgets]);

    // initialCategory: pojedynczy obiekt kategorii, wymagany przy tworzeniu budżetu
    const createBudget = useCallback(async (month, year, initialCategory) => {
        const existing = allBudgets.find(b => b.month === month && b.year === year);
        if (existing) {
            throw new Error('Budżet na ten miesiąc już istnieje!');
        }
        if (!initialCategory) {
            throw new Error('Budżet musi mieć co najmniej jedną kategorię');
        }

        const now = new Date(year, month);
        const newBudget = {
            name: `Budżet ${now.toLocaleString('pl-PL', { month: 'long' })} ${year}`,
            categories: [initialCategory],
            limit: 5000,
            month,
            year,
            isActive: true,
            alertTreshold: 80
        };

        await budgetService.createBudget(newBudget);
        await load();
    }, [allBudgets, load]);

    return {
        allBudgets,
        user,
        loading,
        error,
        getBudgetFor,
        createBudget,
        existingCategories,
        reload: load
    };
}