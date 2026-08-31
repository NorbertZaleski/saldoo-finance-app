import Widget from './Widget';
import BudgetCategoryList from '../../budget/BudgetCategoryList';
import { useBudgetForMonth } from '../../../hooks/useBudgetForMonth';
import { formatCurrency } from '../../../utils/budgetFormat';

/**
 * Widżet budżetu na dashboard.
 * - Zawsze bieżący miesiąc (useBudgetForMonth bez zmiany miesiąca).
 * - Pokazuje tylko kategorie z `visibleCategoryIds` (ustawienia widżetu wybrane przez usera).
 *   Jeśli nie podano listy — pokazuje wszystkie (przydatne zanim UI wyboru kategorii powstanie).
 * - Bez edycji/dodawania — to zadanie pełnej strony budżetu (BudgetPage).
 */
const BudgetWidget = ({
    visibleCategoryIds,
    currency = 'zł',
    size = 'medium',
    className = ''
}) => {
    const { budgetData, loading, error } = useBudgetForMonth();

    if (loading) {
        return (
            <Widget size={size} className={className} variant="glass">
                <Widget.Body>
                    <div className="text-center text-white/60 py-8">Ładowanie...</div>
                </Widget.Body>
            </Widget>
        );
    }

    if (error || !budgetData) {
        return (
            <Widget size={size} className={className} variant="glass">
                <Widget.Body>
                    <div className="text-center text-white/60 py-8">
                        <p>Brak danych budżetu</p>
                    </div>
                </Widget.Body>
            </Widget>
        );
    }

    const categories = visibleCategoryIds?.length
        ? budgetData.categories.filter(c => visibleCategoryIds.includes(c.id))
        : budgetData.categories;

    return (
        <Widget size={size} className={className} variant="glass">
            <Widget.Body>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Budżet</h3>
                </div>

                <div className="bg-white/5 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-white/60">Pozostało do wydania</span>
                        <span className="text-xl font-bold text-white">
                            {formatCurrency(budgetData.remaining, currency)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-white/40">
                        <span>Wydano: {formatCurrency(budgetData.totalSpent, currency)}</span>
                        <span>Budżet: {formatCurrency(budgetData.totalBudget, currency)}</span>
                    </div>
                </div>

                <BudgetCategoryList
                    categories={categories}
                    variant="compact"
                    editable={false}
                    currency={currency}
                />
            </Widget.Body>
        </Widget>
    );
};

export default BudgetWidget;