
import { Link } from "react-router-dom";
import { Clock3, Users, ArrowUpRight } from "lucide-react";

export default function FacilityCard({
  facility,
  onReserve,
}) {
  return (
    <article className="luxury-card group overflow-hidden rounded-3xl">
      <div className="relative h-64 overflow-hidden">
        <img
          src={facility.image}
          alt={facility.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <div className="absolute bottom-5 left-5">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#594936]">
            Community Facility
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="serif text-2xl text-[#44372c]">
          {facility.name}
        </h3>

        <p className="mt-3 text-sm leading-6 text-[#7c7167]">
          {facility.description}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-[#f4efe7] p-3">
            <div className="flex items-center gap-2 text-[#6d5945]">
              <Clock3 size={16} />
              <span className="text-xs font-semibold">Hours</span>
            </div>

            <p className="mt-1 text-xs text-[#7c7167]">
              {facility.hours}
            </p>
          </div>

          <div className="rounded-2xl bg-[#f4efe7] p-3">
            <div className="flex items-center gap-2 text-[#6d5945]">
              <Users size={16} />
              <span className="text-xs font-semibold">Capacity</span>
            </div>

            <p className="mt-1 text-xs text-[#7c7167]">
              {facility.capacity}
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => onReserve?.(facility)}
            className="primary-btn flex flex-1 items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold"
          >
            Reserve
          </button>

          <Link
            to="/facilities"
            className="secondary-btn flex items-center justify-center rounded-xl px-4 py-3"
            aria-label={`View ${facility.name}`}
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}

