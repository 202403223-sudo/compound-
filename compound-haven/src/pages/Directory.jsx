import { useMemo, useState } from "react";
import {
  Search,
  UserRound,
  Mail,
  Phone,
  Building2,
} from "lucide-react";
import SectionTitle from "../components/SectionTitle";

const residents = [
  {
    id: 1,
    name: "Mariam Hassan",
    unit: "A-101",
    building: "Garden Residence",
    phone: "+20 100 000 1001",
    email: "mariam@example.com",
  },
  {
    id: 2,
    name: "Omar Khaled",
    unit: "A-204",
    building: "Garden Residence",
    phone: "+20 100 000 1002",
    email: "omar@example.com",
  },
  {
    id: 3,
    name: "Nour Ahmed",
    unit: "B-103",
    building: "Lounge Residence",
    phone: "+20 100 000 1003",
    email: "nour@example.com",
  },
  {
    id: 4,
    name: "Adam Youssef",
    unit: "B-301",
    building: "Lounge Residence",
    phone: "+20 100 000 1004",
    email: "adam@example.com",
  },
  {
    id: 5,
    name: "Laila Mostafa",
    unit: "C-102",
    building: "Oak District",
    phone: "+20 100 000 1005",
    email: "laila@example.com",
  },
  {
    id: 6,
    name: "Yassin Ali",
    unit: "C-205",
    building: "Oak District",
    phone: "+20 100 000 1006",
    email: "yassin@example.com",
  },
];

export default function Directory() {
  const [search, setSearch] = useState("");

  const filteredResidents = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return residents;

    return residents.filter((resident) =>
      `${resident.name} ${resident.unit} ${resident.building}`
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  return (
    <div className="min-h-screen">
      <section className="bg-[#e9e0d4] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Community Directory"
            title="Meet your neighbors."
            description="Find residents within the Maison Verde community and connect with your neighbors."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <div className="relative max-w-2xl">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a8b7d]"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, unit or building..."
            className="w-full rounded-full border border-[#ded4c7] bg-white py-4 pl-12 pr-5 text-sm outline-none focus:border-[#9c805f]"
          />
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredResidents.map((resident) => (
            <article
              key={resident.id}
              className="luxury-card rounded-3xl p-6 transition duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eee7dc] text-[#6d5945]">
                  <UserRound size={24} />
                </div>

                <div>
                  <h3 className="font-semibold text-[#4e4034]">
                    {resident.name}
                  </h3>

                  <p className="mt-1 flex items-center gap-1 text-xs text-[#84786d]">
                    <Building2 size={13} />
                    {resident.building} · {resident.unit}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3 border-t border-[#e8dfd3] pt-5">
                <a
                  href={`tel:${resident.phone}`}
                  className="flex items-center gap-3 text-sm text-[#68594b] hover:text-[#45372c]"
                >
                  <Phone size={16} />
                  {resident.phone}
                </a>

                <a
                  href={`mailto:${resident.email}`}
                  className="flex items-center gap-3 text-sm text-[#68594b] hover:text-[#45372c]"
                >
                  <Mail size={16} />
                  {resident.email}
                </a>
              </div>
            </article>
          ))}
        </div>

        {filteredResidents.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm text-[#81766b]">
              No residents found matching your search.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}