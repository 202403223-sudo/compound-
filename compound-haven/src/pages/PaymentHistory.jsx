
import {
  CheckCircle2,
  Download,
  Receipt,
  CreditCard,
} from "lucide-react";
import { useToast } from "../components/Toast";

const payments = [
  {
    id: "MV-2026-10482",
    title: "Monthly Service Fee",
    amount: "$180.00",
    date: "October 5, 2026",
    status: "Paid",
  },
  {
    id: "MV-2026-10371",
    title: "Doorman Contribution",
    amount: "$45.00",
    date: "September 28, 2026",
    status: "Paid",
  },
  {
    id: "MV-2026-10264",
    title: "Building Maintenance",
    amount: "$65.00",
    date: "September 5, 2026",
    status: "Paid",
  },
];

export default function PaymentHistory() {
  const { showToast } = useToast();

  const downloadReceipt = (payment) => {
    showToast(
      `Receipt ${payment.id} is ready. This is a frontend demonstration.`
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f5ef]">

      <section className="bg-[#e9e0d4] px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a48664]">
            Resident Finance
          </p>

          <h1 className="serif mt-3 text-5xl text-[#44372c]">
            Payment History
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#7c7167]">
            Review your community payments and access demonstration receipts.
          </p>

        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">

        <div className="grid gap-5 md:grid-cols-3">

          <div className="rounded-3xl bg-[#6d5945] p-6 text-white">
            <CreditCard size={22} />

            <p className="mt-6 text-xs uppercase tracking-wider text-white/60">
              Total paid
            </p>

            <p className="serif mt-2 text-4xl">
              $290.00
            </p>
          </div>

          <div className="rounded-3xl border border-[#e8dfd3] bg-white p-6">

            <Receipt size={22} className="text-[#6d5945]" />

            <p className="mt-6 text-xs uppercase tracking-wider text-[#a48664]">
              Transactions
            </p>

            <p className="serif mt-2 text-4xl text-[#44372c]">
              3
            </p>

          </div>

          <div className="rounded-3xl border border-[#e8dfd3] bg-white p-6">

            <CheckCircle2 size={22} className="text-green-600" />

            <p className="mt-6 text-xs uppercase tracking-wider text-[#a48664]">
              Account status
            </p>

            <p className="mt-2 font-semibold text-[#44372c]">
              Up to date
            </p>

          </div>

        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-[#e8dfd3] bg-white">

          <div className="border-b border-[#eee7dc] p-6">
            <h2 className="serif text-3xl text-[#44372c]">
              Recent transactions
            </h2>
          </div>

          <div className="divide-y divide-[#eee7dc]">

            {payments.map((payment) => (
              <div
                key={payment.id}
                className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4efe7] text-[#6d5945]">
                    <Receipt size={20} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#44372c]">
                      {payment.title}
                    </h3>

                    <p className="mt-1 text-xs text-[#8a7c6d]">
                      {payment.date} · {payment.id}
                    </p>
                  </div>

                </div>

                <div className="flex items-center justify-between gap-5 md:justify-end">

                  <div className="text-right">

                    <p className="font-semibold text-[#44372c]">
                      {payment.amount}
                    </p>

                    <span className="mt-1 inline-flex items-center gap-1 text-xs text-green-700">
                      <CheckCircle2 size={13} />
                      {payment.status}
                    </span>

                  </div>

                  <button
                    type="button"
                    onClick={() => downloadReceipt(payment)}
                    className="secondary-btn inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold"
                  >
                    <Download size={15} />
                    Receipt
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

    </div>
  );
}

