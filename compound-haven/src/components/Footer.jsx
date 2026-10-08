
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-[#e8dfd3] bg-[#eee8dd]">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div>
            <h2 className="serif text-3xl text-[#44372c]">
              Maison Verde
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-7 text-[#7c7167]">
              A refined residential community designed around comfort,
              connection, and everyday living.
            </p>
          </div>

          {/* COMMUNITY */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#594936]">
              Community
            </h3>

            <div className="mt-5 space-y-3 text-sm text-[#7c7167]">

              <Link
                to="/properties"
                className="block transition hover:text-[#6d5945]"
              >
                Properties
              </Link>

              <Link
                to="/facilities"
                className="block transition hover:text-[#6d5945]"
              >
                Facilities
              </Link>

              <Link
                to="/directory"
                className="block transition hover:text-[#6d5945]"
              >
                Neighbors
              </Link>

              <Link
                to="/map"
                className="block transition hover:text-[#6d5945]"
              >
                Compound Map
              </Link>

            </div>
          </div>

          {/* RESIDENT SERVICES */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#594936]">
              Resident Services
            </h3>

            <div className="mt-5 space-y-3 text-sm text-[#7c7167]">

              <Link
                to="/payments"
                className="block transition hover:text-[#6d5945]"
              >
                Payments
              </Link>

              <Link
                to="/qr-access"
                className="block transition hover:text-[#6d5945]"
              >
                QR Access
              </Link>

              <Link
                to="/golf-cart"
                className="block transition hover:text-[#6d5945]"
              >
                Golf Cart
              </Link>

              <Link
                to="/parking"
                className="block transition hover:text-[#6d5945]"
              >
                Parking
              </Link>

              <Link
                to="/complaints"
                className="block transition hover:text-[#6d5945]"
              >
                Complaints
              </Link>

            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#594936]">
              Contact
            </h3>

            <div className="mt-5 space-y-4 text-sm text-[#7c7167]">

              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-[#9c805f]"
                />

                <span>
                  Central Avenue, Maison Verde
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  size={18}
                  className="shrink-0 text-[#9c805f]"
                />

                <span>
                  +20 100 000 0000
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="shrink-0 text-[#9c805f]"
                />

                <span>
                  hello@maisonverde.com
                </span>
              </div>

            </div>

            {/* SOCIAL */}
            <div className="mt-6 flex gap-3">

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d8cbbb] bg-white text-sm font-semibold text-[#6d5945] transition hover:-translate-y-1 hover:bg-[#6d5945] hover:text-white"
              >
                IG
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d8cbbb] bg-white text-sm font-semibold text-[#6d5945] transition hover:-translate-y-1 hover:bg-[#6d5945] hover:text-white"
              >
                f
              </a>

            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-[#d8cbbb] pt-6 text-center text-xs text-[#8c7d6d]">
          © 2026 Maison Verde. Frontend demonstration only.
        </div>

      </div>
    </footer>
  );
}

export default Footer;

