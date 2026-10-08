import {
  CheckCircle2,
  Clock3,
  CreditCard,
} from "lucide-react";

export default function BillCard({ bill, onPay }) {
  return (
    <div className="luxury-card rounded-3xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-[#9b8060]">
            {bill.category}
          </p>

          <h3 className="mt-1 text-lg font-semibold text-[#4c3d31]">
            {bill.title}
          </h3>

          <p className="mt-1 text-xs text-[#81766b]">
            {bill.due}
          </p>
        </div>

        {bill.paid ? (
          <CheckCircle2 className="text-green-700" />
        ) : (
          <Clock3 className="text-[#a0805d]" />
        )}
      </div>

      <div className="mt-6 flex items-end justify-between gap-4">
        <p className="text-2xl font-semibold text-[#45372c]">
          ${bill.amount.toFixed(2)}
        </p>

        {bill.paid ? (
          <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
            Paid
          </span>
        ) : (
          <button
            onClick={() => onPay(bill)}
            className="primary-btn flex items-center gap-2 rounded-full px-4 py-2.5 text-sm"
          >
            <CreditCard size={15} />
            Pay
          </button>
        )}
      </div>
    </div>
  );
}