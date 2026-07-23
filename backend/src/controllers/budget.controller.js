import express from "express"
import Budget from "../models/Budget.model.js"

export const getBudget = async (req,res) => {
    try {
        //testowy userID!
        const user = await User.findOne();

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Brak użytkowników w bazie - utwórz najpierw użytkownika'
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
        res.status(201).json({message: "Budget created successfully"})
    } catch (error) {
        console.log("Error in createBudget controller", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const updateBudget = async(req,res) =>  {
    res.status(200).json({message:"yo updated budget"});
};

export const deleteBudget = async(req,res) => {
    res.status(200).json({message:"yo deleted budget"});
};