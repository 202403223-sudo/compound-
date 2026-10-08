
import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Building2,
  CalendarDays,
  CarFront,
  Check,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const featuredProperties = [
  {
    id: 1,
    title: "Garden Residence 01",
    type: "For Sale",
    price: "$285,000",
    location: "Garden District",
    beds: 3,
    baths: 2,
    area: "142 m²",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=90",
  },
  {
    id: 3,
    title: "Palm View Villa",
    type: "For Sale",
    price: "$495,000",
    location: "Palm Avenue",
    beds: 4,
    baths: 3,
    area: "248 m²",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=90",
  },
  {
    id: 4,
    title: "Lounge Residence 12",
    type: "For Rent",
    price: "$2,050 / month",
    location: "Central Avenue",
    beds: 2,
    baths: 2,
    area: "118 m²",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=90",
  },
];

const lifestyleItems = [
  {
    icon: CalendarDays,
    title: "Private Facilities",
    text: "Reserve the spaces you love, from the café to the private cinema.",
    link: "/facilities",
  },
  {
    icon: ShieldCheck,
    title: "Resident Security",
    text: "Smart visitor access and secure community services around the clock.",
    link: "/qr-access",
  },
  {
    icon: CarFront,
    title: "Effortless Mobility",
    text: "Request a golf cart and find available parking whenever you need it.",
    link: "/golf-cart",
  },
];

function Home() {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#e9e0d4]">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90"
            alt="Maison Verde residence"
            className="hero-image h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#302a25]/80 via-[#302a25]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#302a25]/60 via-transparent to-transparent" />
        </div>

        {/* Decorative circle */}
        <div className="hero-orb absolute -right-24 top-20 h-72 w-72 rounded-full border border-white/20" />
        <div className="hero-orb-delay absolute -right-10 top-36 h-48 w-48 rounded-full border border-white/10" />

        <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-5 py-20 lg:px-8">
          <div className="max-w-3xl text-white">
            <div className="hero-reveal inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] backdrop-blur-md">
              <Sparkles size={14} />
              A refined way of living
            </div>

            <h1 className="hero-title serif mt-7 max-w-4xl text-6xl leading-[0.95] sm:text-7xl lg:text-[6.8rem]">
              Come home to
              <span className="block italic text-[#e8d2b4]">
                something beautiful.
              </span>
            </h1>

            <p className="hero-reveal-delay mt-7 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
              Maison Verde is a private residential community designed around
              comfort, connection, and the quiet luxury of everyday life.
            </p>

            <div className="hero-buttons mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/properties"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#4b3d31] shadow-2xl transition duration-300 hover:-translate-y-1 hover:bg-[#f5ede2]"
              >
                Explore Residences
                <ArrowRight
                  size={17}
                  className="transition duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/resident-portal"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/20"
              >
                Resident Portal
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-8 border-t border-white/15 pt-7">
              <div>
                <p className="serif text-3xl">24/7</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/60">
                  Security
                </p>
              </div>

              <div>
                <p className="serif text-3xl">12+</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/60">
                  Facilities
                </p>
              </div>

              <div>
                <p className="serif text-3xl">350+</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/60">
                  Residents
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-7 right-8 hidden items-center gap-3 text-white/60 lg:flex">
          <span className="text-[10px] uppercase tracking-[0.3em]">
            Discover
          </span>
          <div className="h-12 w-px bg-white/30">
            <div className="scroll-line h-5 w-px bg-white" />
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-[#f8f5ef] px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div className="reveal-on-load">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a48664]">
              The Maison Verde Experience
            </p>

            <h2 className="serif mt-4 max-w-xl text-5xl leading-tight text-[#44372c] md:text-6xl">
              More than a residence.
              <span className="block text-[#9b8060]">
                A way of living.
              </span>
            </h2>
          </div>

          <div>
            <p className="max-w-2xl text-base leading-8 text-[#7c7167]">
              Every detail at Maison Verde has been created to make daily life
              feel effortless. From landscaped gardens and intimate community
              spaces to thoughtful resident services, everything is designed
              around the people who call this place home.
            </p>

            <Link
              to="/facilities"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#6d5945]"
            >
              Discover community life
              <ArrowRight
                size={17}
                className="transition group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED RESIDENCES */}
      <section className="bg-[#eee8dd] px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a48664]">
                Featured Residences
              </p>

              <h2 className="serif mt-3 text-5xl text-[#44372c] md:text-6xl">
                Find your place.
              </h2>
            </div>

            <Link
              to="/properties"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#6d5945]"
            >
              View all residences
              <ArrowUpRight
                size={18}
                className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>

          <div className="mt-12 grid gap-7 lg:grid-cols-3">
            {featuredProperties.map((property, index) => (
              <Link
                key={property.id}
                to={`/properties/${property.id}`}
                className={`property-home-card group overflow-hidden rounded-[2rem] bg-white ${
                  index === 1 ? "lg:-translate-y-5" : ""
                }`}
              >
                <div className="relative h-[360px] overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#594936] backdrop-blur">
                    {property.type}
                  </span>

                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-white/70">
                          {property.location}
                        </p>
                        <h3 className="serif mt-1 text-3xl">
                          {property.title}
                        </h3>
                      </div>

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#594936] transition duration-300 group-hover:rotate-45">
                        <ArrowUpRight size={19} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex flex-wrap gap-5 text-xs text-[#7c7167]">
                    <span className="flex items-center gap-1.5">
                      <BedDouble size={15} />
                      {property.beds} Beds
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Building2 size={15} />
                      {property.baths} Baths
                    </span>

                    <span>{property.area}</span>
                  </div>

                  <div className="mt-5 border-t border-[#eee7dc] pt-5">
                    <p className="text-xs uppercase tracking-wider text-[#9b8060]">
                      Starting from
                    </p>
                    <p className="serif mt-1 text-2xl text-[#44372c]">
                      {property.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LIFESTYLE */}
      <section className="bg-[#f8f5ef] px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a48664]">
              Designed Around You
            </p>

            <h2 className="serif mt-4 text-5xl leading-tight text-[#44372c] md:text-6xl">
              Everything you need,
              <span className="block text-[#9b8060]">
                right where you live.
              </span>
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {lifestyleItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  to={item.link}
                  className="lifestyle-card group rounded-[2rem] border border-[#e6ddd1] bg-white p-8"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eee7dc] text-[#6d5945] transition duration-300 group-hover:bg-[#6d5945] group-hover:text-white">
                    <Icon size={24} />
                  </div>

                  <h3 className="serif mt-8 text-3xl text-[#44372c]">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#7c7167]">
                    {item.text}
                  </p>

                  <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-[#6d5945]">
                    Explore
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMMUNITY IMAGE */}
      <section className="relative overflow-hidden bg-[#44372c]">
        <div className="grid min-h-[620px] lg:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=90"
              alt="Maison Verde community"
              className="h-full w-full object-cover transition duration-[2s] hover:scale-105"
            />

            <div className="absolute inset-0 bg-[#44372c]/20" />
          </div>

          <div className="flex items-center px-7 py-20 sm:px-12 lg:px-20">
            <div className="max-w-xl text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d2b996]">
                Life at Maison Verde
              </p>

              <h2 className="serif mt-5 text-5xl leading-tight md:text-6xl">
                A community that feels like home.
              </h2>

              <p className="mt-7 text-sm leading-8 text-white/65 md:text-base">
                Meet neighbors, enjoy shared spaces, book experiences, manage
                your home, and stay connected with everything happening inside
                the community.
              </p>

              <div className="mt-9 grid grid-cols-2 gap-5">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <Users size={22} className="text-[#d2b996]" />
                  <p className="serif mt-4 text-3xl">350+</p>
                  <p className="mt-1 text-xs text-white/50">
                    Community members
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <MapPin size={22} className="text-[#d2b996]" />
                  <p className="serif mt-4 text-3xl">12+</p>
                  <p className="mt-1 text-xs text-white/50">
                    Lifestyle spaces
                  </p>
                </div>
              </div>

              <Link
                to="/directory"
                className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#44372c] transition hover:-translate-y-1"
              >
                Meet the community
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RESIDENT CTA */}
      <section className="bg-[#e9e0d4] px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#6d5945] text-white shadow-lg">
            <Sparkles size={25} />
          </div>

          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.3em] text-[#a48664]">
            Your community, beautifully connected
          </p>

          <h2 className="serif mx-auto mt-4 max-w-3xl text-5xl leading-tight text-[#44372c] md:text-6xl">
            Everything Maison Verde has to offer.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#7c7167]">
            Access your resident services, payments, reservations, parking,
            visitor passes, and community updates from one elegant space.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/resident-portal"
              className="primary-btn inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold"
            >
              Open Resident Portal
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/properties"
              className="secondary-btn inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold"
            >
              Explore Properties
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3 text-xs text-[#8a7c6d]">
            <span className="flex items-center gap-2">
              <Check size={14} />
              Secure resident access
            </span>

            <span className="flex items-center gap-2">
              <Check size={14} />
              Community services
            </span>

            <span className="flex items-center gap-2">
              <Check size={14} />
              Frontend demonstration
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

