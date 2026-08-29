import Widget from './Widget';
import { useState } from 'react';
import { Plus, MoreVertical, Edit2, Trash2 } from 'lucide-react';

const BudgetWidget = ({ 
  data, 
  onAddCategory, 
  onEditCategory, 
  onDeleteCategory,
  currency = 'zł',
  size = 'medium',
  className = ''
}) => {
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  // Oblicz całkowity budżet
  const totalBudget = data?.totalBudget || 0;
  const totalSpent = data?.categories?.reduce((sum, cat) => sum + cat.spent, 0) || 0;
  const remaining = totalBudget - totalSpent;

  // Formatowanie waluty
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('zł', currency);
  };

  // Oblicz procent dla progress bara
  const calculateProgress = (spent, budget) => {
    if (!budget || budget === 0) return 0;
    const percentage = (spent / budget) * 100;
    return Math.min(percentage, 100);
  };

  // Pobierz kolor dla progress bara
  const getProgressColor = (percentage) => {
    if (percentage < 50) return 'bg-green-500';
    if (percentage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Toggle expand dla kategorii
  const toggleExpand = (categoryId) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Sprawdź czy dane istnieją
  if (!data || !data.categories) {
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

  return (
    <Widget size={size} className={className} variant="glass">
      <Widget.Body>
        {/* Nagłówek */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Budżet</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddForm(true)}
              className="p-1.5 hover:bg-white/10 rounded-lg transition text-white/60 hover:text-white"
              title="Dodaj nową kategorię"
            >
              <Plus size={18} />
            </button>
            <button
              className="p-1.5 hover:bg-white/10 rounded-lg transition text-white/60 hover:text-white"
              title="Więcej opcji"
            >
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Podsumowanie */}
        <div className="bg-white/5 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-white/60">Pozostało do wydania</span>
            <span className="text-xl font-bold text-white">
              {formatCurrency(remaining)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm text-white/40">
            <span>Wydano: {formatCurrency(totalSpent)}</span>
            <span>Budżet: {formatCurrency(totalBudget)}</span>
          </div>
        </div>

        {/* Lista kategorii */}
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
          {data.categories.map((category) => {
            const progress = calculateProgress(category.spent, category.budget);
            const isExpanded = expandedCategories.includes(category.id);
            const hasSubcategories = category.subcategories && category.subcategories.length > 0;

            return (
              <div
                key={category.id}
                className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition"
              >
                {/* Główna kategoria */}
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
                        <span>Wydano: {formatCurrency(category.spent)}</span>
                        {category.budget && (
                          <span>Budżet: {formatCurrency(category.budget)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">
                      {category.budget ? formatCurrency(category.budget - category.spent) : formatCurrency(-category.spent)}
                    </span>
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
                  </div>
                </div>

                {/* Progress Bar */}
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
                      <span>{formatCurrency(category.spent)} / {formatCurrency(category.budget)}</span>
                    </div>
                  </div>
                )}

                {/* Podkategorie (rozszerzone) */}
                {hasSubcategories && isExpanded && (
                  <div className="ml-8 mt-3 space-y-2 border-l border-white/10 pl-3">
                    {category.subcategories.map((sub) => (
                      <div key={sub.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-white/60">{sub.icon || '•'}</span>
                          <span className="text-white/80">{sub.name}</span>
                        </div>
                        <div className="flex items-center gap-4 text-white/40">
                          <span>{formatCurrency(sub.spent)}</span>
                          {sub.budget && (
                            <span>z {formatCurrency(sub.budget)}</span>
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

        {/* Przycisk dodawania na dole */}
        {showAddForm && (
          <div className="mt-4 p-4 bg-white/10 rounded-lg border border-white/20">
            <h4 className="text-white font-medium mb-3">Dodaj nową kategorię</h4>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const newCategory = {
                id: Date.now(),
                name: formData.get('name'),
                icon: formData.get('icon') || '📁',
                budget: parseFloat(formData.get('budget')) || 0,
                spent: 0,
                subcategories: []
              };
              onAddCategory?.(newCategory);
              setShowAddForm(false);
              e.target.reset();
            }}>
              <div className="space-y-3">
                <input
                  name="name"
                  placeholder="Nazwa kategorii"
                  className="w-full p-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
                  required
                />
                <div className="flex gap-3">
                  <input
                    name="icon"
                    placeholder="Ikona (emoji)"
                    className="w-20 p-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
                  />
                  <input
                    name="budget"
                    type="number"
                    placeholder="Budżet"
                    className="flex-1 p-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Dodaj
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 bg-white/10 text-white p-2 rounded-lg hover:bg-white/20 transition"
                  >
                    Anuluj
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </Widget.Body>
    </Widget>
  );
};

export default BudgetWidget;