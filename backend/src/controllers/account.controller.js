import Account from "../models/Account.model.js";

export const getAccounts = async(req,res) => {
    try {
        //testowy potem req.user.id
        const userId = req.user?.id || '507f1f77bcf86cd799439012';
        if (!userId) {
            return res.status(401).json({ success: false, message: "Brak autoryzacji" });
        }

        const accounts = await Account.find({ user: userId, isActive: true }).sort({ createdAt: 1 });
        const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

        console.log("Pobrane konta dla userId: ", userId);
        console.log("Liczba kont:", accounts?.length || 0);

        res.status(200).json({accounts, totalBalance});
    } catch (error) {
        console.log("Error in getAccounts controller", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const createAccount = async (req, res) => {
    try {

        const userId = req.user?.id || '507f1f77bcf86cd799439012';
        if (!userId) {
            return res.status(401).json({ success: false, message: "Brak autoryzacji" });
        }

        const { name, bankName, color, type, currency, balance, accountNumberLast4 } = req.body;
    
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Nazwa konta jest wymagana"
            });
        }

        const account = await Account.create({
            user: req.user.id,
            name,
            bankName,
            color,
            type,
            currency,
            balance,
            accountNumberLast4,
            source: 'manual'
        });

        res.status(201).json(account);
    } catch (error) {
        console.log("Error in createAccount controller", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const updateAccount = async(req,res) => {
    try {
        const account = await Account.findOne({_id: req.params.id, user: req.user.id});
        if (!account) {
            return res.status(404).json({message: "Nie znaleziono konta."});
        }

        const allowedFields =['name', 'bankName', 'color', 'type', 'currency', 'balance', 'accountNumberLast4', 'isActive'];
        allowedFields.forEach((field) => {
            if (req.body[field] !==undefined) {
                account[field] = req.body[field];
            }
        });

        await account.save();
        res.status(200).json(account);
    } catch (error) {
        console.log("Error in updateAccount controller", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const deleteAccount = async (req, res) => {
    try {
        const account = await Account.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { isActive: false },
            { new: true, runValidators: false }
        );

        if (!account) {
            return res.status(404).json({ message: "Nie znaleziono konta." });
        }

        res.status(200).json({ message: "Konto zostało usunięte." });
    } catch (error) {
        console.error("Error in deleteAccount controller", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};