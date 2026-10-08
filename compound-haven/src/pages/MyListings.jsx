
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Home,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Trash2,
  ExternalLink,
  Plus,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../components/Toast";

export default function MyListings() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [listings, setListings] = useState([]);

  const loadListings = () => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("userListings") || "[]"
      );

      const resident = JSON.parse(
        localStorage.getItem("resident") || "{}"
      );

      const ownerId =
        resident.email ||
        resident.name ||
        "resident";

      const mine = saved.filter(
        (property) => property.ownerId === ownerId
      );

      setListings(mine);
    } catch {
      setListings([]);
    }
  };

  useEffect(() => {
    loadListings();

    window.addEventListener(
      "propertiesUpdated",
      loadListings
    );

    return () => {
      window.removeEventListener(
        "propertiesUpdated",
        loadListings
      );
    };
  }, []);

  const deleteListing = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this property listing?"
    );

    if (!confirmed) return;

    try {
      const saved = JSON.parse(
        localStorage.getItem("userListings") || "[]"
      );

      const updated = saved.filter(
        (property) => property.id !== id
      );

      localStorage.setItem(
        "userListings",
        JSON.stringify(updated)
      );

      window.dispatchEvent(
        new Event("propertiesUpdated")
      );

      setListings((prev) =>
        prev.filter((property) => property.id !== id)
      );

      showToast(
        "Property listing removed successfully.",
        "success"
      );
    } catch {
      showToast(
        "Something went wrong while removing the listing.",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5ef] pb-20 dark:bg-[#11100e]">
      {/* Header */}
      <section className="border-b border-[#e8dfd3] bg-[#f4eee5] dark:border-[#302a25] dark:bg-[#171411]">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <Link
            to="/properties"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#75695e] transition hover:text-[#6d5945] dark:text-[#b8aa9b] dark:hover:text-[#f4ede3]"
          >
            <ArrowLeft size={17} />
            Back to Properties
          </Link>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#9b8060]">
                Resident Marketplace
              </p>

              <h1 className="serif text-4xl text-[#44372c] md:text-5xl dark:text-[#f4ede3]">
                My Listings
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#75695e] md:text-base dark:text-[#b8aa9b]">
                Manage the properties you have listed for sale or
                rent within Maison Verde.
              </p>
            </div>

            <Link
              to="/add-property"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6d5945] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#594936]"
            >
              <Plus size={18} />
              Add Property
            </Link>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        {listings.length === 0 ? (
          <div className="rounded-[2rem] border border-[#e8dfd3] bg-white px-6 py-16 text-center shadow-sm dark:border-[#40382f] dark:bg-[#1b1815]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eee7dc] text-[#6d5945] dark:bg-[#302a25] dark:text-[#d8cbbb]">
              <Home size={28} />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-[#44372c] dark:text-[#f4ede3]">
              You have no listings yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#75695e] dark:text-[#a99d90]">
              List your apartment or villa and make it available
              to residents looking to buy or rent inside the
              community.
            </p>

            <Link
              to="/add-property"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#6d5945] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#594936]"
            >
              <Plus size={17} />
              Create Your First Listing
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-[#75695e] dark:text-[#b8aa9b]">
                <span className="font-semibold text-[#44372c] dark:text-[#f4ede3]">
                  {listings.length}
                </span>{" "}
                {listings.length === 1
                  ? "property"
                  : "properties"}{" "}
                listed
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {listings.map((property) => (
                <div
                  key={property.id}
                  className="group overflow-hidden rounded-[1.5rem] border border-[#e8dfd3] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-[#40382f] dark:bg-[#1b1815]"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute left-4 top-4 flex gap-2">
                      <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#594936] shadow-sm">
                        {property.type}
                      </span>

                      <span className="rounded-full bg-[#6d5945]/95 px-3 py-1.5 text-xs font-semibold text-white">
                        {property.status}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        deleteListing(property.id)
                      }
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-red-600 shadow-md transition hover:bg-red-50"
                      title="Remove listing"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b8060]">
                      {property.type}
                    </p>

                    <h2 className="mt-2 line-clamp-1 text-xl font-semibold text-[#44372c] dark:text-[#f4ede3]">
                      {property.title}
                    </h2>

                    <div className="mt-2 flex items-center gap-1.5 text-sm text-[#75695e] dark:text-[#b8aa9b]">
                      <MapPin size={15} />
                      <span className="truncate">
                        {property.location}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-4 border-y border-[#eee7dc] py-4 text-xs text-[#75695e] dark:border-[#40382f] dark:text-[#b8aa9b]">
                      <span className="flex items-center gap-1.5">
                        <BedDouble size={15} />
                        {property.beds} Beds
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Bath size={15} />
                        {property.baths} Baths
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Ruler size={15} />
                        {property.area} m²
                      </span>
                    </div>

                    <div className="mt-4 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-xs text-[#8a7c6d] dark:text-[#9e9184]">
                          {property.type === "For Rent"
                            ? "Monthly rent"
                            : "Asking price"}
                        </p>

                        <p className="mt-1 text-lg font-bold text-[#594936] dark:text-[#d8cbbb]">
                          {property.priceLabel}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/properties/${property.id}`
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-[#d8cbbb] px-4 py-2.5 text-xs font-semibold text-[#6d5945] transition hover:bg-[#f4eee5] dark:border-[#40382f] dark:text-[#d8cbbb] dark:hover:bg-[#302a25]"
                      >
                        View
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
