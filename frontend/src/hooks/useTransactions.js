import { useCallback, useEffect, useState } from "react";
import { extractTransactionsList } from "../utils/transactions.utils";
import { transactionsService } from "../services/transactions.service";

export function useTransactions() {
    const [allTransactions, setAllTransactions] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const load = useCallback(async ()=> {
        try {
            setLoading(true);
            const response = await transactionsService.getTransactions();
            setAllTransactions(extractTransactionsList(response));
            setUser(response.user || null);
            setError(null);
        } catch (error) {
            console.error('Błąd pobierania transakcji:', error);
            setError(error.message || 'Nie udało się pobrać transakcji');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(()=> {
        load();
    }, [load]);

    const getTransactions = useCallback(()=>{
        const found = allTransactions.find();
        return found;
    }, [allTransactions, user]);



    return {
        allTransactions,
        user,
        loading,
        error,
        getTransactions,
 
        reload: load
    }
};