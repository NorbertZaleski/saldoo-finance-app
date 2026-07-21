import express from "express"

export const getBudget = async (req,res) => {
    res.status(200).send("dis yo budget bruv");
};

export const createBudget = async(req,res) => {
    res.status(201).json({message:"yo created budget"});
};

export const updateBudget = async(req,res) =>  {
    res.status(200).json({message:"yo updated budget"});
};

export const deleteBudget = async(req,res) => {
    res.status(200).json({message:"yo deleted budget"});
};