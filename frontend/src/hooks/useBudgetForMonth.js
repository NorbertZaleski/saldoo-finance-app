import { useState, useMemo } from 'react';
import { useBudgets } from './useBudgets';

const currentMonthYear = () => {
    const now = new Date();
    return { month: now.getMonth(), year: now.getFullYear() };
};

export function useBudgetForMonth(initial = currentMonthYear()) {
    const {
        loading,
        error,
        getBudgetFor,
        createBudget,
        allBudgets,
        existingCategories,
        reload,
        user
    } = useBudgets();

    const [month, setMonth] = useState(initial.month);
    const [year, setYear] = useState(initial.year);

    const budgetData = useMemo(
        () => getBudgetFor(month, year),
        [getBudgetFor, month, year]
    );

    const changeMonth = (newMonth, newYear) => {
        setMonth(newMonth);
        setYear(newYear);
    };

    return {
        budgetData,
        month,
        year,
        changeMonth,
        loading,
        error,
        createBudget: (initialCategory) => createBudget(month, year, initialCategory),
        existingCategories,
        reload,
        hasMultipleBudgets: allBudgets.length > 1,
        user
    };
}