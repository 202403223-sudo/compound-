import { useState } from "react";
import { CreditCard, ShieldCheck, X, CheckCircle2 } from "lucide-react";
import BillCard from "../components/BillCard";
import SectionTitle from "../components/SectionTitle";

const initialBills = [
  {
    id: 1,
    category: "Community",
    title: "Monthly Service Fee",
    due: "Due October 10, 2026",
    amount: 180,
    paid: false,
  },
  {
    id: 2,
    category: "Staff",
    title: "Doorman Contribution",
    due: "Due October 12, 2026",
    amount: 45,
    paid: false,
  },
  {
    id: 3,
    category: "Maintenance",
    title: "Building Maintenance",
    due: "Paid October 02, 2026",
    amount: 65,
    paid: true,
  },
  {
    id: 4,
    category: "Utilities",
    title: "Shared Utilities",
    due: "Due October 15, 2026",
    amount: 32.5,
    paid: false,
  },
];

export default function Payments() {
  const [bills, setBills] = useState(initialBills);
  const [selectedBill, setSelectedBill] = useState(null);
  const [paidMessage, setPaidMessage] = useState(false);

  const unpaidTotal = bills
    .filter((bill) => !bill.paid)
    .reduce((sum, bill) => sum + bill.amount, 0);

  const handlePay = (bill) => {
    setSelectedBill(bill);
    setPaidMessage(false);
  };

  const handlePayment = (e) => {
    e.preventDefault();

    setBills((current) =>
      current.map((bill) =>
        bill.id === selectedBill.id
          ? {
              ...bill,
              paid: true,
              due: "Paid just now",
            }
          : bill
      )
    );

    setPaidMessage(true);
  };

  const closeModal = () => {
    setSelectedBill(null);
    setPaidMessage(false);
  };

  return (
    <div className="min-h-screen">
      <section className="bg-[#e9e0d4] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Resident Payments"
            title="Simple, secure community payments."
            description="Manage service fees, staff contributions, maintenance and shared community expenses from one place."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <div className="mb-8 rounded-3xl bg-[#6d5945] p-7 text-white shadow-xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                Outstanding balance
              </p>

              <p className="mt-2 text-4xl font-semibold">
                ${unpaidTotal.toFixed(2)}
              </p>

              <p className="mt-2 text-sm text-white/65">
                Includes all currently unpaid community bills.
              </p>
            </div>

            <CreditCard size={42} className="text-white/50" />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {bills.map((bill) => (
            <BillCard key={bill.id} bill={bill} onPay={handlePay} />
          ))}
        </div>
      </section>

      {selectedBill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#302a25]/50 p-5 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-[#fdfbf8] p-7 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#9b8060]">
                  Secure payment
                </p>

                <h2 className="serif mt-1 text-3xl text-[#46372b]">
                  {selectedBill.title}
                </h2>
              </div>

              <button
                onClick={closeModal}
                className="rounded-full p-2 text-[#766b61] hover:bg-[#eee7dc]"
              >
                <X size={20} />
              </button>
            </div>

            {paidMessage ? (
              <div className="py-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-700">
                  <CheckCircle2 size={32} />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-[#4d3e32]">
                  Payment successful
                </h3>

                <p className="mt-2 text-sm text-[#7b7066]">
                  Your payment has been recorded in this frontend demo.
                </p>

                <button
                  onClick={closeModal}
                  className="primary-btn mt-6 rounded-full px-6 py-3 text-sm font-semibold"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handlePayment} className="mt-7 space-y-5">
                <div className="rounded-2xl bg-[#f3eee7] p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#81766b]">Amount</span>
                    <span className="font-semibold text-[#4c3d31]">
                      ${selectedBill.amount.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#5d5044]">
                    Cardholder name
                  </label>
                  <input
                    required
                    placeholder="Full name"
                    className="w-full rounded-2xl border border-[#ded4c7] bg-white px-4 py-3.5 text-sm outline-none focus:border-[#9c805f]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#5d5044]">
                    Card number
                  </label>
                  <input
                    required
                    inputMode="numeric"
                    maxLength={19}
                    placeholder="1234 5678 9012 3456"
                    className="w-full rounded-2xl border border-[#ded4c7] bg-white px-4 py-3.5 text-sm outline-none focus:border-[#9c805f]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#5d5044]">
                      Expiry
                    </label>
                    <input
                      required
                      placeholder="MM / YY"
                      className="w-full rounded-2xl border border-[#ded4c7] bg-white px-4 py-3.5 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#5d5044]">
                      CVV
                    </label>
                    <input
                      required
                      type="password"
                      maxLength={4}
                      inputMode="numeric"
                      placeholder="•••"
                      className="w-full rounded-2xl border border-[#ded4c7] bg-white px-4 py-3.5 text-sm outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="primary-btn flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold"
                >
                  <ShieldCheck size={17} />
                  Pay ${selectedBill.amount.toFixed(2)}
                </button>

                <p className="text-center text-xs text-[#8b8076]">
                  Demo payment only. No real card information is processed.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}