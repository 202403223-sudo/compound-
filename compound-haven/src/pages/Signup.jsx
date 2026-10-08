
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus, UserRound, Mail, Phone, LockKeyhole } from "lucide-react";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    localStorage.setItem("resident", JSON.stringify(form));
    localStorage.setItem("isLoggedIn", "true");

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f4eee5]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* SIGNUP FORM */}
        <div className="order-2 flex items-center justify-center px-6 py-12 lg:order-1">
          <div className="w-full max-w-md">

            {/* BACK TO HOME */}
            <Link
              to="/"
              className="mb-10 inline-flex items-center gap-2 text-sm text-[#75695d] transition hover:text-[#44372c]"
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>

            {/* HEADER */}
            <div className="mb-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6d5945] text-white shadow-lg">
                <UserPlus size={21} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a48664]">
                New Resident
              </p>

              <h1 className="serif mt-2 text-5xl text-[#44372c]">
                Make yourself at home.
              </h1>

              <p className="mt-4 text-sm leading-6 text-[#7b7066]">
                Create your account and access everything your community
                offers.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSignup} className="space-y-4">

              {/* NAME */}
              <div className="relative">
                <UserRound
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a18d78]"
                />

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                  className="w-full rounded-2xl border border-[#ddd1c2] bg-white py-3.5 pl-11 pr-4 text-sm text-[#44372c] outline-none transition placeholder:text-[#b3a79a] focus:border-[#9e8262] focus:ring-4 focus:ring-[#9e8262]/10"
                />
              </div>

              {/* EMAIL */}
              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a18d78]"
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  required
                  className="w-full rounded-2xl border border-[#ddd1c2] bg-white py-3.5 pl-11 pr-4 text-sm text-[#44372c] outline-none transition placeholder:text-[#b3a79a] focus:border-[#9e8262] focus:ring-4 focus:ring-[#9e8262]/10"
                />
              </div>

              {/* PHONE */}
              <div className="relative">
                <Phone
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a18d78]"
                />

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  required
                  className="w-full rounded-2xl border border-[#ddd1c2] bg-white py-3.5 pl-11 pr-4 text-sm text-[#44372c] outline-none transition placeholder:text-[#b3a79a] focus:border-[#9e8262] focus:ring-4 focus:ring-[#9e8262]/10"
                />
              </div>

              {/* PASSWORD */}
              <div className="relative">
                <LockKeyhole
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a18d78]"
                />

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  required
                  minLength={6}
                  className="w-full rounded-2xl border border-[#ddd1c2] bg-white py-3.5 pl-11 pr-4 text-sm text-[#44372c] outline-none transition placeholder:text-[#b3a79a] focus:border-[#9e8262] focus:ring-4 focus:ring-[#9e8262]/10"
                />
              </div>

              {/* CREATE ACCOUNT */}
              <button
                type="submit"
                className="primary-btn w-full rounded-2xl py-3.5 font-semibold"
              >
                Create Resident Account
              </button>
            </form>

            {/* LOGIN LINK */}
            <div className="mt-8 rounded-2xl border border-[#ded2c3] bg-white/70 p-5 text-center">
              <p className="text-sm text-[#7b7066]">
                Already have a Maison Verde account?
              </p>

              <Link
                to="/login"
                className="mt-2 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-[#6d5945] transition hover:bg-[#eee7dc]"
              >
                Sign In
                <span className="ml-2">→</span>
              </Link>
            </div>

            {/* DEMO NOTE */}
            <p className="mt-6 text-center text-[11px] leading-5 text-[#a09284]">
              Frontend demonstration only. No real account or payment
              processing is performed.
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="order-1 hidden lg:order-2 lg:block">
          <div className="relative h-full">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85"
              alt="Modern community"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute bottom-12 left-12 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                Welcome to Maison Verde
              </p>

              <h2 className="serif mt-3 max-w-md text-5xl leading-tight">
                Your community, beautifully connected.
              </h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-white/75">
                Discover your resident portal, community facilities,
                payments, parking, access and more.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

