import { useMemo } from "react";
import PlusIcon from "../common/icons/PlusIcon";
import { Search, EllipsisVertical } from "lucide-react";
import { useLocale } from "../../hooks/useLocale.js";
import { formatDate } from "../../utils/date.utils.js";
//import { formatCurrency } from "@/utils/currency";
import { groupTransactionsByDay } from "../../utils/transactions.utils.js";
import TransactionItem from "./TransactionItem.jsx";

export default function TransactionList({ transactions, currency }) {
  const locale = useLocale();

  const grouped = useMemo(
    () => groupTransactionsByDay(transactions),
    [transactions]
  );

  return (
    <div className="p-6 space-y-2 bg-bg rounded-xl">

        <div className="flex flex-wrap justify-between items-center">
            <h1 className="text-2xl font-bold text-white p-6">
                {'Wszystkie transakcje'}
            </h1>
            <PlusIcon name="plus" size={24} />
        </div>

        <div className="flex flex-wrap justify-between items-center p-4 bg-white/5 rounded-xl text-main-text">
            <div className="flex flex-wrap justify-between items-center gap-2">
                <Search size={32}/>
                <span>Wyszukaj</span>
            </div>
            <div className="flex flex-wrap justify-between items-center gap-2">
                <div className=" border-[1px] border-white/30 rounded-full py-1 px-2">Kwota</div>
                <div className=" border-[1px] border-white/30 rounded-full py-1 px-2">Okres</div>
                <div className=" border-[1px] border-white/30 rounded-full py-1 px-2">Kategoria</div>
            </div>
        </div>

        <div className="space-y-2 bg-white/5 p-4 rounded-xl">
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