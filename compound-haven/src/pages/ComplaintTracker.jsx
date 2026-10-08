
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  MessageSquareWarning,
} from "lucide-react";

const complaints = [
  {
    id: "CMP-1048",
    title: "Parking gate sensor issue",
    category: "Parking",
    date: "October 6, 2026",
    status: "In Progress",
  },
  {
    id: "CMP-1037",
    title: "Pool lighting request",
    category: "Facilities",
    date: "September 29, 2026",
    status: "Resolved",
  },
  {
    id: "CMP-1024",
    title: "Maintenance request",
    category: "Maintenance",
    date: "September 20, 2026",
    status: "Under Review",
  },
];

const steps = [
  "Submitted",
  "Under Review",
  "In Progress",
  "Resolved",
];

function getStep(status) {
  if (status === "Submitted") return 0;
  if (status === "Under Review") return 1;
  if (status === "In Progress") return 2;

  return 3;
}

export default function ComplaintTracker() {
  return (
    <div className="min-h-screen bg-[#f8f5ef]">

      <section className="bg-[#e9e0d4] px-5 py-16 lg:px-8">

        <div className="mx-auto max-w-6xl">

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a48664]">
            Resident Support
          </p>

          <h1 className="serif mt-3 text-5xl text-[#44372c]">
            Complaint Tracking
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#7c7167]">
            Follow the progress of issues reported to the Maison Verde
            community team.
          </p>

        </div>

      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">

        <div className="space-y-6">

          {complaints.map((complaint) => {

            const activeStep = getStep(complaint.status);

            return (
              <article
                key={complaint.id}
                className="rounded-3xl border border-[#e8dfd3] bg-white p-6 md:p-8"
              >

                <div className="flex flex-col justify-between gap-5 md:flex-row">

                  <div>

                    <div className="flex flex-wrap items-center gap-3">

                      <h2 className="serif text-2xl text-[#44372c]">
                        {complaint.title}
                      </h2>

                      <span className="rounded-full bg-[#f4efe7] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#6d5945]">
                        {complaint.category}
                      </span>

                    </div>

                    <p className="mt-2 text-xs text-[#9a8b7c]">
                      {complaint.id} · {complaint.date}
                    </p>

                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold text-[#6d5945]">

                    {complaint.status === "Resolved" ? (
                      <CheckCircle2 size={18} />
                    ) : complaint.status === "In Progress" ? (
                      <Clock3 size={18} />
                    ) : (
                      <AlertCircle size={18} />
                    )}

                    {complaint.status}

                  </div>

                </div>

                <div className="mt-9">

                  <div className="hidden md:flex items-start">

                    {steps.map((step, index) => {

                      const active = index <= activeStep;

                      return (
                        <div
                          key={step}
                          className="flex flex-1 items-start"
                        >

                          <div className="flex flex-col items-center">

                            <div
                              className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${
                                active
                                  ? "bg-[#6d5945] text-white"
                                  : "bg-[#eee7dc] text-[#9a8b7c]"
                              }`}
                            >
                              {index < activeStep ? (
                                <CheckCircle2 size={16} />
                              ) : (
                                index + 1
                              )}
                            </div>

                            <p
                              className={`mt-2 text-center text-[11px] ${
                                active
                                  ? "font-semibold text-[#594936]"
                                  : "text-[#9a8b7c]"
                              }`}
                            >
                              {step}
                            </p>

                          </div>

                          {index < steps.length - 1 && (
                            <div
                              className={`mt-4 h-0.5 flex-1 ${
                                index < activeStep
                                  ? "bg-[#6d5945]"
                                  : "bg-[#e8dfd3]"
                              }`}
                            />
                          )}

                        </div>
                      );
                    })}

                  </div>

                  <div className="space-y-3 md:hidden">

                    {steps.map((step, index) => (
                      <div
                        key={step}
                        className="flex items-center gap-3"
                      >

                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                            index <= activeStep
                              ? "bg-[#6d5945] text-white"
                              : "bg-[#eee7dc] text-[#9a8b7c]"
                          }`}
                        >
                          {index + 1}
                        </div>

                        <span className="text-sm text-[#594936]">
                          {step}
                        </span>

                      </div>
                    ))}

                  </div>

                </div>

              </article>
            );
          })}

        </div>

        <div className="mt-8 rounded-3xl bg-[#6d5945] p-7 text-white">

          <div className="flex gap-4">

            <MessageSquareWarning
              className="shrink-0"
              size={24}
            />

            <div>

              <h3 className="font-semibold">
                Need to report another issue?
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/70">
                Submit a new complaint from the resident services section.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

