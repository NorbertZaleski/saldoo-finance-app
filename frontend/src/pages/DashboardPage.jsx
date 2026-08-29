import Widget from '../components/common/widgets/Widget';
import BalanceWidget from '../components/common/widgets/BalanceWidget';
import BudgetWidget from '../components/common/widgets/BudgetWidget';
import WidgetGridLayout from '../components/layout/WidgetGridLayout';

const DashboardPage = () => {

  return (
    <WidgetGridLayout>
      <div className="p-6 space-y-6">
        
        {/* przykładowy widżet do poprawy */}
        <BudgetWidget></BudgetWidget>
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