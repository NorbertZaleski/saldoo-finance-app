import { EllipsisVertical } from "lucide-react";
import Icon from "../common/icons/Icon";
import { formatCurrency } from "../../utils/budgetFormat.utils.js";

export default function TransactionItem({ transaction, currency, locale }) {
  return (
    <div className="rounded-lg p-3 hover:bg-white/5 transition">
      <div className="flex items-center justify-center">
        <div className="flex flex-1 items-center gap-4">
          <Icon
            name={transaction.icon}
            size={32}
            className="text-icons"
          />
          <div className="flex-1">
            <span className="font-medium text-md text-main-text">
              {transaction.name}
            </span>
            <div className="text-sm text-main-text/50">
              {formatCurrency(transaction.amount, currency, locale)}
            </div>
          </div>
        </div>
        <div className="text-icons">
          <EllipsisVertical size={20} />
        </div>
      </div>
    </div>
  );
}