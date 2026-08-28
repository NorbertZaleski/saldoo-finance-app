import WidgetGridLayout from '../components/layout/WidgetGridLayout';

// Przykładowe widżety
const Widget = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <span className="text-3xl">{icon}</span>
    </div>
  </div>
);

const DashboardPage = () => {
  return (
    <WidgetGridLayout title="Kokpit" icon="📊">
      <Widget title="Przychody" value="+5 200 zł" icon="💰" />
      <Widget title="Wydatki" value="-3 800 zł" icon="💳" />
      <Widget title="Saldo" value="+1 400 zł" icon="💵" />
      <Widget title="Oszczędności" value="12 500 zł" icon="🏦" />
      <Widget title="Budżety" value="3/5" icon="📋" />
      <Widget title="Cele" value="2/4" icon="🎯" />
    </WidgetGridLayout>
  );
};

export default DashboardPage;