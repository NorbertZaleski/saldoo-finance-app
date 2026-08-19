import express from "express";
import BudgetService from "../services/budget.service.js";

export const getBudget = async (req,res) => {
    try {
        //testowy potem = req.user.id;
         const userId = req.user?.id || '507f1f77bcf86cd799439012';

        const data = await BudgetService.getUserBudget(userId);

        res.status(200).json({
            success: true,
            user: data.user,
            data: data.budget,
            count: data.budget.length
        });
        console.log("userId: ", userId._id);
    } catch (error) {
        console.log("Error in getBudget controller", error);

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

