import Widget from '../components/common/widgets/Widget';
import BalanceWidget from '../components/common/widgets/BalanceWidget';
import BudgetWidget from '../components/common/widgets/BudgetWidget';
import WidgetGridLayout from '../components/layout/WidgetGridLayout';

const useBudgetWidgetSettings = () => ({ visibleCategoryIds: undefined });

const DashboardPage = () => {
    const { visibleCategoryIds } = useBudgetWidgetSettings();

    return (
        <WidgetGridLayout storageKey="dashboard-layout">
                <BudgetWidget
                    key="budget"
                    visibleCategoryIds={visibleCategoryIds}
                    size="medium"
                    variant="glass"
                />

                <BalanceWidget key="balance" size='small'/>

                {/* przykład default widżeta, ale nie będzie używany w ten sposób */}
                <Widget key="example" size="large" variant="glass">
                    <Widget.Header>Tytuł</Widget.Header>
                    <Widget.Body>
                        <div className="h-[200px] flex items-center justify-center text-white/40">
                            treść 1
                        </div>
                    </Widget.Body>
                </Widget>

                <Widget key="example-4" size="large" variant="glass">
                    <Widget.Header>Tytuł</Widget.Header>
                    <Widget.Body>
                        <div className="h-[200px] flex items-center justify-center text-white/40">
                            treść 4
                        </div>
                    </Widget.Body>
                </Widget>

                <Widget key="example-3" size="medium" variant="glass">
                    <Widget.Header>Tytuł</Widget.Header>
                    <Widget.Body>
                        <div className="h-[200px] flex items-center justify-center text-white/40">
                            treść 3
                        </div>
                    </Widget.Body>
                </Widget>

                <Widget key="example-2" size="small" variant="glass">
                    <Widget.Header>small</Widget.Header>
                    <Widget.Body>
                        <div className="h-[200px] flex items-center justify-center text-white/40">
                            treść 2
                        </div>
                    </Widget.Body>
                </Widget>

        </WidgetGridLayout>
    );
};

export default DashboardPage;