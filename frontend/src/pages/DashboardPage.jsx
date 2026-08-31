import Widget from '../components/common/widgets/Widget';
import BalanceWidget from '../components/common/widgets/BalanceWidget';
import BudgetWidget from '../components/common/widgets/BudgetWidget';
import WidgetGridLayout from '../components/layout/WidgetGridLayout';

// TODO: podłącz realne ustawienia widżetu (kategorie wybrane przez usera w konfiguracji
// widżetu budżetu). Na razie undefined = BudgetWidget pokazuje wszystkie kategorie.
const useBudgetWidgetSettings = () => ({ visibleCategoryIds: undefined });

const DashboardPage = () => {
    const { visibleCategoryIds } = useBudgetWidgetSettings();

    return (
        <WidgetGridLayout>
            <div className="p-6 space-y-6">
                <BudgetWidget
                    visibleCategoryIds={visibleCategoryIds}
                    size="medium"
                />

                <BalanceWidget />

                {/* przykład default widżeta, ale nie będzie używany w ten sposób */}
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