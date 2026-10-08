import { useState } from "react";
import {
  Car,
  CheckCircle2,
  LockKeyhole,
  ParkingSquare,
} from "lucide-react";
import SectionTitle from "../components/SectionTitle";

const initialSpots = [
  { id: "A-01", level: "Level 1", status: "Available" },
  { id: "A-02", level: "Level 1", status: "Occupied" },
  { id: "A-03", level: "Level 1", status: "Available" },
  { id: "A-04", level: "Level 1", status: "Occupied" },
  { id: "B-01", level: "Level 2", status: "Available" },
  { id: "B-02", level: "Level 2", status: "Available" },
  { id: "B-03", level: "Level 2", status: "Occupied" },
  { id: "B-04", level: "Level 2", status: "Available" },
  { id: "C-01", level: "Level 3", status: "Occupied" },
  { id: "C-02", level: "Level 3", status: "Available" },
  { id: "C-03", level: "Level 3", status: "Available" },
  { id: "C-04", level: "Level 3", status: "Occupied" },
];

export default function Parking() {
  const [spots, setSpots] = useState(initialSpots);

  const [mySpot, setMySpot] = useState(
    localStorage.getItem("myParkingSpot") || ""
  );

  const availableCount = spots.filter(
    (spot) => spot.status === "Available"
  ).length;

  const chooseSpot = (spot) => {
    if (spot.status !== "Available") return;

    setMySpot(spot.id);
    localStorage.setItem("myParkingSpot", spot.id);
  };

  const releaseSpot = () => {
    setMySpot("");
    localStorage.removeItem("myParkingSpot");
  };

  const refreshAvailability = () => {
    setSpots((current) =>
      current.map((spot) => {
        if (spot.id === mySpot) {
          return { ...spot, status: "Available" };
        }

        return spot;
      })
    );
  };

  return (
    <div className="min-h-screen">
      <section className="bg-[#e9e0d4] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Resident Parking"
            title="A space when you need one."
            description="Check parking availability, reserve an available spot, and keep your selected garage space saved to your resident profile."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <div className="grid gap-7 md:grid-cols-3">
          <div className="luxury-card rounded-3xl p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eee7dc] text-[#6d5945]">
              <ParkingSquare size={21} />
            </div>

            <p className="mt-5 text-xs uppercase tracking-wider text-[#9b8060]">
              Available spaces
            </p>

            <p className="mt-1 text-3xl font-semibold text-[#4c3d31]">
              {availableCount}
            </p>
          </div>

          <div className="luxury-card rounded-3xl p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eee7dc] text-[#6d5945]">
              <Car size={21} />
            </div>

            <p className="mt-5 text-xs uppercase tracking-wider text-[#9b8060]">
              Total spaces
            </p>

            <p className="mt-1 text-3xl font-semibold text-[#4c3d31]">
              {spots.length}
            </p>
          </div>

          <div className="luxury-card rounded-3xl p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eee7dc] text-[#6d5945]">
              <CheckCircle2 size={21} />
            </div>

            <p className="mt-5 text-xs uppercase tracking-wider text-[#9b8060]">
              My parking spot
            </p>

            <p className="mt-1 text-3xl font-semibold text-[#4c3d31]">
              {mySpot || "Not selected"}
            </p>
          </div>
        </div>

        {mySpot && (
          <div className="mt-7 flex flex-col justify-between gap-4 rounded-3xl border border-[#ddd2c4] bg-[#f3eee7] p-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#9b8060]">
                Your reserved space
              </p>

              <h3 className="serif mt-1 text-2xl text-[#46372b]">
                Parking {mySpot}
              </h3>
            </div>

            <button
              onClick={releaseSpot}
              className="secondary-btn rounded-full px-5 py-3 text-sm font-semibold"
            >
              Release Space
            </button>
          </div>
        )}

        <div className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a48664]">
                Garage availability
              </p>

              <h2 className="serif mt-1 text-3xl text-[#46372b]">
                Select your space
              </h2>
            </div>

            <button
              onClick={refreshAvailability}
              className="hidden rounded-full border border-[#ded4c7] bg-white px-4 py-2 text-sm font-semibold text-[#665443] sm:block"
            >
              Refresh
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {spots.map((spot) => {
              const isAvailable = spot.status === "Available";
              const isMine = spot.id === mySpot;

              return (
                <button
                  key={spot.id}
                  disabled={!isAvailable}
                  onClick={() => chooseSpot(spot)}
                  className={`rounded-3xl border p-6 text-left transition ${
                    isMine
                      ? "border-[#6d5945] bg-[#eee7dc] shadow-lg"
                      : isAvailable
                      ? "border-[#ded4c7] bg-white hover:-translate-y-1 hover:shadow-lg"
                      : "cursor-not-allowed border-[#e5ddd2] bg-[#f0ece6] opacity-70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3eee7] text-[#6d5945]">
                      {isAvailable ? (
                        <ParkingSquare size={20} />
                      ) : (
                        <LockKeyhole size={20} />
                      )}
                    </div>

                    {isMine && (
                      <span className="rounded-full bg-[#6d5945] px-3 py-1 text-xs font-semibold text-white">
                        My Spot
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-[#4f4034]">
                    {spot.id}
                  </h3>

                  <p className="mt-1 text-xs text-[#81766b]">{spot.level}</p>

                  <p
                    className={`mt-5 text-xs font-semibold ${
                      isAvailable ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {isAvailable ? "Available" : "Occupied"}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}