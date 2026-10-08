
import {
  ArrowLeft,
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  UserRound,
  Phone,
  Mail,
  Check,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { properties } from "./Properties";
import { useToast } from "../components/Toast";

export default function PropertyDetails() {
  const { id } = useParams();
  const { showToast } = useToast();

  const [property, setProperty] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedListings = JSON.parse(
      localStorage.getItem("userListings") || "[]"
    );

    const allProperties = [
      ...savedListings,
      ...properties,
    ];

    const foundProperty = allProperties.find(
      (item) => String(item.id) === String(id)
    );

    setProperty(foundProperty || null);
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen bg-[#f8f5ef] px-5 py-20 dark:bg-[#11100e]">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="serif text-4xl text-[#44372c] dark:text-[#f4ede3]">
            Property Not Found
          </h1>

          <p className="mt-3 text-sm text-[#7c7167] dark:text-[#a99b8d]">
            This property may have been removed or is no longer available.
          </p>

          <Link
            to="/properties"
            className="mt-7 inline-flex rounded-full bg-[#80674d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#6d5741]"
          >
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const owner = property.owner || {
    name: "Maison Verde Resident",
    email: "resident@maisonverde.demo",
    phone: "+20 100 000 0000",
  };

  const amenities = property.amenities || [
    "Private Parking",
    "Security",
    "Green Spaces",
    "Clubhouse Access",
  ];

  const handleContact = () => {
    if (!message.trim()) {
      showToast("Please write your message first.");
      return;
    }

    showToast("Your request has been sent successfully.");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-[#f8f5ef] dark:bg-[#11100e]">
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <Link
          to="/properties"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#80674d] transition hover:gap-3"
        >
          <ArrowLeft size={17} />
          Back to Properties
        </Link>

        {/* Gallery */}
        <div className="grid gap-3 md:grid-cols-3">
          <div className="overflow-hidden rounded-3xl md:col-span-2">
            <img
              src={property.image}
              alt={property.title}
              className="h-[420px] w-full object-cover"
            />
          </div>

          <div className="hidden gap-3 md:grid">
            <img
              src={property.image2 || property.image}
              alt={property.title}
              className="h-[204px] w-full rounded-3xl object-cover"
            />

            <img
              src={property.image3 || property.image}
              alt={property.title}
              className="h-[204px] w-full rounded-3xl object-cover"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Left */}
          <main>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#eee7dc] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#6d5945] dark:bg-[#30271f] dark:text-[#d8c3aa]">
                {property.type || "Property"}
              </span>

              {property.status && (
                <span className="rounded-full bg-green-50 px-4 py-2 text-xs font-semibold text-green-700 dark:bg-green-950/30 dark:text-green-300">
                  {property.status}
                </span>
              )}
            </div>

            <h1 className="serif mt-5 text-5xl text-[#44372c] dark:text-[#f4ede3]">
              {property.title}
            </h1>

            <p className="mt-3 flex items-center gap-2 text-sm text-[#7c7167] dark:text-[#a99b8d]">
              <MapPin size={16} />
              {property.location}
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-[#e8dfd3] bg-white p-4 dark:border-[#40382f] dark:bg-[#1b1815]">
                <BedDouble
                  size={19}
                  className="text-[#80674d]"
                />

                <p className="mt-2 text-lg font-bold text-[#44372c] dark:text-[#f4ede3]">
                  {property.beds || 0}
                </p>

                <p className="text-xs text-[#8a7c6d] dark:text-[#a99b8d]">
                  Bedrooms
                </p>
              </div>

              <div className="rounded-2xl border border-[#e8dfd3] bg-white p-4 dark:border-[#40382f] dark:bg-[#1b1815]">
                <Bath
                  size={19}
                  className="text-[#80674d]"
                />

                <p className="mt-2 text-lg font-bold text-[#44372c] dark:text-[#f4ede3]">
                  {property.baths || 0}
                </p>

                <p className="text-xs text-[#8a7c6d] dark:text-[#a99b8d]">
                  Bathrooms
                </p>
              </div>

              <div className="rounded-2xl border border-[#e8dfd3] bg-white p-4 dark:border-[#40382f] dark:bg-[#1b1815]">
                <Maximize
                  size={19}
                  className="text-[#80674d]"
                />

                <p className="mt-2 text-lg font-bold text-[#44372c] dark:text-[#f4ede3]">
                  {property.area || 0}
                </p>

                <p className="text-xs text-[#8a7c6d] dark:text-[#a99b8d]">
                  m²
                </p>
              </div>
            </div>

            {/* Description */}
            <section className="mt-10">
              <h2 className="serif text-3xl text-[#44372c] dark:text-[#f4ede3]">
                About this property
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#75695e] dark:text-[#b8aa9b]">
                {property.description ||
                  "A beautiful residence inside Maison Verde, designed for comfortable modern living with access to premium community facilities and services."}
              </p>
            </section>

            {/* Amenities */}
            <section className="mt-10">
              <h2 className="serif text-3xl text-[#44372c] dark:text-[#f4ede3]">
                Amenities
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {amenities.map((amenity, index) => (
                  <div
                    key={`${amenity}-${index}`}
                    className="flex items-center gap-3 rounded-2xl border border-[#e8dfd3] bg-white p-4 text-sm text-[#594936] dark:border-[#40382f] dark:bg-[#1b1815] dark:text-[#ded4c7]"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eee7dc] text-[#80674d] dark:bg-[#30271f]">
                      <Check size={14} />
                    </span>

                    {amenity}
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Right Sidebar */}
          <aside>
            <div className="sticky top-24 rounded-3xl border border-[#e8dfd3] bg-white p-6 shadow-sm dark:border-[#40382f] dark:bg-[#1b1815]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8a7c6d] dark:text-[#a99b8d]">
                {property.type === "Rent"
                  ? "Monthly Price"
                  : "Property Price"}
              </p>

              <p className="mt-2 text-3xl font-bold text-[#44372c] dark:text-[#f4ede3]">
                {property.priceLabel ||
                  property.price ||
                  "Contact Owner"}
              </p>

              {/* Owner */}
              <div className="mt-7 border-t border-[#eee8dd] pt-6 dark:border-[#40382f]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8a7c6d] dark:text-[#a99b8d]">
                  Listed by
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eee7dc] text-[#80674d] dark:bg-[#30271f]">
                    <UserRound size={20} />
                  </div>

                  <div>
                    <p className="font-semibold text-[#44372c] dark:text-[#f4ede3]">
                      {owner.name}
                    </p>

                    <p className="text-xs text-[#8a7c6d] dark:text-[#a99b8d]">
                      Property Owner
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3 text-sm text-[#75695e] dark:text-[#b8aa9b]">
                  <a
                    href={`tel:${owner.phone}`}
                    className="flex items-center gap-3 transition hover:text-[#80674d]"
                  >
                    <Phone size={16} />
                    {owner.phone}
                  </a>

                  <a
                    href={`mailto:${owner.email}`}
                    className="flex items-center gap-3 transition hover:text-[#80674d]"
                  >
                    <Mail size={16} />
                    {owner.email}
                  </a>
                </div>
              </div>

              {/* Contact */}
              <div className="mt-7 border-t border-[#eee8dd] pt-6 dark:border-[#40382f]">
                <p className="mb-3 text-sm font-semibold text-[#44372c] dark:text-[#f4ede3]">
                  Interested in this property?
                </p>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder={
                    property.type === "Rent"
                      ? "I am interested in renting this property..."
                      : "I am interested in purchasing this property..."
                  }
                  className="w-full resize-none rounded-2xl border border-[#ded4c7] bg-[#f8f5ef] p-4 text-sm text-[#44372c] outline-none focus:border-[#80674d] dark:border-[#40382f] dark:bg-[#11100e] dark:text-[#f4ede3]"
                />

                <button
                  type="button"
                  onClick={handleContact}
                  className="mt-3 w-full rounded-full bg-[#80674d] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#6d5741]"
                >
                  {property.type === "Rent"
                    ? "Request to Rent"
                    : "Request to Buy"}
                </button>
              </div>

              <p className="mt-5 text-center text-[10px] leading-5 text-[#9a8c7d]">
                Frontend demo only. No real transaction is processed.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}



