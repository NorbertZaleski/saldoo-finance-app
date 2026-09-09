import Icon from "../components/common/icons/Icon";
import PlusIcon from "../components/common/icons/PlusIcon";
import { formatCurrency } from "../utils/budgetFormat";

const TransactionsPage = ({
    transactions = [{
        _id: '1',
        name: 'Zakupy spożywcze',
        amount: 187.50,
        icon: 'food',
    },
    {
        _id: '2',
        name: 'Czynsz za mieszkanie',
        amount: 2450.00,
        icon: 'home',
    },], 
    currency = 'zł',
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
        <div className="p-6 bg-bg rounded-xl">
            <div className="flex flex-wrap justify-between items-center gap-4">
                <h1 className="text-2xl font-bold text-white p-6">
                    {'Wszystkie transakcje'}
                </h1>
                <PlusIcon name="plus" size={24} />
            </div>
            <div>
                Wyszukiwarka tu + filtry
            </div>
            <div className="space-y-6 bg-white/5 p-4 rounded-lg">
                {transactions.map((transaction) => {
                    return (
                    <div
                        key={transaction._id}
                        className="rounded-lg p-3 hover:bg-white/5 transition"
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
                                            {formatCurrency(transaction.amount, currency)}
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