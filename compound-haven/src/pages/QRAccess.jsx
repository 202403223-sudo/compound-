import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  QrCode,
  ShieldCheck,
  RefreshCw,
  Copy,
  Check,
} from "lucide-react";
import SectionTitle from "../components/SectionTitle";

export default function QRAccess() {
  const [visitorName, setVisitorName] = useState("");
  const [accessType, setAccessType] = useState("Guest");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const resident =
    JSON.parse(localStorage.getItem("resident")) || {
      name: "Maison Verde Resident",
      email: "resident@example.com",
    };

  const accessCode = `MV-${resident.name
    .replace(/\s+/g, "")
    .slice(0, 4)
    .toUpperCase()}-2048`;

  const qrValue = `https://maison-verde.example/access/${accessCode}`;

  const generateAccess = (e) => {
    e.preventDefault();

    if (!visitorName.trim()) {
      window.alert("Please enter the visitor name.");
      return;
    }

    setGenerated(true);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(accessCode);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      window.alert(`Your access code is ${accessCode}`);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="bg-[#e9e0d4] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Resident Access"
            title="Secure entry, beautifully simple."
            description="Generate a temporary QR access code for guests and share it with the security team at the compound gate."
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="luxury-card rounded-3xl p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eee7dc] text-[#6d5945]">
              <QrCode size={23} />
            </div>

            <h2 className="serif mt-6 text-3xl text-[#46372b]">
              Create guest access
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#7b7066]">
              Create a digital access pass for a visitor entering the
              community.
            </p>

            <form onSubmit={generateAccess} className="mt-7 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#5d5044]">
                  Visitor name
                </label>

                <input
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  placeholder="Enter visitor name"
                  className="w-full rounded-2xl border border-[#ded4c7] bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#9c805f]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#5d5044]">
                  Access type
                </label>

                <select
                  value={accessType}
                  onChange={(e) => setAccessType(e.target.value)}
                  className="w-full rounded-2xl border border-[#ded4c7] bg-white px-4 py-3.5 text-sm outline-none"
                >
                  <option>Guest</option>
                  <option>Family Member</option>
                  <option>Service Provider</option>
                  <option>Delivery</option>
                </select>
              </div>

              <button
                type="submit"
                className="primary-btn flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold"
              >
                <RefreshCw size={17} />
                Generate QR Access
              </button>
            </form>
          </div>

          <div className="luxury-card flex flex-col items-center justify-center rounded-3xl p-8 text-center">
            {generated ? (
              <>
                <div className="rounded-3xl bg-white p-6 shadow-lg">
                  <QRCodeSVG
                    value={qrValue}
                    size={220}
                    bgColor="#ffffff"
                    fgColor="#302a25"
                    level="H"
                  />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#a48664]">
                  {accessType} Access
                </p>

                <h3 className="serif mt-2 text-2xl text-[#46372b]">
                  {visitorName}
                </h3>

                <div className="mt-4 flex items-center gap-2 rounded-full bg-[#eee7dc] px-4 py-2 text-sm font-semibold text-[#665443]">
                  <ShieldCheck size={16} />
                  Active Access Pass
                </div>

                <div className="mt-5 flex items-center gap-2">
                  <span className="rounded-lg bg-[#f3eee7] px-4 py-2 font-mono text-sm text-[#5e5042]">
                    {accessCode}
                  </span>

                  <button
                    onClick={copyCode}
                    className="rounded-lg border border-[#ded4c7] p-2.5 text-[#6d5945] hover:bg-[#f3eee7]"
                    title="Copy access code"
                  >
                    {copied ? <Check size={17} /> : <Copy size={17} />}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#eee7dc] text-[#6d5945]">
                  <QrCode size={38} />
                </div>

                <h3 className="serif mt-6 text-3xl text-[#46372b]">
                  Your QR pass
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-7 text-[#7b7066]">
                  Your generated access code will appear here after you enter
                  your visitor details.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}