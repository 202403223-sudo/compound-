
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const resident = {
      name: "Maison Verde Resident",
      email: email,
      phone: "+20 100 000 0000",
      unit: "Residence 12",
    };

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("resident", JSON.stringify(resident));

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f4eee5]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT IMAGE */}
        <div className="relative hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85"
            alt="Luxury apartment"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute bottom-12 left-12 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              Maison Verde
            </p>

            <h2 className="serif mt-3 max-w-md text-5xl leading-tight">
              A better way to live together.
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-white/75">
              Access your community services, facilities, payments and
              resident benefits from one place.
            </p>
          </div>
        </div>

        {/* LOGIN FORM */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">

            {/* BACK */}
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
                <LockKeyhole size={21} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a48664]">
                Resident Portal
              </p>

              <h1 className="serif mt-2 text-5xl text-[#44372c]">
                Welcome back.
              </h1>

              <p className="mt-4 text-sm leading-6 text-[#7b7066]">
                Sign in to manage your community services.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleLogin} className="space-y-5">

              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#55483c]">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-2xl border border-[#ddd1c2] bg-white px-4 py-3.5 text-sm text-[#44372c] outline-none transition placeholder:text-[#b3a79a] focus:border-[#9e8262] focus:ring-4 focus:ring-[#9e8262]/10"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-[#55483c]">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium text-[#987b5c] transition hover:text-[#6d5945]"
                  >
                    Forgot password?
                  </button>
                </div>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-2xl border border-[#ddd1c2] bg-white px-4 py-3.5 text-sm text-[#44372c] outline-none transition placeholder:text-[#b3a79a] focus:border-[#9e8262] focus:ring-4 focus:ring-[#9e8262]/10"
                />
              </div>

              {/* SIGN IN */}
              <button
                type="submit"
                className="primary-btn w-full rounded-2xl py-3.5 font-semibold"
              >
                Sign In
              </button>
            </form>

            {/* CREATE ACCOUNT */}
            <div className="mt-8 rounded-2xl border border-[#ded2c3] bg-white/70 p-5 text-center">
              <p className="text-sm text-[#7b7066]">
                Don't have a Maison Verde account?
              </p>

              <Link
                to="/signup"
                className="mt-2 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-[#6d5945] transition hover:bg-[#eee7dc]"
              >
                Create Account
                <span className="ml-2">→</span>
              </Link>
            </div>

            {/* DEMO NOTE */}
            <p className="mt-6 text-center text-[11px] leading-5 text-[#a09284]">
              Frontend demonstration only. No real authentication or
              transactions are performed.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

