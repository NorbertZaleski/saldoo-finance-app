import Transaction from "../models/Transaction.model";
import User from "../models/User.model";

class TransactionService {
    static async getUserTransactions(userId){
        const user = await User.findById(userId);

        if (!user){
            throw new Error('Użytkownik nie znaleziony');
        }

        //user: req.user.id
        const transactions = await Transaction.find({ userId })
            .populate('category', 'name icon')
            .sort({date: -1})

        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            transactions
        };
    }
};

export default TransactionService;