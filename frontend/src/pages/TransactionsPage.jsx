import TransactionList from "../components/transactions/TransactionList";
import { useTransactions } from "../hooks/useTransactions";

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

    const {
        allTransactions,
        loading,
        error,
        user
    } = useTransactions();

    if (loading) return <div className="text-main-text/50 p-6">Ładowanie...</div>;
    if (error) return <div className="text-red-400 p-6">{error}</div>;

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
                <TransactionList transactions={allTransactions} currency={currency} />
                
            </div>
        </div>
    );
};

export default TransactionsPage;