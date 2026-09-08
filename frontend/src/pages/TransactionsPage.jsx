import Icon from "../components/common/Icon";
import { formatCurrency } from "../utils/budgetFormat";

const TransactionsPage = ({
    transactions = [{
        _id: '1',
        name: 'Zakupy spożywcze',
        spent: 187.50,
        icon: 'food',
    },
    {
        _id: '2',
        name: 'Czynsz za mieszkanie',
        spent: 2450.00,
        icon: 'home',
    },], 
    currency = 'zł',
    icon = 'Wallet',
    onDeleteTransaction,
    isTransactionDeletable = false,
}) => {

    if (!transactions.length) {
        return (
            <div className="text-center text-white/60 py-8">
                <p>Brak transakcji do wyświetlenia</p>
            </div>
        );
    }

return (
        <div className="p-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
                <h1 className="text-2xl font-bold text-white p-6">
                    {'Wszystkie transakcje'}
                </h1>

            </div>

            <div className="space-y-6">
                {transactions.map((transaction) => {
                    return (
                    <div
                        key={transaction._id}
                        className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition"
                    >
                        <div className="flex items-center justify-center">
                            <div className="flex flex-1 items-center gap-3">
                                <span className="text-xl"><Icon name={transaction.icon} size={24} className="text-white"/></span>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-white">
                                            {transaction.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-white/40">
                                        <span>
                                            {formatCurrency(transaction.spent, currency)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
                })}
            </div>
        </div>
    );
};

export default TransactionsPage;