import { useMemo, useState } from "react";
import { useLocale } from "../../hooks/useLocale.js";
import { formatDate } from "../../utils/date.utils.js";
import { groupTransactionsByDay } from "../../utils/transactions.utils.js";
import TransactionItem from "./TransactionItem.jsx";
import SearchBox from "../common/SearchBox.jsx";

export default function TransactionList({ transactions, currency }) {
    const locale = useLocale();
    const [search, setSearch] = useState("");


    const filtered = useMemo(() => {
        if (!search.trim()) return transactions;
        const q = search.toLowerCase();
        return transactions.filter((t) => t.name.toLowerCase().includes(q));
    }, [transactions, search]);


    const grouped = useMemo(
        () => groupTransactionsByDay(filtered),
        [filtered]
    );

    return (
        <div className="p-6 space-y-2 bg-bg rounded-xl">

            <div className="flex flex-wrap justify-between items-center p-3 bg-white/5 rounded-xl text-main-text">
                <SearchBox value={search} onChange={setSearch}></SearchBox>
                <div className="flex flex-wrap justify-between items-center gap-2">
                    <button className=" border-[1px] border-white/30 rounded-full py-1 px-2">Kwota</button>
                    <button className=" border-[1px] border-white/30 rounded-full py-1 px-2">Okres</button>
                    <button className=" border-[1px] border-white/30 rounded-full py-1 px-2">Kategoria</button>
                </div>
            </div>

            <div className="space-y-2 bg-white/5 p-4 rounded-xl">
            {grouped.length === 0 && (
            <div className="text-main-text/50 text-sm px-3 py-4">
                Brak transakcji spełniających kryteria
            </div>
            )}

            {grouped.map(([date, dayTransactions], index) => (
                <div
                key={date}
                className={index > 0 ? "mt-4 pt-4 border-t border-white/5 transition" : ""}
                >
                    <div className="text-main-text text-sm px-3 mb-2">
                        {formatDate(date, locale)}
                    </div>

                    <div className="space-y-2">
                        {dayTransactions.map((t) => (
                        <TransactionItem
                            key={t._id}
                            transaction={t}
                            currency={currency}
                            locale={locale}
                        />
                        ))}
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
}