
import { useState } from "react";
import {
  ArrowLeft,
  Home,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  ImagePlus,
  Tag,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../components/Toast";

export default function AddProperty() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const resident = (() => {
    try {
      return JSON.parse(localStorage.getItem("resident")) || {};
    } catch {
      return {};
    }
  })();

  const [form, setForm] = useState({
    title: "",
    type: "For Sale",
    price: "",
    location: "",
    beds: "",
    baths: "",
    area: "",
    description: "",
    amenities: "",
    image: "",
  });

  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please select a valid image.", "error");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      showToast("Image must be smaller than 4 MB.", "error");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageUrl = reader.result;

      setPreview(imageUrl);

      setForm((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.price ||
      !form.location ||
      !form.beds ||
      !form.baths ||
      !form.area ||
      !form.description
    ) {
      showToast("Please complete all required fields.", "error");
      return;
    }

    const newProperty = {
      id: `user-${Date.now()}`,
      title: form.title,
      type: form.type,
      status: "Available",
      location: form.location,
      price: `$${Number(form.price).toLocaleString()}`,
      priceLabel:
        form.type === "For Rent"
          ? `$${Number(form.price).toLocaleString()} / month`
          : `$${Number(form.price).toLocaleString()}`,
      numericPrice: Number(form.price),

      beds: Number(form.beds),
      baths: Number(form.baths),
      area: Number(form.area),

      description: form.description,

      image:
        form.image ||
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",

      amenities: form.amenities
        ? form.amenities
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [],

      owner: {
        name: resident.name || "Maison Verde Resident",
        email: resident.email || "",
        phone: resident.phone || "",
        unit: resident.unit || "",
      },

      ownerId: resident.email || resident.name || "resident",

      createdAt: new Date().toISOString(),
    };

    const existingListings = JSON.parse(
      localStorage.getItem("userListings") || "[]"
    );

    localStorage.setItem(
      "userListings",
      JSON.stringify([
        newProperty,
        ...existingListings,
      ])
    );

    window.dispatchEvent(new Event("propertiesUpdated"));

    showToast("Your property has been listed successfully.", "success");

    setTimeout(() => {
      navigate("/my-listings");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#f8f5ef] pb-20 dark:bg-[#11100e]">
      {/* Header */}
      <section className="border-b border-[#e8dfd3] bg-[#f4eee5] dark:border-[#302a25] dark:bg-[#171411]">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <Link
            to="/properties"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#75695e] transition hover:text-[#6d5945] dark:text-[#b8aa9b] dark:hover:text-[#f4ede3]"
          >
            <ArrowLeft size={17} />
            Back to Properties
          </Link>

          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#9b8060]">
              Resident Marketplace
            </p>

            <h1 className="serif text-4xl text-[#44372c] md:text-5xl dark:text-[#f4ede3]">
              List your property
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#75695e] md:text-base dark:text-[#b8aa9b]">
              Share your apartment or villa with the Maison Verde community.
              Choose whether you want to sell or rent your property.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-[#e8dfd3] bg-white p-6 shadow-sm md:p-10 dark:border-[#40382f] dark:bg-[#1b1815]"
        >
          {/* Basic Information */}
          <div className="mb-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eee7dc] text-[#6d5945] dark:bg-[#302a25] dark:text-[#d8cbbb]">
                <Home size={19} />
              </div>

              <div>
                <h2 className="font-semibold text-[#44372c] dark:text-[#f4ede3]">
                  Property Information
                </h2>

                <p className="text-xs text-[#8a7c6d] dark:text-[#a99d90]">
                  Tell residents about your property.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Property Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Garden View Apartment"
                required
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-[#594936] dark:text-[#ded4c7]">
                  Listing Type
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {["For Sale", "For Rent"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          type,
                        }))
                      }
                      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                        form.type === type
                          ? "border-[#6d5945] bg-[#6d5945] text-white"
                          : "border-[#ded4c7] bg-[#fdfbf8] text-[#75695e] hover:bg-[#f4eee5] dark:border-[#40382f] dark:bg-[#211c18] dark:text-[#c8bcae]"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <Field
                label={form.type === "For Rent" ? "Monthly Rent" : "Price"}
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder={
                  form.type === "For Rent"
                    ? "e.g. 1800"
                    : "e.g. 350000"
                }
                icon={<Tag size={16} />}
                required
              />

              <Field
                label="Location"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Palm District, Building 4"
                icon={<MapPin size={16} />}
                required
              />

              <Field
                label="Bedrooms"
                name="beds"
                type="number"
                min="1"
                value={form.beds}
                onChange={handleChange}
                placeholder="e.g. 3"
                icon={<BedDouble size={16} />}
                required
              />

              <Field
                label="Bathrooms"
                name="baths"
                type="number"
                min="1"
                value={form.baths}
                onChange={handleChange}
                placeholder="e.g. 2"
                icon={<Bath size={16} />}
                required
              />

              <Field
                label="Area (m²)"
                name="area"
                type="number"
                min="1"
                value={form.area}
                onChange={handleChange}
                placeholder="e.g. 165"
                icon={<Ruler size={16} />}
                required
              />
            </div>
          </div>

          {/* Image */}
          <div className="mb-10 border-t border-[#eee7dc] pt-10 dark:border-[#40382f]">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eee7dc] text-[#6d5945] dark:bg-[#302a25] dark:text-[#d8cbbb]">
                <ImagePlus size={19} />
              </div>

              <div>
                <h2 className="font-semibold text-[#44372c] dark:text-[#f4ede3]">
                  Property Photo
                </h2>

                <p className="text-xs text-[#8a7c6d] dark:text-[#a99d90]">
                  Add a clear photo of your property.
                </p>
              </div>
            </div>

            <label className="group relative flex min-h-[240px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#d8cbbb] bg-[#fdfbf8] transition hover:border-[#9b8060] dark:border-[#40382f] dark:bg-[#171411]">
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Property preview"
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/35 opacity-0 transition group-hover:opacity-100" />

                  <div className="relative z-10 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#594936] opacity-0 shadow-lg transition group-hover:opacity-100">
                    Change Photo
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#eee7dc] text-[#6d5945] dark:bg-[#302a25] dark:text-[#d8cbbb]">
                    <ImagePlus size={24} />
                  </div>

                  <p className="font-semibold text-[#594936] dark:text-[#ded4c7]">
                    Upload property photo
                  </p>

                  <p className="mt-1 text-xs text-[#8a7c6d]">
                    PNG, JPG or WEBP · Max 4 MB
                  </p>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Description */}
          <div className="mb-10 border-t border-[#eee7dc] pt-10 dark:border-[#40382f]">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eee7dc] text-[#6d5945] dark:bg-[#302a25] dark:text-[#d8cbbb]">
                <FileText size={19} />
              </div>

              <div>
                <h2 className="font-semibold text-[#44372c] dark:text-[#f4ede3]">
                  Description & Amenities
                </h2>

                <p className="text-xs text-[#8a7c6d] dark:text-[#a99d90]">
                  Give potential residents useful details.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#594936] dark:text-[#ded4c7]">
                  Property Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe the property, view, finishing, floor, nearby facilities..."
                  className="w-full resize-none rounded-xl border border-[#ded4c7] bg-[#fdfbf8] px-4 py-3 text-sm text-[#44372c] outline-none transition focus:border-[#a48664] focus:ring-2 focus:ring-[#a48664]/10 dark:border-[#40382f] dark:bg-[#211c18] dark:text-[#f4ede3]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#594936] dark:text-[#ded4c7]">
                  Amenities
                </label>

                <input
                  name="amenities"
                  value={form.amenities}
                  onChange={handleChange}
                  placeholder="Pool, Parking, Balcony, Garden, Security..."
                  className="w-full rounded-xl border border-[#ded4c7] bg-[#fdfbf8] px-4 py-3 text-sm text-[#44372c] outline-none transition focus:border-[#a48664] focus:ring-2 focus:ring-[#a48664]/10 dark:border-[#40382f] dark:bg-[#211c18] dark:text-[#f4ede3]"
                />

                <p className="mt-2 text-xs text-[#8a7c6d] dark:text-[#9e9184]">
                  Separate amenities with commas.
                </p>
              </div>
            </div>
          </div>

          {/* Owner */}
          <div className="mb-10 border-t border-[#eee7dc] pt-10 dark:border-[#40382f]">
            <div className="rounded-2xl bg-[#f8f5ef] p-5 dark:bg-[#211c18]">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-[#6d5945] dark:text-[#d2b996]"
                />

                <div>
                  <p className="text-sm font-semibold text-[#44372c] dark:text-[#f4ede3]">
                    Your resident information
                  </p>

                  <p className="mt-1 text-xs leading-6 text-[#75695e] dark:text-[#b8aa9b]">
                    Your saved resident name, email and phone will be attached
                    to this listing so interested residents can contact you.
                  </p>

                  <div className="mt-3 text-xs text-[#594936] dark:text-[#ded4c7]">
                    <p>{resident.name || "Resident"}</p>
                    <p>{resident.email || "No email added"}</p>
                    <p>{resident.phone || "No phone added"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              to="/properties"
              className="rounded-xl border border-[#d8cbbb] bg-white px-6 py-3 text-center text-sm font-semibold text-[#6d5945] transition hover:bg-[#f4eee5] dark:border-[#40382f] dark:bg-[#211c18] dark:text-[#d8cbbb]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-xl bg-[#6d5945] px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#594936] hover:shadow-lg"
            >
              Publish Property
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
  required = false,
  min,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#594936] dark:text-[#ded4c7]">
        {label}
        {required && <span className="ml-1 text-[#9c6b4c]">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9a8b7c]">
            {icon}
          </span>
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          required={required}
          className={`w-full rounded-xl border border-[#ded4c7] bg-[#fdfbf8] py-3 text-sm text-[#44372c] outline-none transition placeholder:text-[#aaa093] focus:border-[#a48664] focus:ring-2 focus:ring-[#a48664]/10 dark:border-[#40382f] dark:bg-[#211c18] dark:text-[#f4ede3] ${
            icon ? "pl-10 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}
