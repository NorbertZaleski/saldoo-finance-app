import mongoose from "mongoose";

// Subkategoria jest subdokumentem, nie osobną kolekcją — żyje wyłącznie
// wewnątrz swojej kategorii nadrzędnej (ma własne _id, ale nie własny model).
const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nazwa subkategorii jest wymagana'],
        trim: true
    },
    // Nazwa komponentu z lucide-react, np. "Fuel", "ShoppingCart" — nie emoji.
    icon: {
        type: String,
        default: 'Circle',
        trim: true
    },
    // Opcjonalny własny limit subkategorii. Jeśli brak — subkategoria
    // korzysta z limitu kategorii nadrzędnej.
    limit: {
        type: Number,
        min: [0, 'Limit nie może być ujemny']
    }
}, {
    timestamps: true
});

const categorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true
    },
    name: {
        type: String,
        required: [true, 'Nazwa kategorii jest wymagana'],
        trim: true,
        maxlength: [50, 'Nazwa kategorii jest za długa']
    },
    // Nazwa komponentu z lucide-react (np. "Home", "Car", "ShoppingBag").
    // Frontend mapuje ten string na konkretny komponent ikony.
    icon: {
        type: String,
        default: 'Circle',
        trim: true
    },
    color: {
        type: String,
        default: '#6366f1',
        trim: true
    },
    // Opcjonalny domyślny limit tej kategorii — używany przez
    // Budget.getCategoryStats() zamiast wspólnego limitu całego budżetu.
    limit: {
        type: Number,
        min: [0, 'Limit nie może być ujemny']
    },
    subcategories: [subcategorySchema],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Użytkownik nie powinien mieć dwóch kategorii o tej samej nazwie
categorySchema.index({ user: 1, name: 1 }, { unique: true });
categorySchema.index({ user: 1, isActive: 1 });

const Category = mongoose.model('Category', categorySchema);

export default Category;