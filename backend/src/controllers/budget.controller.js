import Budget from "../models/Budget.model.js";
import BudgetService from "../services/budget.service.js";

export const getBudgets = async (req,res) => {
    try {
        //testowy potem = req.user.id;
        const userId = req.user?.id || '507f1f77bcf86cd799439012';

        const data = await BudgetService.getUserBudgets(userId);

        console.log("Pobrano budżet dla userId:", userId);
        console.log("Liczba budżetów:", data.budgets?.length || 0);

        res.status(200).json({
            success: true,
            user: data.user,
            data: data.budgets,
            count: data.budgets.length
        });
    } catch (error) {
        console.log("Error in getBudgets controller", error);

        if (error.message === 'Użytkownik nie znaleziony') {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const createBudget = async(req,res) => {
    try {
        //tymczasowy user stały
        const userId = req.user?.id || '507f1f77bcf86cd799439012';
        // Docelowo: const userId = req.user.id;
        
        const budgetData = req.body;
        
        // Wywołaj serwis
        const newBudget = await BudgetService.createBudget(userId, budgetData);

        // Wyślij odpowiedź
        res.status(201).json({
            success: true,
            message: "Budget created successfully",
            data: newBudget
        });
    } catch (error) {
        console.log("Error in createBudget controller", error);
        res.status(400).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

export const updateBudget = async(req, res) => {

};

export const deleteBudget = async(req, res) => {
    try {
        //tymczasowy user stały
        const userId = req.user?.id || '507f1f77bcf86cd799439012';
            if (!userId) {
                return res.status(401).json({ message: "Brak autoryzacji." });
            }

        const budgetId = req.params.id;

        const deletedBudget = await Budget.findOneAndDelete({
            _id: budgetId,
            user: userId,
        });

        if (!deletedBudget) {
            return res.status(404).json({message: "Nie znaleziono budżetu lub nie masz do niego dostępu."});
        }

        res.status(200).json({
            message:"Budżet został usunięty",
            deletedBudget,
        });
    } catch (error) {
                if (error.name === 'CastError') {
            return res.status(400).json({ message: "Nieprawidłowy format ID budżetu." });
        }
        console.error("Błąd podczas usuwania budżetu:", error);
        res.status(500).json({ message: "Wystąpił błąd serwera podczas usuwania budżetu." });
    }
};