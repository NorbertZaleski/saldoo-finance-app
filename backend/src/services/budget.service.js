import Budget from "../models/Budget.model.js";
import User from "../models/User.model.js";
import Category from "../models/Category.model.js";
import mongoose from "mongoose";

class BudgetService {
    //Pobiera budżet usera
    static async getUserBudgets(userId){
        const user = await User.findById(userId);

        if (!user){
            throw new Error('Użytkownik nie znaleziony');
        }

        //user: req.user.id
        const budgets = await Budget.find({ user: userId }).populate('categories');

        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            budgets: budgets
        };
    }

    //Tworzy nowy budżet
    static async createBudget(userId, data) {
        const {name, categories, limit, month, year, alertThreshold} = data;

        if (!name || !categories || !limit) {
            throw new Error('Brak któregoś z wymaganych pól: name, categories, limit');
        }

        if (name.length < 3) {
            throw new Error('Nazwa budżetu musi mieć co najmniej 3 znaki');
        }

        if (limit <= 0) {
            throw new Error('Limit musi być większy od 0');
        }

        if (!Array.isArray(categories) || categories.length === 0) {
            throw new Error('Budżet musi mieć co najmniej jedną kategorię');
        }

        // Sprawdź czy użytkownik istnieje
        const foundUser = await User.findById(userId);
        if (!foundUser) {
            throw new Error('Użytkownik nie znaleziony');
        }

        // Sprawdź czy budżet już istnieje
        const now = new Date();
        const existingBudget = await Budget.findOne({
            user: userId,
            name: name,
            month: now.getMonth(),
            year: now.getFullYear()
        });

        if (existingBudget) {
            throw new Error(`Budżet "${name}" już istnieje w tym okresie`);
        }

        const categoryIds = await Promise.all(
            categories.map(async (cat) => {
                if (typeof cat === 'string' && mongoose.isValidObjectId(cat)) {
                    return cat;
                }

                const category = await Category.findOneAndUpdate(
                    { user: userId, name: cat.name },
                    {
                        $setOnInsert: {
                            user: userId,
                            name: cat.name,
                            icon: cat.icon,
                            limit: cat.budget,
                            subcategories: (cat.subcategories || []).map(sub => ({
                                name: sub.name,
                                icon: sub.icon,
                                limit: sub.budget
                            }))
                        }
                    },
                    { new: true, upsert: true }
                );
                return category._id;
            })
        );

        // Krok 2: stwórz budżet z referencjami do stworzonych kategorii
        const budget = await Budget.create({
            user: userId,
            categories: categoryIds,
            limit,
            month: now.getMonth(),
            year: now.getFullYear(),
            isActive: true
        });

        return budget.populate('categories');
    }

    static async addSubcategory(userId, budgetId, categoryId, data) {
        if (!data?.name) {
            throw new Error('Nazwa subkategorii jest wymagana');
        }

        const budget = await Budget.findOne({ _id: budgetId, user: userId });
        if (!budget) {
            throw new Error('Budżet nie znaleziony');
        }

        const belongsToBudget = budget.categories.some(
            (id) => id.toString() === categoryId
        );
        if (!belongsToBudget) {
            throw new Error('Ta kategoria nie należy do wskazanego budżetu');
        }

        const category = await Category.findOne({ _id: categoryId, user: userId });
        if (!category) {
            throw new Error('Kategoria nie znaleziona');
        }

        category.subcategories.push({
            name: data.name,
            icon: data.icon,
            limit: data.budget // front wysyła "budget", model ma "limit" — jak przy createBudget
        });

        await category.save();
        return category;
    }

};

export default BudgetService;