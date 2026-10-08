
import {
  UserRound,
  CreditCard,
  CalendarDays,
  ParkingSquare,
  QrCode,
  MessageSquareWarning,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ResidentPortal() {
  const resident =
    JSON.parse(localStorage.getItem("resident")) || {
      name: "Resident",
      email: "resident@maisonverde.com",
      unit: "Residence 12",
    };

  const services = [
    {
      title: "Payments",
      description: "Manage your community bills and payments.",
      icon: CreditCard,
      link: "/payments",
    },
    {
      title: "Reservations",
      description: "Book the café, cinema, gym, and pool.",
      icon: CalendarDays,
      link: "/facilities",
    },
    {
      title: "Parking",
      description: "View and manage your assigned parking space.",
      icon: ParkingSquare,
      link: "/parking",
    },
    {
      title: "QR Access",
      description: "Create a secure visitor access pass.",
      icon: QrCode,
      link: "/qr-access",
    },
    {
      title: "Complaints",
      description: "Report and follow up on community issues.",
      icon: MessageSquareWarning,
      link: "/complaints",
    },
    {
      title: "Community Map",
      description: "Explore facilities and important locations.",
      icon: ShieldCheck,
      link: "/map",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f5ef]">
      
      {/* PROFILE HERO */}
      <section className="bg-[#e9e0d4] px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#6d5945] text-white shadow-lg">
                <UserRound size={34} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a48664]">
                  Resident Portal
                </p>

                <h1 className="serif mt-1 text-4xl text-[#44372c]">
                  Welcome, {resident.name}
                </h1>

                <p className="mt-2 text-sm text-[#7c7167]">
                  {resident.unit} · Maison Verde
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-[#d8cbbb] bg-white/70 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.18em] text-[#9b8060]">
                Account
              </p>

              <p className="mt-2 text-sm font-medium text-[#594936]">
                {resident.email}
              </p>

              <p className="mt-1 text-xs text-[#8a7c6d]">
                Resident account
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* QUICK SERVICES */}
      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a48664]">
            My Services
          </p>

          <h2 className="serif mt-2 text-4xl text-[#44372c]">
            Everything in one place.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.title}
                to={service.link}
                className="group luxury-card rounded-3xl p-6"
              >
                <div className="flex items-start justify-between">
                  
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eee7dc] text-[#6d5945] transition group-hover:bg-[#6d5945] group-hover:text-white">
                    <Icon size={21} />
                  </div>

                  <ArrowRight
                    size={19}
                    className="text-[#a18d78] transition duration-300 group-hover:translate-x-1"
                  />
                </div>

                <h3 className="mt-6 text-lg font-semibold text-[#44372c]">
                  {service.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#7c7167]">
                  {service.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ACCOUNT SUMMARY */}
      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          
          <div className="rounded-3xl bg-[#6d5945] p-7 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">
              Residence
            </p>

            <p className="serif mt-3 text-3xl">
              {resident.unit}
            </p>

            <p className="mt-2 text-sm text-white/70">
              Maison Verde Community
            </p>
          </div>

          <div className="rounded-3xl border border-[#e8dfd3] bg-white p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-[#a48664]">
              Community Status
            </p>

            <div className="mt-4 flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span className="font-semibold text-[#44372c]">
                Active Resident
              </span>
            </div>

            <p className="mt-2 text-sm text-[#7c7167]">
              Your resident services are available.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e8dfd3] bg-white p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-[#a48664]">
              Security
            </p>

            <div className="mt-4 flex items-center gap-3">
              <ShieldCheck
                size={22}
                className="text-[#6d5945]"
              />

              <span className="font-semibold text-[#44372c]">
                Protected Account
              </span>
            </div>

            <p className="mt-2 text-sm text-[#7c7167]">
              Your resident access is secured.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}

