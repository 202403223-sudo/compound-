
import { useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  Home,
  ShieldCheck,
  Save,
  Camera,
  Trash2,
} from "lucide-react";
import { useToast } from "../components/Toast";

export default function Profile() {
  const { showToast } = useToast();

  const getResident = () => {
    try {
      return (
        JSON.parse(localStorage.getItem("resident")) || {
          name: "Resident",
          email: "resident@maisonverde.com",
          phone: "+20 100 000 0000",
          unit: "Residence 12",
          profileImage: "",
        }
      );
    } catch {
      return {
        name: "Resident",
        email: "resident@maisonverde.com",
        phone: "+20 100 000 0000",
        unit: "Residence 12",
        profileImage: "",
      };
    }
  };

  const storedResident = getResident();

  const [form, setForm] = useState({
    name: storedResident.name || "",
    email: storedResident.email || "",
    phone: storedResident.phone || "",
    unit: storedResident.unit || "",
    profileImage: storedResident.profileImage || "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================================
     PROFILE IMAGE
  ========================================= */

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please select a valid image file.", "error");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      showToast(
        "Please choose an image smaller than 3 MB.",
        "error"
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((current) => ({
        ...current,
        profileImage: reader.result,
      }));

      showToast("Profile picture selected successfully.");
    };

    reader.readAsDataURL(file);
  };

  const removeProfileImage = () => {
    setForm((current) => ({
      ...current,
      profileImage: "",
    }));

    showToast("Profile picture removed.");
  };

  /* =========================================
     SAVE PROFILE
  ========================================= */

  const saveProfile = (e) => {
    e.preventDefault();

    const residentData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      unit: form.unit,
      profileImage: form.profileImage,
    };

    localStorage.setItem(
      "resident",
      JSON.stringify(residentData)
    );

    window.dispatchEvent(new Event("residentUpdated"));

    showToast(
      "Your profile has been updated successfully."
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f5ef] transition-colors duration-300 dark:bg-[#11100e]">

      {/* =========================================
          HEADER
      ========================================= */}

      <section className="bg-[#e9e0d4] px-5 py-16 transition-colors duration-300 dark:bg-[#211c18] lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a48664]">
            Account
          </p>

          <h1 className="serif mt-3 text-5xl text-[#44372c] dark:text-[#f4ede3]">
            My Profile
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#7c7167] dark:text-[#b8aa9b]">
            Manage your personal information, profile picture,
            and resident account details.
          </p>
        </div>
      </section>

      {/* =========================================
          PROFILE CONTENT
      ========================================= */}

      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">

        <div className="grid gap-7 lg:grid-cols-[280px_1fr]">

          {/* =========================================
              PROFILE CARD
          ========================================= */}

          <aside className="rounded-3xl border border-[#e8dfd3] bg-white p-7 transition-colors duration-300 dark:border-[#40382f] dark:bg-[#1b1815]">

            {/* AVATAR */}

            <div className="relative mx-auto h-28 w-28">

              {form.profileImage ? (
                <img
                  src={form.profileImage}
                  alt={form.name}
                  className="h-28 w-28 rounded-full object-cover shadow-xl ring-4 ring-[#eee7dc] dark:ring-[#302a25]"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#6d5945] text-white shadow-xl">
                  <UserRound size={42} />
                </div>
              )}

              {/* CAMERA BUTTON */}

              <label
                htmlFor="profile-picture"
                className="
                  absolute bottom-1 right-1
                  flex h-10 w-10
                  cursor-pointer
                  items-center justify-center
                  rounded-full
                  border-4 border-white
                  bg-[#6d5945]
                  text-white
                  shadow-lg
                  transition
                  hover:scale-105

                  dark:border-[#1b1815]
                "
                title="Change profile picture"
              >
                <Camera size={17} />
              </label>

              <input
                id="profile-picture"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* REMOVE PHOTO */}

            {form.profileImage && (
              <button
                type="button"
                onClick={removeProfileImage}
                className="
                  mx-auto mt-4
                  flex items-center gap-2
                  text-xs font-semibold
                  text-red-700
                  transition
                  hover:text-red-900
                  dark:text-red-400
                "
              >
                <Trash2 size={14} />
                Remove picture
              </button>
            )}

            {/* NAME */}

            <div className="mt-5 text-center">
              <h2 className="serif text-2xl text-[#44372c] dark:text-[#f4ede3]">
                {form.name || "Resident"}
              </h2>

              <p className="mt-1 text-xs text-[#8a7c6d] dark:text-[#a99d90]">
                Resident · Maison Verde
              </p>
            </div>

            {/* SECURITY CARD */}

            <div className="mt-7 rounded-2xl bg-[#f4efe7] p-4 dark:bg-[#211c18]">
              <div className="flex items-center gap-2 text-[#6d5945] dark:text-[#d2b996]">
                <ShieldCheck size={17} />

                <span className="text-xs font-semibold">
                  Account Protected
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-[#8a7c6d] dark:text-[#a99d90]">
                Your resident account is protected by Maison
                Verde security.
              </p>
            </div>

            {/* PHOTO INFO */}

            <div className="mt-4 rounded-2xl border border-[#e8dfd3] p-4 dark:border-[#40382f]">
              <p className="text-xs font-semibold text-[#594936] dark:text-[#ded4c7]">
                Profile photo
              </p>

              <p className="mt-1 text-[11px] leading-5 text-[#8a7c6d] dark:text-[#a99d90]">
                JPG, PNG or WEBP · Maximum 3 MB
              </p>
            </div>
          </aside>

          {/* =========================================
              PROFILE FORM
          ========================================= */}

          <form
            onSubmit={saveProfile}
            className="
              rounded-3xl
              border border-[#e8dfd3]
              bg-white
              p-7
              transition-colors duration-300

              dark:border-[#40382f]
              dark:bg-[#1b1815]

              md:p-9
            "
          >

            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a48664]">
                Personal Information
              </p>

              <h2 className="serif mt-2 text-3xl text-[#44372c] dark:text-[#f4ede3]">
                Account details
              </h2>

              <p className="mt-2 text-sm text-[#8a7c6d] dark:text-[#a99d90]">
                Keep your information up to date so other
                residents can contact you when needed.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* NAME */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#594936] dark:text-[#ded4c7]">
                  Full Name
                </label>

                <div className="relative">
                  <UserRound
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a18d78]"
                  />

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="
                      w-full rounded-2xl
                      border border-[#ded4c7]
                      bg-[#fdfbf8]
                      py-3.5 pl-11 pr-4
                      text-sm
                      outline-none

                      focus:border-[#9e8262]
                      focus:ring-4
                      focus:ring-[#9e8262]/10

                      dark:border-[#40382f]
                      dark:bg-[#171411]
                      dark:text-white
                    "
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#594936] dark:text-[#ded4c7]">
                  Email
                </label>

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
                    required
                    className="
                      w-full rounded-2xl
                      border border-[#ded4c7]
                      bg-[#fdfbf8]
                      py-3.5 pl-11 pr-4
                      text-sm
                      outline-none

                      focus:border-[#9e8262]
                      focus:ring-4
                      focus:ring-[#9e8262]/10

                      dark:border-[#40382f]
                      dark:bg-[#171411]
                      dark:text-white
                    "
                  />
                </div>
              </div>

              {/* PHONE */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#594936] dark:text-[#ded4c7]">
                  Phone
                </label>

                <div className="relative">
                  <Phone
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a18d78]"
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone || ""}
                    onChange={handleChange}
                    className="
                      w-full rounded-2xl
                      border border-[#ded4c7]
                      bg-[#fdfbf8]
                      py-3.5 pl-11 pr-4
                      text-sm
                      outline-none

                      focus:border-[#9e8262]
                      focus:ring-4
                      focus:ring-[#9e8262]/10

                      dark:border-[#40382f]
                      dark:bg-[#171411]
                      dark:text-white
                    "
                  />
                </div>
              </div>

              {/* RESIDENCE */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#594936] dark:text-[#ded4c7]">
                  Residence
                </label>

                <div className="relative">
                  <Home
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a18d78]"
                  />

                  <input
                    name="unit"
                    value={form.unit}
                    onChange={handleChange}
                    className="
                      w-full rounded-2xl
                      border border-[#ded4c7]
                      bg-[#fdfbf8]
                      py-3.5 pl-11 pr-4
                      text-sm
                      outline-none

                      focus:border-[#9e8262]
                      focus:ring-4
                      focus:ring-[#9e8262]/10

                      dark:border-[#40382f]
                      dark:bg-[#171411]
                      dark:text-white
                    "
                  />
                </div>
              </div>
            </div>

            {/* SAVE */}

            <button
              type="submit"
              className="
                primary-btn
                mt-8
                inline-flex
                items-center
                gap-2
                rounded-full
                px-7
                py-3.5
                text-sm
                font-semibold
              "
            >
              <Save size={17} />
              Save Changes
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}


