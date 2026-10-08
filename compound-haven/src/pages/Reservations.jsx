
import {
  CalendarDays,
  Clock3,
  MapPin,
  XCircle,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

import Calendar from "../components/Calendar";
import { useToast } from "../components/Toast";

const facilities = [
  {
    name: "Garden Café",
    location: "Central Garden",
    times: ["10:00 AM", "1:00 PM", "4:00 PM", "6:00 PM"],
  },
  {
    name: "Private Cinema",
    location: "Community Clubhouse",
    times: ["5:00 PM", "6:30 PM", "8:00 PM", "9:30 PM"],
  },
  {
    name: "Residents Gym",
    location: "Fitness Center",
    times: ["7:00 AM", "10:00 AM", "4:00 PM", "7:00 PM"],
  },
  {
    name: "Community Pool",
    location: "Pool Area",
    times: ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM"],
  },
];

const defaultReservations = [
  {
    id: 1,
    facility: "Garden Café",
    date: "2026-10-12",
    time: "6:00 PM",
    location: "Central Garden",
    status: "Upcoming",
    guests: 2,
  },
  {
    id: 2,
    facility: "Private Cinema",
    date: "2026-10-15",
    time: "8:00 PM",
    location: "Community Clubhouse",
    status: "Upcoming",
    guests: 4,
  },
  {
    id: 3,
    facility: "Residents Gym",
    date: "2026-09-28",
    time: "7:00 PM",
    location: "Fitness Center",
    status: "Completed",
    guests: 1,
  },
];

function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function Reservations() {
  const { showToast } = useToast();

  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem("reservations");

    return saved ? JSON.parse(saved) : defaultReservations;
  });

  const [selectedFacility, setSelectedFacility] =
    useState(facilities[0]);

  const [selectedDate, setSelectedDate] = useState("");

  const [selectedTime, setSelectedTime] = useState("");

  const [guests, setGuests] = useState(2);

  useEffect(() => {
    localStorage.setItem(
      "reservations",
      JSON.stringify(reservations)
    );
  }, [reservations]);

  const bookedDates = reservations
    .filter(
      (reservation) =>
        reservation.facility === selectedFacility.name &&
        reservation.status === "Upcoming"
    )
    .map((reservation) => reservation.date);

  const confirmReservation = () => {
    if (!selectedDate) {
      showToast("Please select a date.");
      return;
    }

    if (!selectedTime) {
      showToast("Please select a time.");
      return;
    }

    const exists = reservations.some(
      (reservation) =>
        reservation.facility === selectedFacility.name &&
        reservation.date === selectedDate &&
        reservation.time === selectedTime &&
        reservation.status === "Upcoming"
    );

    if (exists) {
      showToast("This time slot is already booked.");
      return;
    }

    const reservation = {
      id: Date.now(),
      facility: selectedFacility.name,
      date: selectedDate,
      time: selectedTime,
      location: selectedFacility.location,
      status: "Upcoming",
      guests,
    };

    setReservations((current) => [
      ...current,
      reservation,
    ]);

    showToast(
      `${selectedFacility.name} reservation confirmed.`
    );

    setSelectedDate("");
    setSelectedTime("");
    setGuests(2);
  };

  const cancelReservation = (reservation) => {
    setReservations((current) =>
      current.filter((item) => item.id !== reservation.id)
    );

    showToast(
      `${reservation.facility} reservation cancelled.`
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f5ef] dark:bg-[#11100e]">
      <section className="bg-[#e9e0d4] px-5 py-16 dark:bg-[#211c18] lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a48664]">
            Community Life
          </p>

          <h1 className="serif mt-3 text-5xl text-[#44372c] dark:text-[#f4ede3]">
            My Reservations
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#7c7167] dark:text-[#b8aa9b]">
            Manage your upcoming and previous community facility
            bookings.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_390px]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a48664]">
              Choose a Facility
            </p>

            <h2 className="serif mt-2 text-3xl text-[#44372c] dark:text-[#f4ede3]">
              Select where you want to go
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {facilities.map((facility) => (
                <button
                  key={facility.name}
                  type="button"
                  onClick={() => {
                    setSelectedFacility(facility);
                    setSelectedDate("");
                    setSelectedTime("");
                  }}
                  className={`rounded-3xl border p-5 text-left transition ${
                    selectedFacility.name === facility.name
                      ? "border-[#80674d] bg-[#f1e7da] shadow-md dark:bg-[#30271f]"
                      : "border-[#e8dfd3] bg-white hover:-translate-y-1 hover:shadow-lg dark:border-[#40382f] dark:bg-[#1b1815]"
                  }`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eee7dc] text-[#6d5945] dark:bg-[#30271f] dark:text-[#d8c3aa]">
                    <CalendarDays size={20} />
                  </div>

                  <h3 className="serif mt-4 text-xl text-[#44372c] dark:text-[#f4ede3]">
                    {facility.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-[#7c7167] dark:text-[#a99b8d]">
                    <MapPin size={13} />
                    {facility.location}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Calendar
            selectedDate={selectedDate}
            onSelectDate={(date) => {
              setSelectedDate(date);
              setSelectedTime("");
            }}
            bookedDates={bookedDates}
          />
        </div>

        <div className="mt-8 rounded-3xl border border-[#e8dfd3] bg-white p-6 dark:border-[#40382f] dark:bg-[#1b1815]">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8a7c6d]">
                Selected Date
              </p>

              <p className="mt-2 font-semibold text-[#44372c] dark:text-[#f4ede3]">
                {selectedDate
                  ? formatDate(selectedDate)
                  : "No date selected"}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8a7c6d]">
                Available Time
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {selectedFacility.times.map((time) => {
                  const booked = reservations.some(
                    (reservation) =>
                      reservation.facility ===
                        selectedFacility.name &&
                      reservation.date === selectedDate &&
                      reservation.time === time &&
                      reservation.status === "Upcoming"
                  );

                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={!selectedDate || booked}
                      onClick={() => setSelectedTime(time)}
                      className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                        booked
                          ? "cursor-not-allowed bg-[#eee8dd] text-[#aaa096] line-through"
                          : selectedTime === time
                            ? "border-[#80674d] bg-[#80674d] text-white"
                            : "border-[#ded4c7] text-[#594936] hover:border-[#80674d]"
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8a7c6d]">
                Guests
              </p>

              <div className="mt-2 flex gap-3">
                <select
                  value={guests}
                  onChange={(e) =>
                    setGuests(Number(e.target.value))
                  }
                  className="rounded-xl border border-[#ded4c7] bg-white px-4 py-2 text-sm dark:border-[#40382f] dark:bg-[#1b1815] dark:text-[#ded4c7]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(
                    (number) => (
                      <option key={number} value={number}>
                        {number}{" "}
                        {number === 1 ? "Guest" : "Guests"}
                      </option>
                    )
                  )}
                </select>

                <button
                  type="button"
                  onClick={confirmReservation}
                  className="rounded-xl bg-[#80674d] px-5 py-2 text-xs font-semibold text-white transition hover:bg-[#6d5741]"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a48664]">
              Your Schedule
            </p>

            <h2 className="serif mt-2 text-3xl text-[#44372c] dark:text-[#f4ede3]">
              Upcoming & Previous
            </h2>
          </div>

          {reservations.map((reservation) => (
            <article
              key={reservation.id}
              className="rounded-3xl border border-[#e8dfd3] bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl dark:border-[#40382f] dark:bg-[#1b1815]"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#eee7dc] text-[#6d5945] dark:bg-[#30271f] dark:text-[#d8c3aa]">
                    <CalendarDays size={23} />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="serif text-2xl text-[#44372c] dark:text-[#f4ede3]">
                        {reservation.facility}
                      </h2>

                      <span className="rounded-full bg-[#eee7dc] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#6d5945] dark:bg-[#30271f] dark:text-[#d8c3aa]">
                        {reservation.status}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#7c7167] dark:text-[#a99b8d]">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={14} />
                        {formatDate(reservation.date)}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Clock3 size={14} />
                        {reservation.time}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} />
                        {reservation.location}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Users size={14} />
                        {reservation.guests || 1} guests
                      </span>
                    </div>
                  </div>
                </div>

                {reservation.status === "Upcoming" && (
                  <button
                    type="button"
                    onClick={() =>
                      cancelReservation(reservation)
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-red-100 px-5 py-3 text-xs font-semibold text-red-700 transition hover:bg-red-50 dark:border-red-900/40 dark:text-red-300"
                  >
                    <XCircle size={16} />
                    Cancel
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}



