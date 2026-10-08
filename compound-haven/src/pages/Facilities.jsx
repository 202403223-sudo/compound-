
import { useState } from "react";
import {
  Coffee,
  Film,
  Dumbbell,
  Waves,
  CheckCircle2,
  X,
} from "lucide-react";

import FacilityCard from "../components/FacilityCard";
import SectionTitle from "../components/SectionTitle";

const facilities = [
  {
    id: 1,
    name: "Garden Café",
    description:
      "A peaceful community café serving residents throughout the day.",
    hours: "8 AM – 10 PM",
    capacity: "40 guests",
    icon: Coffee,
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    name: "Private Cinema",
    description:
      "A comfortable private cinema for family movie nights and gatherings.",
    hours: "10 AM – 11 PM",
    capacity: "18 guests",
    icon: Film,
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    name: "Residents Gym",
    description:
      "A modern fitness space exclusively available to community residents.",
    hours: "6 AM – 11 PM",
    capacity: "25 guests",
    icon: Dumbbell,
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 4,
    name: "Community Pool",
    description:
      "An outdoor pool surrounded by landscaped gardens and lounge areas.",
    hours: "7 AM – 9 PM",
    capacity: "50 guests",
    icon: Waves,
    image:
      "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function Facilities() {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00 AM");
  const [success, setSuccess] = useState(false);

  const openBooking = (facility) => {
    setSelectedFacility(facility);
    setSuccess(false);
    setDate("");
    setTime("10:00 AM");
  };

  const closeBooking = () => {
    setSelectedFacility(null);
    setSuccess(false);
  };

  const handleBooking = (e) => {
    e.preventDefault();

    if (!date) {
      window.alert("Please select a date.");
      return;
    }

    setSuccess(true);
  };

  return (
    <div className="min-h-screen">
      
      {/* HERO */}
      <section className="bg-[#e9e0d4] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Community Facilities"
            title="Spaces made for your lifestyle."
            description="Reserve your favorite community facilities and enjoy Maison Verde beyond your home."
          />
        </div>
      </section>

      {/* FACILITIES */}
      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-7 md:grid-cols-2">
          {facilities.map((facility) => (
            <FacilityCard
              key={facility.id}
              facility={facility}
              onReserve={openBooking}
            />
          ))}
        </div>
      </section>

      {/* BOOKING MODAL */}
      {selectedFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#302a25]/50 p-5 backdrop-blur-sm">
          
          <div className="relative w-full max-w-lg rounded-3xl bg-[#fdfbf8] p-7 shadow-2xl">
            
            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={closeBooking}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#eee7dc] text-[#594936] transition hover:bg-[#dfd3c3]"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {success ? (
              /* SUCCESS */
              <div className="py-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-700">
                  <CheckCircle2 size={33} />
                </div>

                <h2 className="serif mt-5 text-3xl text-[#46372b]">
                  Reservation confirmed
                </h2>

                <p className="mt-3 text-sm leading-7 text-[#7b7066]">
                  Your{" "}
                  <strong>{selectedFacility.name}</strong>{" "}
                  reservation is confirmed for{" "}
                  <strong>{date}</strong> at{" "}
                  <strong>{time}</strong>.
                </p>

                <button
                  type="button"
                  onClick={closeBooking}
                  className="primary-btn mt-6 rounded-full px-6 py-3 text-sm font-semibold"
                >
                  Done
                </button>
              </div>
            ) : (
              /* FORM */
              <>
                <p className="text-xs uppercase tracking-wider text-[#9b8060]">
                  Facility reservation
                </p>

                <h2 className="serif mt-1 pr-10 text-3xl text-[#46372b]">
                  {selectedFacility.name}
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#7b7066]">
                  Choose your preferred date and time for your community
                  facility reservation.
                </p>

                <form
                  onSubmit={handleBooking}
                  className="mt-7 space-y-5"
                >
                  
                  {/* DATE */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#5d5044]">
                      Reservation date
                    </label>

                    <input
                      required
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-2xl border border-[#ded4c7] bg-white px-4 py-3.5 text-sm outline-none"
                    />
                  </div>

                  {/* TIME */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#5d5044]">
                      Time
                    </label>

                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full rounded-2xl border border-[#ded4c7] bg-white px-4 py-3.5 text-sm outline-none"
                    >
                      <option>10:00 AM</option>
                      <option>12:00 PM</option>
                      <option>2:00 PM</option>
                      <option>4:00 PM</option>
                      <option>6:00 PM</option>
                      <option>8:00 PM</option>
                    </select>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeBooking}
                      className="secondary-btn w-1/2 rounded-full px-5 py-3 text-sm font-semibold"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="primary-btn w-1/2 rounded-full px-5 py-3 text-sm font-semibold"
                    >
                      Confirm Booking
                    </button>
                  </div>

                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

