import { useState } from "react";
import {
  CarFront,
  MapPin,
  Navigation,
  Clock3,
  CheckCircle2,
} from "lucide-react";
import SectionTitle from "../components/SectionTitle";

const carts = [
  {
    id: "GC-01",
    location: "Main Gate",
    zone: "North",
    status: "Available",
    eta: "2 min",
  },
  {
    id: "GC-02",
    location: "Garden Café",
    zone: "Central",
    status: "On Route",
    eta: "5 min",
  },
  {
    id: "GC-03",
    location: "Parking Garage",
    zone: "South",
    status: "Available",
    eta: "3 min",
  },
  {
    id: "GC-04",
    location: "Community Pool",
    zone: "West",
    status: "Available",
    eta: "4 min",
  },
];

const zones = [
  "Main Gate",
  "Garden Café",
  "Parking Garage",
  "Community Pool",
  "Residents Gym",
  "Cinema",
];

export default function GolfCart() {
  const [pickup, setPickup] = useState("Main Gate");
  const [requested, setRequested] = useState(false);

  const nearestCart = carts.find((cart) => cart.status === "Available");

  const requestCart = (e) => {
    e.preventDefault();
    setRequested(true);
  };

  return (
    <div className="min-h-screen">
      <section className="bg-[#e9e0d4] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Resident Mobility"
            title="Your ride around the community."
            description="Request a golf cart and find the nearest available cart from your current area."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        {requested && (
          <div className="mb-7 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            <CheckCircle2 size={20} />
            Golf cart requested successfully. Your cart is on the way.
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="luxury-card rounded-3xl p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eee7dc] text-[#6d5945]">
              <CarFront size={23} />
            </div>

            <h2 className="serif mt-6 text-3xl text-[#46372b]">
              Request a golf cart
            </h2>

            <form onSubmit={requestCart} className="mt-7 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#5d5044]">
                  Pick-up location
                </label>

                <select
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full rounded-2xl border border-[#ded4c7] bg-white px-4 py-3.5 text-sm outline-none"
                >
                  {zones.map((zone) => (
                    <option key={zone}>{zone}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#5d5044]">
                  Destination
                </label>

                <select className="w-full rounded-2xl border border-[#ded4c7] bg-white px-4 py-3.5 text-sm outline-none">
                  {zones.map((zone) => (
                    <option key={zone}>{zone}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="primary-btn flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold"
              >
                <Navigation size={17} />
                Request Golf Cart
              </button>
            </form>
          </div>

          <div>
            <div className="luxury-card rounded-3xl p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a48664]">
                    Nearest available
                  </p>

                  <h2 className="serif mt-2 text-3xl text-[#46372b]">
                    {nearestCart.id}
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                  <CarFront size={23} />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[#f5f0e8] p-4">
                  <p className="text-xs text-[#8b7d70]">Location</p>
                  <p className="mt-1 font-semibold text-[#57483b]">
                    {nearestCart.location}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#f5f0e8] p-4">
                  <p className="text-xs text-[#8b7d70]">Estimated arrival</p>
                  <p className="mt-1 font-semibold text-[#57483b]">
                    {nearestCart.eta}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 space-y-3">
              {carts.map((cart) => (
                <div
                  key={cart.id}
                  className="luxury-card flex items-center justify-between rounded-2xl p-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eee7dc] text-[#6d5945]">
                      <CarFront size={20} />
                    </div>

                    <div>
                      <p className="font-semibold text-[#55463a]">
                        {cart.id}
                      </p>

                      <p className="mt-1 flex items-center gap-1 text-xs text-[#81766b]">
                        <MapPin size={13} />
                        {cart.location}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        cart.status === "Available"
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {cart.status}
                    </span>

                    <p className="mt-2 flex items-center justify-end gap-1 text-xs text-[#81766b]">
                      <Clock3 size={13} />
                      {cart.eta}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}