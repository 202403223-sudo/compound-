import { Link, useNavigate } from "react-router-dom";
import {
  CreditCard,
  CalendarDays,
  Car,
  QrCode,
  MessageSquareWarning,
  ParkingSquare,
  ArrowRight,
  LogOut,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const resident =
    JSON.parse(localStorage.getItem("resident")) || {
      name: "Resident",
      email: "resident@example.com",
    };

  const services = [
    {
      title: "Pay Bills",
      text: "Manage community fees and services.",
      icon: CreditCard,
      path: "/payments",
    },
    {
      title: "Book Facilities",
      text: "Reserve community spaces.",
      icon: CalendarDays,
      path: "/facilities",
    },
    {
      title: "QR Access",
      text: "Open your resident access QR.",
      icon: QrCode,
      path: "/qr-access",
    },
    {
      title: "Golf Cart",
      text: "Request or locate a cart.",
      icon: Car,
      path: "/golf-cart",
    },
    {
      title: "Parking",
      text: "Manage your parking spot.",
      icon: ParkingSquare,
      path: "/parking",
    },
    {
      title: "Report Issue",
      text: "Send a complaint or request.",
      icon: MessageSquareWarning,
      path: "/complaints",
    },
  ];

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f8f5ef]">
      <section className="bg-[#e9e0d4]">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#a48664]">
                Resident Dashboard
              </p>

              <h1 className="serif mt-3 text-5xl text-[#44372c]">
                Good evening, {resident.name.split(" ")[0]}.
              </h1>

              <p className="mt-4 text-sm text-[#76695d]">
                Everything you need for your community, right here.
              </p>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 self-start rounded-full border border-[#d3c6b6] px-5 py-3 text-sm text-[#665544] transition hover:bg-white md:self-auto"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.path}
                to={service.path}
                className="luxury-card group rounded-3xl p-7 transition hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eee6db] text-[#705b45]">
                    <Icon size={21} />
                  </div>

                  <ArrowRight
                    size={18}
                    className="text-[#a58b6c] transition group-hover:translate-x-1"
                  />
                </div>

                <h2 className="mt-6 text-lg font-semibold text-[#4c3d31]">
                  {service.title}
                </h2>

                <p className="mt-2 text-sm text-[#80756b]">
                  {service.text}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}