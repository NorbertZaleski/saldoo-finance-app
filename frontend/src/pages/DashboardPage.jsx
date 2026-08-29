import Widget from '../components/common/widgets/Widget';
import BalanceWidget from '../components/common/widgets/BalanceWidget';
import BudgetWidget from '../components/common/widgets/BudgetWidget';
import WidgetGridLayout from '../components/layout/WidgetGridLayout';

import { budgetService } from '../services/budgetService';
import { useEffect, useState } from 'react';

const DashboardPage = () => {
  const [budgetData, setBudgetData] = useState(null);
  const [allBudgets, setAllBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const fetchBudget = async () => {
            try {
                setLoading(true);
                const response = await budgetService.getBudget();
                
                console.log('Otrzymane dane:', response);
 
                
                let budgets = [];
                let user = response.user || null;
                
                if (Array.isArray(response.data)) {
                    budgets = response.data;
                } else if (response.data?.budgets) {
                    budgets = response.data.budgets;
                } else if (response.data?.data) {
                    budgets = response.data.data;
                }
                
                console.log('📊 Wszystkie budżety:', budgets);
                setAllBudgets(budgets);
                                const currentDate = new Date();
                const currentMonth = currentDate.getMonth();
                const currentYear = currentDate.getFullYear();
                
                console.log('📅 Szukam budżetu dla:', currentMonth, currentYear);
                
                // ✅ Szukaj budżetu dla bieżącego miesiąca (dokładnie tak jak w modelu)
                let activeBudget = budgets.find(budget => 
                    budget.month === currentMonth && budget.year === currentYear
                );
                
                // Jeśli nie znaleziono, weź pierwszy aktywny
                if (!activeBudget) {
                    activeBudget = budgets.find(b => b.isActive === true) || budgets[0] || null;
                }
                
                console.log('📊 Wybrany budżet:', activeBudget);
                
                if (activeBudget) {
                    // ✅ Użyj danych bezpośrednio z modelu
                    // totalSpent obliczamy z kategorii (jeśli masz spent w categories)
                    // lub zostawiamy 0 - będzie obliczone przez metody modelu
                    const totalSpent = activeBudget.categories?.reduce((sum, cat) => sum + (cat.spent || 0), 0) || 0;
                    
                    const formattedData = {
                        user: user || null,
                        budget: activeBudget,
                        categories: activeBudget.categories || [],
                        totalBudget: activeBudget.limit || 0,
                        totalSpent: totalSpent,
                        remaining: (activeBudget.limit || 0) - totalSpent,
                        name: activeBudget.name || `Budżet ${new Date(0, activeBudget.month).toLocaleString('pl-PL', { month: 'long' })} ${activeBudget.year}`,
                        id: activeBudget._id || activeBudget.id,
                        month: activeBudget.month,
                        year: activeBudget.year,
                        period: activeBudget.period || 'monthly',
                        isActive: activeBudget.isActive,
                        alertThreshold: activeBudget.alertTreshold || 80
                    };
                    
                    console.log('📊 Sformatowane dane:', formattedData);
                    setBudgetData(formattedData);
                } else {
                    setBudgetData(null);
                }
                
                setError(null);
            } catch (err) {
                console.error('❌ Błąd pobierania budżetu:', err);
                setError(err.message || 'Nie udało się pobrać budżetu');
            } finally {
                setLoading(false);
            }
        };

        fetchBudget();
    }, []);

const handleMonthChange = (month, year) => {
        setSelectedMonth(month);
        setSelectedYear(year);
        
        // Znajdź budżet dla wybranego miesiąca
        const selectedBudget = allBudgets.find(budget => {
            return budget.month === month && budget.year === year;
        });
        
        if (selectedBudget) {
            const totalSpent = selectedBudget.categories?.reduce((sum, cat) => sum + (cat.spent || 0), 0) || 0;
            
            const formattedData = {
                user: budgetData?.user || null,
                budget: selectedBudget,
                categories: selectedBudget.categories || [],
                totalBudget: selectedBudget.limit || 0,
                totalSpent: totalSpent,
                remaining: (selectedBudget.limit || 0) - totalSpent,
                name: selectedBudget.name || `Budżet ${new Date(0, selectedBudget.month).toLocaleString('pl-PL', { month: 'long' })} ${selectedBudget.year}`,
                id: selectedBudget._id || selectedBudget.id,
                month: selectedBudget.month,
                year: selectedBudget.year,
                period: selectedBudget.period || 'monthly',
                isActive: selectedBudget.isActive,
                alertThreshold: selectedBudget.alertTreshold || 80
            };
            setBudgetData(formattedData);
        }
    };

    const handleCreateBudget = async () => {
        try {
            const now = new Date();
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();
            
            // Sprawdź czy już istnieje budżet na ten miesiąc
            const existingBudget = allBudgets.find(b => 
                b.month === currentMonth && b.year === currentYear
            );
            
            if (existingBudget) {
                alert('Budżet na ten miesiąc już istnieje!');
                return;
            }
            
            const newBudget = {
                name: `Budżet ${now.toLocaleString('pl-PL', { month: 'long' })} ${currentYear}`,
                categories: [], // Puste - użytkownik doda później
                limit: 5000,
                period: 'monthly',
                month: currentMonth,
                year: currentYear,
                isActive: true,
                alertTreshold: 80
            };
            
            const response = await budgetService.createBudget(newBudget);
            console.log('✅ Stworzono budżet:', response);
            
            // Odśwież dane
            window.location.reload();
        } catch (error) {
            console.error('❌ Błąd tworzenia budżetu:', error);
        }
    };

    // Loading
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-white text-xl">Ładowanie budżetu...</div>
            </div>
        );
    }

    // Error
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-400 text-xl">Błąd: {error}</div>
            </div>
        );
    }

    // Brak budżetu
    if (!budgetData || !budgetData.budget) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center border border-white/20">
                    <div className="text-6xl mb-4">💰</div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Nie masz jeszcze żadnego budżetu
                    </h2>
                    <p className="text-white/60 mb-6">
                        Stwórz swój pierwszy budżet i zacznij kontrolować finanse!
                    </p>
                    <button
                        onClick={handleCreateBudget}
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition font-semibold"
                    >
                        + Stwórz budżet
                    </button>
                </div>
            </div>
        );
    }

  return (
    <WidgetGridLayout>
      <div className="p-6 space-y-6">
        
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
              <h1 className="text-2xl font-bold text-white">
                  Witaj, {budgetData.user?.name || 'Użytkowniku'}!
              </h1>
          </div>
          
          {/*Selektory miesiąca/roku*/}
          {allBudgets.length > 1 && (
              <div className="flex gap-2">
                  <select 
                      className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-1.5 text-sm"
                      value={budgetData.month}
                      onChange={(e) => {
                          const month = parseInt(e.target.value);
                          const year = budgetData.year || new Date().getFullYear();
                          handleMonthChange(month, year);
                      }}
                  >
                      {Array.from({ length: 12 }, (_, i) => (
                          <option key={i} value={i}>
                              {new Date(0, i).toLocaleString('pl-PL', { month: 'long' })}
                          </option>
                      ))}
                  </select>
                  <select 
                      className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-1.5 text-sm"
                      value={budgetData.year}
                      onChange={(e) => {
                          const year = parseInt(e.target.value);
                          const month = budgetData.month || new Date().getMonth();
                          handleMonthChange(month, year);
                      }}
                  >
                      {Array.from({ length: 5 }, (_, i) => {
                          const year = new Date().getFullYear() - 2 + i;
                          return (
                              <option key={year} value={year}>{year}</option>
                          );
                      })}
                  </select>
                  
                  {/* Informacja o statusie */}
                  {budgetData.isActive && (
                      <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1.5 rounded-lg flex items-center">
                          ● Aktywny
                      </span>
                  )}
              </div>
          )}
        </div>

        


        {/* przykładowy widżet do poprawy */}
        <BudgetWidget 
            data={{
                totalBudget: budgetData.totalBudget,
                categories: budgetData.categories,
                name: budgetData.budget.name
            }}
            currency="zł"
            size="medium"
        />
        <BalanceWidget></BalanceWidget>

            

        {/* przykład default widżeta, ale nie będę go używał w ten sposób*/}
        <Widget size="large" variant="glass">
          <Widget.Header>Tytuł</Widget.Header>
          <Widget.Body>
            <div className="h-[200px] flex items-center justify-center text-white/40">
              treść
            </div>
          </Widget.Body>
        </Widget>



      </div>
    </WidgetGridLayout>
  );
};

export default DashboardPage;