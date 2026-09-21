import Icon from "../components/common/icons/Icon";
import PlusIcon from "../components/common/icons/PlusIcon";
import { Search, EllipsisVertical } from "lucide-react";
import { formatCurrency } from "../utils/budgetFormat.utils";
import TransactionList from "../components/transactions/TransactionList";

const TransactionsPage = ({
    transactions = [{
        _id: '1',
        name: 'Zakupy spożywcze',
        amount: 187.50,
        icon: 'food',
        date: '2026-09-21'
    },
    {
        _id: '2',
        name: 'Czynsz za mieszkanie',
        amount: 2450.00,
        icon: 'home',
        date: '2026-09-21'
    },
  {
        _id: '3',
        name: 'Paliwo',
        amount: 200.59,
        icon: 'car',
        date: '2026-09-20'
    },], 
    currency = 'zł',
    onDeleteTransaction,
    isTransactionDeletable = false,
}) => {

    if (!transactions.length) {
        return (
            <div className="text-center text-main-text/60 py-8">
                <p>Brak transakcji do wyświetlenia</p>
            </div>
        );
    }

return (
        <div className="p-6">
            <div>
                <TransactionList transactions={transactions} currency={currency} />
            </div>
        </div>
    );
};

export default TransactionsPage;