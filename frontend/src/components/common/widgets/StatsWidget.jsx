import Widget from '../common/Widget/Widget';

const StatsWidget = ({ title, value, icon, change, size = 'medium' }) => {
  return (
    <Widget size={size} variant="glass">
      <Widget.Body>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/60 text-sm">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {change && (
              <p className={`text-sm mt-2 ${change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
              </p>
            )}
          </div>
          <div className="text-3xl opacity-60">{icon}</div>
        </div>
      </Widget.Body>
    </Widget>
  );
};

export default StatsWidget;