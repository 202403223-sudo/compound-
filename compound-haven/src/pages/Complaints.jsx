import { useState } from "react";
import {
  MessageSquareWarning,
  CheckCircle2,
  Send,
} from "lucide-react";
import SectionTitle from "../components/SectionTitle";

export default function Complaints() {
  const [form, setForm] = useState({
    category: "Maintenance",
    priority: "Normal",
    subject: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <section className="bg-[#e9e0d4] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Resident Support"
            title="Tell us what needs attention."
            description="Submit a maintenance request, community complaint or service issue directly to the management team."
          />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-14 lg:px-8">
        {submitted ? (
          <div className="luxury-card rounded-3xl p-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-700">
              <CheckCircle2 size={34} />
            </div>

            <h2 className="serif mt-6 text-4xl text-[#46372b]">
              Issue submitted
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#7b7066]">
              Thank you. Your request has been sent to the Maison Verde
              management team. We will review it and follow up shortly.
            </p>

            <button
              onClick={() => {
                setSubmitted(false);
                setForm({
                  category: "Maintenance",
                  priority: "Normal",
                  subject: "",
                  description: "",
                });
              }}
              className="primary-btn mt-7 rounded-full px-6 py-3 text-sm font-semibold"
            >
              Submit Another Issue
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="luxury-card rounded-3xl p-7 md:p-9"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eee7dc] text-[#6d5945]">
              <MessageSquareWarning size={23} />
            </div>

            <h2 className="serif mt-6 text-3xl text-[#46372b]">
              Report an issue
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#7b7066]">
              Please provide enough detail for our team to understand and
              resolve the issue quickly.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#5d5044]">
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#ded4c7] bg-white px-4 py-3.5 text-sm outline-none"
                >
                  <option>Maintenance</option>
                  <option>Security</option>
                  <option>Parking</option>
                  <option>Facilities</option>
                  <option>Noise</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#5d5044]">
                  Priority
                </label>

                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#ded4c7] bg-white px-4 py-3.5 text-sm outline-none"
                >
                  <option>Low</option>
                  <option>Normal</option>
                  <option>High</option>
                  <option>Urgent</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-[#5d5044]">
                Subject
              </label>

              <input
                required
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Briefly describe the issue"
                className="w-full rounded-2xl border border-[#ded4c7] bg-white px-4 py-3.5 text-sm outline-none focus:border-[#9c805f]"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-[#5d5044]">
                Description
              </label>

              <textarea
                required
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={6}
                placeholder="Tell us what happened, where it happened and any useful details..."
                className="w-full resize-none rounded-2xl border border-[#ded4c7] bg-white px-4 py-3.5 text-sm outline-none focus:border-[#9c805f]"
              />
            </div>

            <button
              type="submit"
              className="primary-btn mt-6 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold"
            >
              <Send size={17} />
              Submit Issue
            </button>
          </form>
        )}
      </section>
    </div>
  );
}