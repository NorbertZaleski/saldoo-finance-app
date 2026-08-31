import { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { formatCurrency, calculateProgress, getProgressColor } from '../../utils/budgetFormat';

/**
 * Ten sam komponent jest używany:
 *  - w BudgetWidget (dashboard)   -> variant="compact", editable={false}, opcjonalny visibleCategoryIds
 *  - w BudgetPage (pełna strona)  -> variant="full", editable, z możliwością edycji/usuwania
 *
 * @param {object[]} categories - kategorie do wyświetlenia (już przefiltrowane przez rodzica)
 * @param {'compact'|'full'} variant - tryb wyświetlania (wysokość listy, gęstość)
 * @param {boolean} editable - czy pokazywać przyciski edycji/usuwania i formularz dodawania
 * @param {string} currency - symbol waluty
 * @param {(category) => void} onAddCategory
 * @param {(category) => void} onEditCategory
 * @param {(categoryId) => void} onDeleteCategory
 */
const BudgetCategoryList = ({
    categories = [],
    variant = 'compact',
    editable = false,
    currency = 'zł',
    onAddCategory,
    onEditCategory,
    onDeleteCategory
}) => {
    const [expandedCategories, setExpandedCategories] = useState([]);

    const toggleExpand = (categoryId) => {
        setExpandedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    if (!categories.length) {
        return (
            <div className="text-center text-white/60 py-8">
                <p>Brak kategorii do wyświetlenia</p>
            </div>
        );
    }

    const listHeight = variant === 'compact' ? 'max-h-[300px]' : 'max-h-none';

    return (
        <div className={`space-y-3 ${listHeight} overflow-y-auto pr-1 custom-scrollbar`}>
            {categories.map((category) => {
                const progress = calculateProgress(category.spent, category.budget);
                const isExpanded = expandedCategories.includes(category.id);
                const hasSubcategories = category.subcategories && category.subcategories.length > 0;

                return (
                    <div
                        key={category.id}
                        className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                                <span className="text-xl">{category.icon || '📁'}</span>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-white">{category.name}</span>
                                        {hasSubcategories && (
                                            <button
                                                onClick={() => toggleExpand(category.id)}
                                                className="text-white/40 hover:text-white/60 transition text-xs"
                                            >
                                                {isExpanded ? '▼' : '▶'}
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-white/40">
                                        <span>Wydano: {formatCurrency(category.spent, currency)}</span>
                                        {category.budget && (
                                            <span>Budżet: {formatCurrency(category.budget, currency)}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-white">
                                    {category.budget
                                        ? formatCurrency(category.budget - category.spent, currency)
                                        : formatCurrency(-category.spent, currency)}
                                </span>
                                {editable && (
                                    <>
                                        <button
                                            onClick={() => onEditCategory?.(category)}
                                            className="p-1 hover:bg-white/10 rounded transition text-white/40 hover:text-white/60"
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                        <button
                                            onClick={() => onDeleteCategory?.(category.id)}
                                            className="p-1 hover:bg-white/10 rounded transition text-white/40 hover:text-red-400"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {category.budget > 0 && (
                            <div className="mt-2">
                                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-500 ${getProgressColor(progress)}`}
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-xs text-white/40 mt-1">
                                    <span>{Math.round(progress)}%</span>
                                    <span>{formatCurrency(category.spent, currency)} / {formatCurrency(category.budget, currency)}</span>
                                </div>
                            </div>
                        )}

                        {hasSubcategories && isExpanded && (
                            <div className="ml-8 mt-3 space-y-2 border-l border-white/10 pl-3">
                                {category.subcategories.map((sub) => (
                                    <div key={sub.id} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="text-white/60">{sub.icon || '•'}</span>
                                            <span className="text-white/80">{sub.name}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-white/40">
                                            <span>{formatCurrency(sub.spent, currency)}</span>
                                            {sub.budget && (
                                                <span>z {formatCurrency(sub.budget, currency)}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default BudgetCategoryList;