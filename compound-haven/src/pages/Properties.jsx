
import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";

export const properties = [
  {
    id: "garden-01",
    title: "Garden Residence 01",
    type: "For Sale",
    status: "Available",
    location: "Garden District",
    price: "$285,000",
    priceLabel: "$285,000",
    numericPrice: 285000,
    beds: 3,
    baths: 2,
    area: 185,
    description:
      "A bright family residence overlooking the landscaped gardens of Maison Verde.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Garden View", "Parking", "Security", "Balcony"],
  },
  {
    id: "cafe-corner",
    title: "Café Corner Apartment",
    type: "For Rent",
    status: "Available",
    location: "Café District",
    price: "$1,650 / month",
    priceLabel: "$1,650 / month",
    numericPrice: 1650,
    beds: 2,
    baths: 2,
    area: 125,
    description:
      "Elegant apartment steps away from the community café and social lounge.",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Café Access", "Parking", "Balcony", "Security"],
  },
  {
    id: "palm-villa",
    title: "Palm View Villa",
    type: "For Sale",
    status: "Available",
    location: "Palm Avenue",
    price: "$495,000",
    priceLabel: "$495,000",
    numericPrice: 495000,
    beds: 4,
    baths: 3,
    area: 310,
    description:
      "A spacious villa with a private garden, generous living areas and premium finishes.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Private Garden", "Parking", "Pool Access", "Security"],
  },
  {
    id: "lounge-12",
    title: "Lounge Residence 12",
    type: "For Rent",
    status: "Available",
    location: "Lounge District",
    price: "$2,050 / month",
    priceLabel: "$2,050 / month",
    numericPrice: 2050,
    beds: 3,
    baths: 2,
    area: 170,
    description:
      "Modern residence close to the cinema, gym and residents lounge.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Cinema Access", "Gym", "Parking", "Security"],
  },
  {
    id: "oak-07",
    title: "Oak House 07",
    type: "For Sale",
    status: "Available",
    location: "Oak Boulevard",
    price: "$360,000",
    priceLabel: "$360,000",
    numericPrice: 360000,
    beds: 3,
    baths: 3,
    area: 220,
    description:
      "Warm contemporary home with quiet surroundings and easy access to the community facilities.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Quiet Street", "Parking", "Garden", "Security"],
  },
  {
    id: "terrace-04",
    title: "Terrace Apartment 04",
    type: "For Rent",
    status: "Available",
    location: "Terrace Walk",
    price: "$1,050 / month",
    priceLabel: "$1,050 / month",
    numericPrice: 1050,
    beds: 1,
    baths: 1,
    area: 85,
    description:
      "A refined one-bedroom apartment with a private terrace and community access.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Private Terrace", "Parking", "Security"],
  },
];

export default function Properties() {
  const [allProperties, setAllProperties] = useState(properties);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const loadProperties = () => {
    try {
      const userListings = JSON.parse(
        localStorage.getItem("userListings") || "[]"
      );

      setAllProperties([...userListings, ...properties]);
    } catch {
      setAllProperties(properties);
    }
  };

  useEffect(() => {
    loadProperties();

    window.addEventListener("propertiesUpdated", loadProperties);

    return () => {
      window.removeEventListener("propertiesUpdated", loadProperties);
    };
  }, []);

  const filteredProperties = allProperties.filter((property) => {
    const matchesType =
      activeFilter === "All" || property.type === activeFilter;

    const searchText = search.toLowerCase();

    const matchesSearch =
      property.title?.toLowerCase().includes(searchText) ||
      property.location?.toLowerCase().includes(searchText);

    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8f5ef] pb-20 dark:bg-[#11100e]">
      <section className="border-b border-[#e8dfd3] bg-[#f4eee5] dark:border-[#302a25] dark:bg-[#171411]">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#9b8060]">
                Resident Marketplace
              </p>

              <h1 className="serif text-4xl text-[#44372c] md:text-5xl dark:text-[#f4ede3]">
                Properties
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#75695e] md:text-base dark:text-[#b8aa9b]">
                Discover apartments and villas available for sale or rent
                inside Maison Verde.
              </p>
            </div>

            <Link
              to="/add-property"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6d5945] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#594936]"
            >
              <Plus size={18} />
              List Your Property
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-10 lg:px-8">
        <div className="rounded-2xl border border-[#e8dfd3] bg-white p-4 shadow-sm dark:border-[#40382f] dark:bg-[#1b1815]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a8b7c]"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by property or location..."
                className="w-full rounded-xl border border-[#ded4c7] bg-[#fdfbf8] py-3 pl-11 pr-4 text-sm text-[#44372c] outline-none transition focus:border-[#a48664] dark:border-[#40382f] dark:bg-[#211c18] dark:text-[#f4ede3]"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 rounded-xl border border-[#ded4c7] px-4 py-3 text-sm font-medium text-[#594936] dark:border-[#40382f] dark:text-[#d8cbbb]"
              >
                <SlidersHorizontal size={17} />
                Filters
              </button>

              <div className="hidden items-center gap-2 md:flex">
                {["All", "For Sale", "For Rent"].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      activeFilter === filter
                        ? "bg-[#6d5945] text-white"
                        : "text-[#75695e] hover:bg-[#f4eee5] dark:text-[#b8aa9b] dark:hover:bg-[#302a25]"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 border-t border-[#eee7dc] pt-4 dark:border-[#40382f] md:hidden">
              <div className="grid grid-cols-3 gap-2">
                {["All", "For Sale", "For Rent"].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-xl px-3 py-2.5 text-xs font-semibold ${
                      activeFilter === filter
                        ? "bg-[#6d5945] text-white"
                        : "bg-[#f4eee5] text-[#75695e] dark:bg-[#302a25] dark:text-[#c8bcae]"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        {filteredProperties.length === 0 ? (
          <div className="rounded-2xl border border-[#e8dfd3] bg-white p-14 text-center dark:border-[#40382f] dark:bg-[#1b1815]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eee7dc] text-[#6d5945] dark:bg-[#302a25] dark:text-[#d8cbbb]">
              <span className="text-xl">⌂</span>
            </div>

            <h2 className="mt-4 text-xl font-semibold text-[#44372c] dark:text-[#f4ede3]">
              No properties found
            </h2>

            <p className="mt-2 text-sm text-[#75695e] dark:text-[#a99d90]">
              Try a different search or filter.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-[#75695e] dark:text-[#b8aa9b]">
                Showing{" "}
                <span className="font-semibold text-[#44372c] dark:text-[#f4ede3]">
                  {filteredProperties.length}
                </span>{" "}
                properties
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

