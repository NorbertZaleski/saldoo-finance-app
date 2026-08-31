const MonthYearPicker = ({ month, year, onChange, yearsBack = 2, yearsForward = 2 }) => {
    const yearsRange = yearsBack + yearsForward + 1;

    return (
        <div className="flex gap-2">
            <select
                className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-1.5 text-sm"
                value={month}
                onChange={(e) => onChange(parseInt(e.target.value), year)}
            >
                {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i}>
                        {new Date(0, i).toLocaleString('pl-PL', { month: 'long' })}
                    </option>
                ))}
            </select>
            <select
                className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-1.5 text-sm"
                value={year}
                onChange={(e) => onChange(month, parseInt(e.target.value))}
            >
                {Array.from({ length: yearsRange }, (_, i) => {
                    const y = new Date().getFullYear() - yearsBack + i;
                    return <option key={y} value={y}>{y}</option>;
                })}
            </select>
        </div>
    );
};

export default MonthYearPicker;