import { useState, useEffect, useCallback } from 'react';
import { accountService } from '../services/account.service';

export function useAccounts() {
    const [accounts, setAccounts] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const load = useCallback(async () => {
        try {
            setLoading(true);
            const response = await accountService.getAccounts();
            setAccounts(response.accounts || []);
            setTotalBalance(response.totalBalance ?? 0);
            setError(null);
        } catch (err) {
            console.error('Błąd pobierania kont:', err);
            setError(err.message || 'Nie udało się pobrać kont');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const createAccount = useCallback(async (accountData) => {
        await accountService.createAccount(accountData);
        await load();
    }, [load]);

    return { accounts, totalBalance, loading, error, createAccount, reload: load };
}