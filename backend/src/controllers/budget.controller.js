import express from "express"
import Budget from "../models/Budget.model.js"
import User from "../models/User.model.js";

export const getBudget = async (req,res) => {
    try {
        //testowy userID!
        const user = await User.findOne();

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Brak użytkowników w bazie'
            });
        }

        //user: req.user.id
        const budget = await Budget.find({user: user._id});

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            data: budget
        });
        console.log("user: ", user._id);
    } catch (error) {
        console.log("Error in getBudget controller", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const createBudget = async(req,res) => {
    try {
        const {user, categories, limit} = req.body;
        const newBudget = new Budget({user, categories, limit});
        await newBudget.save();
        res.status(201).json({message: "Budget created successfully"});
    } catch (error) {
        console.log("Error in createBudget controller", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const updateBudget = async(req,res) => {
    try {
        const {categories, limit, alertTreshold} = req.body;
        updatedBudget = await Budget.findByIdAndUpdate(
            req.params.id, 
            { categories, limit, alertTreshold },
            { new: true }
        );

        if (!updatedBudget) return res.status(404).json({message: "Bugdet not found"});

        res.status(200).json({message: "Budget updated successfully"});
    } catch (error) {
        console.log("Error in updateBudget controller", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const deleteBudget = async(req,res) => {
    try {
        const deletedBudget = await Budget.findByIdAndDelete(req.params.id);

        if (!deletedBudget) return res.status(404).json({message: "Bugdet not found"});
        res.status(200).json({message: "Note deleted successfully"});
    } catch (error) {
        console.log("Error in updateBudget controller", error);
        res.status(500).json({message: "Internal server error"});
    }
};