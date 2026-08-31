import Category from '../models/Category.js';

// UWAGA: zakładam, że middleware autoryzacji ustawia `req.user.id` / `req.user._id`
// (tak jak sugeruje interceptor z Bearer tokenem we frontendowym budgetService.js).
// Jeśli Twój middleware ustawia to inaczej (np. req.userId), popraw poniższe `req.user.id`.

// GET /category
// Zwraca wszystkie aktywne kategorie zalogowanego usera
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({
            user: req.user.id,
            isActive: true
        }).sort({ name: 1 });

        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        console.error('Błąd pobierania kategorii:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET /category/:id
export const getCategory = async (req, res) => {
    try {
        const category = await Category.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!category) {
            return res.status(404).json({ success: false, message: 'Kategoria nie znaleziona' });
        }

        res.status(200).json({ success: true, data: category });
    } catch (error) {
        console.error('Błąd pobierania kategorii:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// POST /category
// body: { name, icon, color, limit }
export const createCategory = async (req, res) => {
    try {
        const { name, icon, color, limit } = req.body;

        const category = await Category.create({
            user: req.user.id,
            name,
            icon,
            color,
            limit
        });

        res.status(201).json({ success: true, data: category });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ success: false, message: 'Masz już kategorię o tej nazwie' });
        }
        console.error('Błąd tworzenia kategorii:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// PUT /category/:id
// body: dowolny podzbiór { name, icon, color, limit, isActive }
export const updateCategory = async (req, res) => {
    try {
        const { name, icon, color, limit, isActive } = req.body;

        const category = await Category.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { $set: { name, icon, color, limit, isActive } },
            { new: true, runValidators: true, omitUndefined: true }
        );

        if (!category) {
            return res.status(404).json({ success: false, message: 'Kategoria nie znaleziona' });
        }

        res.status(200).json({ success: true, data: category });
    } catch (error) {
        console.error('❌ Błąd aktualizacji kategorii:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// DELETE /category/:id
// Miękkie usunięcie — kategoria mogła zostać już użyta w budżetach z poprzednich
// miesięcy i nie chcemy psuć historii. `isActive: false` chowa ją z list wyboru.
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { $set: { isActive: false } },
            { new: true }
        );

        if (!category) {
            return res.status(404).json({ success: false, message: 'Kategoria nie znaleziona' });
        }

        res.status(200).json({ success: true, data: category });
    } catch (error) {
        console.error('Błąd usuwania kategorii:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// POST /category/:id/subcategories
// body: { name, icon, limit }
export const addSubcategory = async (req, res) => {
    try {
        const { name, icon, limit } = req.body;

        const category = await Category.findOne({ _id: req.params.id, user: req.user.id });
        if (!category) {
            return res.status(404).json({ success: false, message: 'Kategoria nie znaleziona' });
        }

        category.subcategories.push({ name, icon, limit });
        await category.save();

        res.status(201).json({ success: true, data: category });
    } catch (error) {
        console.error('Błąd dodawania subkategorii:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// PUT /category/:id/subcategories/:subId
export const updateSubcategory = async (req, res) => {
    try {
        const { name, icon, limit } = req.body;

        const category = await Category.findOne({ _id: req.params.id, user: req.user.id });
        if (!category) {
            return res.status(404).json({ success: false, message: 'Kategoria nie znaleziona' });
        }

        const subcategory = category.subcategories.id(req.params.subId);
        if (!subcategory) {
            return res.status(404).json({ success: false, message: 'Subkategoria nie znaleziona' });
        }

        if (name !== undefined) subcategory.name = name;
        if (icon !== undefined) subcategory.icon = icon;
        if (limit !== undefined) subcategory.limit = limit;

        await category.save();

        res.status(200).json({ success: true, data: category });
    } catch (error) {
        console.error('Błąd aktualizacji subkategorii:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// DELETE /category/:id/subcategories/:subId
export const deleteSubcategory = async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id, user: req.user.id });
        if (!category) {
            return res.status(404).json({ success: false, message: 'Kategoria nie znaleziona' });
        }

        const subcategory = category.subcategories.id(req.params.subId);
        if (!subcategory) {
            return res.status(404).json({ success: false, message: 'Subkategoria nie znaleziona' });
        }

        subcategory.deleteOne();
        await category.save();

        res.status(200).json({ success: true, data: category });
    } catch (error) {
        console.error('❌ Błąd usuwania subkategorii:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};