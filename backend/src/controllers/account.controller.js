import express from "express";

export const getAccount = async(req,res) => {
    res.status(200).send("yo dis acc");
};

export const updateAccount = async(req,res) => {
    res.status(200).json({message: "yo updated acc"});
};

export const deleteAccount = async(req,res) => {
    res.status(200).json({message: "yo deleted acc"});
};