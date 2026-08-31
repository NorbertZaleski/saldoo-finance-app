import { useState } from 'react';

// mode: 'create-budget' (brak istniejącego budżetu — tworzymy budżet + 1 kategorię)
//     | 'add-to-budget' (budżet już istnieje — dodajemy kolejną kategorię/podkategorię)
const AddCategoryForm = ({
    mode = 'add-to-budget',
    existingCategories = [],
    parentCategories = [],
    onSubmit,
    onCancel
}) => {
    const [sourceMode, setSourceMode] = useState(existingCategories.length ? 'existing' : 'new');
    const [selectedExistingName, setSelectedExistingName] = useState(existingCategories[0]?.name || '');
    const [parentId, setParentId] = useState(''); // '' = nowa nadkategoria (top-level)
    const [subcategoryNames, setSubcategoryNames] = useState(['']);

    const canPickParent = mode === 'add-to-budget' && parentCategories.length > 0;

    const addSubcategoryField = () => setSubcategoryNames((prev) => [...prev, '']);
    const updateSubcategoryField = (idx, value) =>
        setSubcategoryNames((prev) => prev.map((v, i) => (i === idx ? value : v)));
    const removeSubcategoryField = (idx) =>
        setSubcategoryNames((prev) => prev.filter((_, i) => i !== idx));

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        // --- Ścieżka: dodanie PODKATEGORII do już istniejącej nadkategorii ---
        if (canPickParent && parentId) {
            const subName =
                sourceMode === 'existing'
                    ? selectedExistingName
                    : formData.get('name');

            const existingMatch = existingCategories.find((c) => c.name === subName);

            onSubmit({
                _isSubcategory: true,
                parentCategoryId: parentId,
                id: Date.now(),
                name: subName,
                icon: existingMatch?.icon || formData.get('icon') || '📁',
                budget: existingMatch?.budget ?? (parseFloat(formData.get('budget')) || 0),
                spent: 0
            });
            e.target.reset();
            return;
        }

        // --- Ścieżka: wybór GOTOWEJ kategorii z historii (jako nowa nadkategoria) ---
        if (sourceMode === 'existing') {
            const match = existingCategories.find((c) => c.name === selectedExistingName);
            if (!match) return;
            onSubmit({
                id: Date.now(),
                name: match.name,
                icon: match.icon,
                budget: match.budget,
                spent: 0,
                subcategories: match.subcategories.map((s) => ({
                    id: Date.now() + Math.random(),
                    name: s.name,
                    icon: s.icon,
                    budget: 0,
                    spent: 0
                }))
            });
            e.target.reset();
            return;
        }

        // --- Ścieżka: zupełnie NOWA nadkategoria (+ opcjonalne podkategorie) ---
        onSubmit({
            id: Date.now(),
            name: formData.get('name'),
            icon: formData.get('icon') || '📁',
            budget: parseFloat(formData.get('budget')) || 0,
            spent: 0,
            subcategories: subcategoryNames
                .map((n) => n.trim())
                .filter(Boolean)
                .map((n) => ({
                    id: Date.now() + Math.random(),
                    name: n,
                    icon: '📁',
                    budget: 0,
                    spent: 0
                }))
        });
        e.target.reset();
        setSubcategoryNames(['']);
    };

    return (
        <div className="mt-4 p-4 bg-white/10 rounded-lg border border-white/20">
            <h4 className="text-white font-medium mb-3">
                {mode === 'create-budget' ? 'Dodaj pierwszą kategorię' : 'Dodaj kategorię'}
            </h4>

            <form onSubmit={handleSubmit}>
                <div className="space-y-3">

                    {canPickParent && (
                        <div>
                            <label className="block text-white/60 text-xs mb-1">
                                Nadkategoria
                            </label>
                            <select
                                value={parentId}
                                onChange={(e) => setParentId(e.target.value)}
                                className="w-full p-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            >
                                <option value="" className="bg-slate-800">
                                    — Nowa nadkategoria —
                                </option>
                                {parentCategories.map((c) => (
                                    <option key={c.id} value={c.id} className="bg-slate-800">
                                        {c.icon} {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {existingCategories.length > 0 && (
                        <div className="flex gap-2 text-sm">
                            <button
                                type="button"
                                onClick={() => setSourceMode('existing')}
                                className={`flex-1 p-2 rounded-lg transition ${
                                    sourceMode === 'existing'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                                }`}
                            >
                                Wybierz istniejącą
                            </button>
                            <button
                                type="button"
                                onClick={() => setSourceMode('new')}
                                className={`flex-1 p-2 rounded-lg transition ${
                                    sourceMode === 'new'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                                }`}
                            >
                                Nowa nazwa
                            </button>
                        </div>
                    )}

                    {sourceMode === 'existing' && existingCategories.length > 0 ? (
                        <select
                            value={selectedExistingName}
                            onChange={(e) => setSelectedExistingName(e.target.value)}
                            className="w-full p-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        >
                            {existingCategories.map((c) => (
                                <option key={c.name} value={c.name} className="bg-slate-800">
                                    {c.icon} {c.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <>
                            <input
                                name="name"
                                placeholder="Nazwa kategorii"
                                className="w-full p-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
                                required
                            />
                            <div className="flex gap-3">
                                <input
                                    name="icon"
                                    placeholder="Ikona (emoji)"
                                    className="w-20 p-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
                                />
                                <input
                                    name="budget"
                                    type="number"
                                    placeholder="Budżet"
                                    className="flex-1 p-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </>
                    )}

                    {/* Podkategorie da się dodać tylko przy tworzeniu NOWEJ nadkategorii */}
                    {!parentId && sourceMode === 'new' && (
                        <div>
                            <label className="block text-white/60 text-xs mb-1">
                                Podkategorie (opcjonalnie)
                            </label>
                            {subcategoryNames.map((val, idx) => (
                                <div key={idx} className="flex gap-2 mb-2">
                                    <input
                                        value={val}
                                        onChange={(e) => updateSubcategoryField(idx, e.target.value)}
                                        placeholder="np. Paliwo"
                                        className="flex-1 p-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
                                    />
                                    {subcategoryNames.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeSubcategoryField(idx)}
                                            className="px-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addSubcategoryField}
                                className="text-blue-400 text-sm hover:text-blue-300"
                            >
                                + dodaj kolejną podkategorię
                            </button>
                        </div>
                    )}

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            {mode === 'create-budget' ? 'Stwórz budżet' : 'Dodaj'}
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

export default AddCategoryForm;