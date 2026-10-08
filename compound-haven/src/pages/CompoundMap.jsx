import { useState } from "react";
import {
  ShieldCheck,
  Coffee,
  Film,
  ParkingSquare,
  Dumbbell,
  Waves,
  MapPin,
} from "lucide-react";
import SectionTitle from "../components/SectionTitle";

const places = [
  {
    name: "Main Gate",
    category: "Entrance",
    x: 18,
    y: 18,
    icon: ShieldCheck,
    description: "Main resident and visitor entrance.",
  },
  {
    name: "Garden Café",
    category: "Café",
    x: 58,
    y: 22,
    icon: Coffee,
    description: "Relaxing café for residents and guests.",
  },
  {
    name: "Cinema",
    category: "Entertainment",
    x: 76,
    y: 45,
    icon: Film,
    description: "Private cinema available for residents.",
  },
  {
    name: "Parking Garage",
    category: "Parking",
    x: 27,
    y: 67,
    icon: ParkingSquare,
    description: "Resident parking and visitor parking.",
  },
  {
    name: "Residents Gym",
    category: "Wellness",
    x: 63,
    y: 72,
    icon: Dumbbell,
    description: "Fully equipped residents fitness center.",
  },
  {
    name: "Community Pool",
    category: "Pool",
    x: 47,
    y: 45,
    icon: Waves,
    description: "Community swimming pool and lounge.",
  },
];

export default function CompoundMap() {
  const [selected, setSelected] = useState(places[0]);

  return (
    <div className="min-h-screen">
      <section className="bg-[#e9e0d4] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Explore Maison Verde"
            title="Your community at a glance."
            description="Explore the main facilities, entrances and resident services around the compound."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="relative h-[620px] overflow-hidden rounded-[32px] border border-[#d8ccbc] bg-[#e7dfd2] shadow-xl">
            <div className="absolute inset-7 rounded-[28px] border-2 border-dashed border-[#b8a995]" />

            <div className="absolute left-[8%] right-[8%] top-1/2 h-8 -translate-y-1/2 rounded-full bg-[#c7b8a3]" />

            <div className="absolute bottom-[10%] left-1/2 top-[10%] w-8 -translate-x-1/2 rounded-full bg-[#c7b8a3]" />

            <div className="absolute left-[10%] top-[33%] h-28 w-40 rounded-[40%] border-8 border-[#9db39b] bg-[#b9c9b3]" />

            <div className="absolute right-[8%] bottom-[14%] h-32 w-48 rounded-[50%] border-8 border-[#a6b9c4] bg-[#c4d8df]" />

            <div className="absolute right-[10%] top-[12%] h-28 w-44 rounded-3xl border-4 border-[#c1b09b] bg-[#d9cbb8]" />

            {places.map((place) => {
              const Icon = place.icon;
              const active = selected.name === place.name;

              return (
                <button
                  key={place.name}
                  onClick={() => setSelected(place)}
                  style={{
                    left: `${place.x}%`,
                    top: `${place.y}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    active ? "z-20 scale-110" : "z-10 hover:scale-105"
                  }`}
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-white shadow-lg ${
                      active
                        ? "bg-[#6d5945] text-white"
                        : "bg-white text-[#6d5945]"
                    }`}
                  >
                    <Icon size={22} />
                  </div>

                  <span className="mt-2 block whitespace-nowrap rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#55473a] shadow">
                    {place.name}
                  </span>
                </button>
              );
            })}
          </div>

          <aside className="luxury-card h-fit rounded-3xl p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eee6db] text-[#6d5945]">
              <MapPin size={22} />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#a48664]">
              Selected location
            </p>

            <h2 className="serif mt-2 text-3xl text-[#46372b]">
              {selected.name}
            </h2>

            <p className="mt-2 text-sm font-medium text-[#987c5e]">
              {selected.category}
            </p>

            <p className="mt-5 text-sm leading-7 text-[#7b7066]">
              {selected.description}
            </p>

            <button
              onClick={() => window.alert(`Directions to ${selected.name}`)}
              className="primary-btn mt-7 w-full rounded-full px-5 py-3 text-sm font-semibold"
            >
              Get Directions
            </button>

            <div className="mt-7 border-t border-[#e8dfd3] pt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#9b8060]">
                Community locations
              </p>

              <div className="mt-4 space-y-2">
                {places.map((place) => (
                  <button
                    key={place.name}
                    onClick={() => setSelected(place)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                      selected.name === place.name
                        ? "bg-[#eee7dc] font-semibold text-[#554536]"
                        : "text-[#74685d] hover:bg-[#f5f0e8]"
                    }`}
                  >
                    <place.icon size={17} />
                    {place.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}