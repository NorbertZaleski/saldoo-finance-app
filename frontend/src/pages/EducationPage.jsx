import Widget from '../components/common/widgets/Widget.jsx';
import WidgetGridLayout from '../components/layout/WidgetGridLayout.jsx';

const EducationPage = () => {
  return (
    <WidgetGridLayout storageKey="education-layout">

      <Widget key="widg-1">
        <Widget.Header>
          yo
        </Widget.Header>
        <Widget.Body>
          yo body
        </Widget.Body>
      </Widget>

      <Widget key="widg-2">
        <Widget.Header>
          yo
        </Widget.Header>
        <Widget.Body>
          yo body
        </Widget.Body>
      </Widget>

      <div className=''>
        <div key="card-1" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <span className="text-3xl">💰</span>
          <h3 className="font-semibold mt-2">Podstawy oszczędzania</h3>
          <p className="text-sm text-gray-500">10 min czytania</p>
        </div>
        <div key="card-2" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <span className="text-3xl">📈</span>
          <h3 className="font-semibold mt-2">Inwestowanie dla początkujących</h3>
          <p className="text-sm text-gray-500">15 min czytania</p>
        </div>
        <div key="card-3" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <span className="text-3xl">💳</span>
          <h3 className="font-semibold mt-2">Jak unikać długów</h3>
          <p className="text-sm text-gray-500">8 min czytania</p>
        </div>
      </div>
    </WidgetGridLayout>
  );
};

export default EducationPage;