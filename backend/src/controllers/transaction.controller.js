import TransactionService from "../services/transaction.service";

export const getTransactions = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'Brak ID użytkownika'
            });
        }

        const transactions = await TransactionService.getUserTransactions(userId);
        console.log("Pobrano transakcje dla userId: ", userId);
        console.log("Transakcje: ", transactions);
    } catch (error) {
        console.log("Error in getTransactions controller", error);

        
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

export const getTransactionById = async (req,res) => {

};

export const createTransaction = async (req,res) => {

};

export const updateTransaction = async (req,res) => {

};

export const deleteTransaction = async (req,res) => {

};