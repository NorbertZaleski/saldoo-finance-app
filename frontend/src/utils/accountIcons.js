import { PiggyBank, Wallet, Landmark, CreditCard, Banknote } from 'lucide-react';

export const ACCOUNT_ICONS = {
    PiggyBank,
    Wallet,
    Landmark,
    CreditCard,
    Banknote,
};

export const getAccountIcon = (iconName) => {
    return ACCOUNT_ICONS[iconName] || PiggyBank;
};