import { useState } from "react";
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Home,
} from "lucide-react";
import SectionTitle from "../components/SectionTitle";

export default function RentPayment() {
  const [success, setSuccess] = useState(false);

  const rent = 1650;
  const serviceFee = 180;
  const total = rent + serviceFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div className="min-h-screen">
      <section className="bg-[#e9e0d4] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Rental Payment"
            title="Complete your monthly rent."
            description="A simple resident payment screen for managing your rental balance."
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="luxury-card rounded-3xl p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eee7dc] text-[#6d5945]">
              <Home size={22} />
            </div>

            <h2 className="serif mt-6 text-3xl text-[#46372b]">
              Café Corner Apartment
            </h2>

            <p className="mt-2 text-sm text-[#81766b]">
              Central Avenue · Residence 12
            </p>

            <div className="mt-8 space-y-4 border-t border-[#e8dfd3] pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-[#81766b]">Monthly rent</span>
                <span className="font-semibold text-[#4c3d31]">
                  ${rent.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-[#81766b]">Service fee</span>
                <span className="font-semibold text-[#4c3d31]">
                  ${serviceFee.toFixed(2)}
                </span>
              </div>

              <div className="border-t border-[#e8dfd3] pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-[#514236]">
                    Total due
                  </span>
                  <span className="text-xl font-semibold text-[#4c3d31]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="luxury-card rounded-3xl p-7">
            {success ? (
              <div className="py-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-700">
                  <CheckCircle2 size={34} />
                </div>

                <h2 className="serif mt-6 text-3xl text-[#46372b]">
                  Rent payment successful
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#7b7066]">
                  Your payment of ${total.toFixed(2)} has been recorded in
                  this frontend demonstration.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <CreditCard className="text-[#6d5945]" size={22} />

                  <h2 className="text-xl font-semibold text-[#4c3d31]">
                    Card payment
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="mt-7 space-y-5">
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
                    Pay ${total.toFixed(2)}
                  </button>

                  <p className="text-center text-xs text-[#8b8076]">
                    Frontend demo only. No real transaction is processed.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}