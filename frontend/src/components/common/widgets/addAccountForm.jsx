import { useState } from 'react';

const ACCOUNT_TYPES = [
    { value: 'cash', label: 'Gotówka', icon: '💵' },
    { value: 'savings', label: 'Oszczędności', icon: '💰' },
    { value: 'checking', label: 'Konto osobiste', icon: '🏦' },
    { value: 'investment', label: 'Inwestycje', icon: '📈' },
    { value: 'other', label: 'Inne', icon: '📁' }
];

const AddAccountForm = ({ onSubmit, onCancel }) => {
    const [type, setType] = useState('cash');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const preset = ACCOUNT_TYPES.find((t) => t.value === type);

        onSubmit({
            name: formData.get('name'),
            type,
            icon: preset?.icon || '📁',
            currency: 'PLN',
            balance: parseFloat(formData.get('balance')) || 0,
            source: 'manual'
        });
        e.target.reset();
        setType('cash');
    };

    return (
        <div className="mt-4 p-4 bg-white/10 rounded-lg border border-white/20">
            <h4 className="text-white font-medium mb-3">Dodaj źródło salda</h4>
            <form onSubmit={handleSubmit}>
                <div className="space-y-3">
                    <div>
                        <label className="block text-white/60 text-xs mb-1">Typ</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full p-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        >
                            {ACCOUNT_TYPES.map((t) => (
                                <option key={t.value} value={t.value} className="bg-slate-800">
                                    {t.icon} {t.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input
                        name="name"
                        placeholder="Nazwa (np. Gotówka w portfelu)"
                        className="w-full p-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
                        required
                    />

                    <input
                        name="balance"
                        type="number"
                        step="0.01"
                        placeholder="Aktualne saldo"
                        className="w-full p-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
                    />

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            Dodaj
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 bg-white/10 text-white p-2 rounded-lg hover:bg-white/20 transition"
                        >
                            Anuluj
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddAccountForm;