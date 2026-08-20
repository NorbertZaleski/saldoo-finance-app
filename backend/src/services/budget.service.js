import Budget from "../models/Budget.model.js";
import User from "../models/User.model.js";

class BudgetService {
    //Pobiera budżet usera
    static async getUserBudgets(userId){
        const user = await User.findById(userId);

        if (!user){
            throw new Error('Użytkownik nie znaleziony');
        }

        //user: req.user.id
        const budgets = await Budget.find({user: userId});

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
        const {name, categories, limit, period = 'monthly'} = data;

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
            period: period,
            month: now.getMonth(),
            year: now.getFullYear()
        });

        if (existingBudget) {
            throw new Error(`Budżet "${name}" już istnieje w tym okresie`);
        }

        // Utwórz budżet
        const budget = await Budget.create({
            user: userId,
            name,
            categories,
            limit,
            period,
            month: now.getMonth(),
            year: now.getFullYear(),
            isActive: true
        });

        return budget;
    }



};

export default BudgetService;