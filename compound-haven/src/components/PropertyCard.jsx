
import {
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function PropertyCard({ property }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-[#e8dfd3] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-[#40382f] dark:bg-[#1b1815]">
      <Link to={`/properties/${property.id}`}>
        <div className="relative h-64 overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#594936] backdrop-blur-sm dark:bg-[#1b1815]/90 dark:text-[#f4ede3]">
            {property.type || "Property"}
          </div>

          <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#44372c] opacity-0 shadow-lg backdrop-blur-sm transition group-hover:opacity-100 dark:bg-[#1b1815]/90 dark:text-white">
            <ArrowUpRight size={18} />
          </div>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="serif text-2xl text-[#44372c] dark:text-[#f4ede3]">
              {property.title}
            </h3>

            <p className="mt-2 flex items-center gap-1.5 text-xs text-[#7c7167] dark:text-[#a99b8d]">
              <MapPin size={13} />
              {property.location}
            </p>
          </div>

          <p className="shrink-0 text-lg font-bold text-[#80674d] dark:text-[#c4a985]">
            {property.priceLabel ||
              property.price ||
              "Contact us"}
          </p>
        </div>

        <div className="mt-5 flex items-center gap-5 border-t border-[#eee8dd] pt-4 text-xs text-[#75695e] dark:border-[#40382f] dark:text-[#b8aa9b]">
          <span className="flex items-center gap-1.5">
            <BedDouble size={15} />
            {property.beds || 0} Beds
          </span>

          <span className="flex items-center gap-1.5">
            <Bath size={15} />
            {property.baths || 0} Baths
          </span>

          <span className="flex items-center gap-1.5">
            <Maximize size={15} />
            {property.area || 0} m²
          </span>
        </div>

        <Link
          to={`/properties/${property.id}`}
          className="mt-5 flex w-full items-center justify-center rounded-full bg-[#80674d] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#6d5741]"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

