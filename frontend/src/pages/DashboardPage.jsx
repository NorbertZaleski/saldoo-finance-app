import Widget from '../components/common/widgets/Widget';
import BalanceWidget from '../components/common/widgets/BalanceWidget';
import BudgetWidget from '../components/common/widgets/BudgetWidget';
import WidgetGridLayout from '../components/layout/WidgetGridLayout';

const useBudgetWidgetSettings = () => ({ visibleCategoryIds: undefined });

const DashboardPage = () => {
    const { visibleCategoryIds } = useBudgetWidgetSettings();

    return (
        <WidgetGridLayout>
                <BudgetWidget
                    key="budget"
                    visibleCategoryIds={visibleCategoryIds}
                    size="medium"
                />

                <BalanceWidget key="balance"/>

                {/* przykład default widżeta, ale nie będzie używany w ten sposób */}
                <Widget key="example" size="large" variant="glass">
                    <Widget.Header className="widgetDragHandle">Tytuł</Widget.Header>
                    <Widget.Body>
                        <div className="h-[200px] flex items-center justify-center text-white/40">
                            treść
                        </div>
                    </Widget.Body>
                </Widget>
        </WidgetGridLayout>
    );
};

export default DashboardPage;