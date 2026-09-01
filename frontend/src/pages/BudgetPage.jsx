import { useState } from 'react';
import BudgetCategoryList from '../components/budget/BudgetCategoryList';
import AddCategoryForm from '../components/budget/AddCategoryForm';
import MonthYearPicker from '../components/budget/MonthYearPicker';
import { useBudgetForMonth } from '../hooks/useBudgetForMonth';
import { formatCurrency } from '../utils/budgetFormat';
import { budgetService } from '../services/budget.service';

const BudgetPage = () => {
    const {
        budgetData,
        month,
        year,
        changeMonth,
        loading,
        error,
        createBudget,
        existingCategories,
        reload
    } = useBudgetForMonth();

    const [showAddForm, setShowAddForm] = useState(false);
    const [creatingBudget, setCreatingBudget] = useState(false);

    // Submit z formularza gdy budżet JUŻ istnieje -> dodajemy kategorię/podkategorię do niego
    const handleAddCategory = async (category) => {
        if (!budgetData?.id) return;
        if (category._isSubcategory) {
            await budgetService.addSubcategory(budgetData.id, category.parentCategoryId, category);
        } else {
            await budgetService.addCategory(budgetData.id, category);
        }
        setShowAddForm(false);
        await reload();
    };

    // Submit z formularza gdy budżetu na dany miesiąc jeszcze NIE MA -> tworzymy budżet z tą kategorią
    const handleCreateBudgetWithCategory = async (category) => {
        try {
            setCreatingBudget(true);
            await createBudget(category);
            setShowAddForm(false);
        } catch (err) {
            console.error('Nie udało się stworzyć budżetu:', err);
        } finally {
            setCreatingBudget(false);
        }
    };

    if (loading) {
        return <div className="p-6 text-white">Ładowanie budżetu...</div>;
    }

    if (error) {
        return <div className="p-6 text-red-400">Błąd: {error}</div>;
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
                <h1 className="text-2xl font-bold text-white">
                    {budgetData?.name || 'Budżet'}
                </h1>
                <MonthYearPicker month={month} year={year} onChange={changeMonth} />
            </div>

            {!budgetData ? (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md text-center border border-white/20">
                    <div className="text-6xl mb-4">💰</div>
                    <h2 className="text-xl font-bold text-white mb-2">
                        Brak budżetu na wybrany miesiąc
                    </h2>

                    {!showAddForm ? (
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition font-semibold mt-4"
                        >
                            Stwórz budżet
                        </button>
                    ) : (
                        <div className="text-left">
                            <AddCategoryForm
                                mode="create-budget"
                                existingCategories={existingCategories}
                                onSubmit={handleCreateBudgetWithCategory}
                                onCancel={() => setShowAddForm(false)}
                            />
                            {creatingBudget && (
                                <p className="text-white/60 text-sm mt-2">Tworzenie budżetu...</p>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <div className="bg-white/5 rounded-lg p-4">
                        <div className="flex flex-wrap gap-6 text-white">
                            <span>Wydano: {formatCurrency(budgetData.totalSpent)}</span>
                            <span>Budżet: {formatCurrency(budgetData.totalBudget)}</span>
                            <span>Pozostało: {formatCurrency(budgetData.remaining)}</span>
                            {budgetData.isActive && (
                                <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1.5 rounded-lg flex items-center">
                                    ● Aktywny
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            + Dodaj kategorię
                        </button>
                    </div>

                    <BudgetCategoryList
                        categories={budgetData.categories}
                        variant="full"
                        editable
                        onAddCategory={handleAddCategory}
                    />

                    {showAddForm && (
                        <AddCategoryForm
                            mode="add-to-budget"
                            existingCategories={existingCategories}
                            parentCategories={budgetData.categories || []}
                            onSubmit={handleAddCategory}
                            onCancel={() => setShowAddForm(false)}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default BudgetPage;