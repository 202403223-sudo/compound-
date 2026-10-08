
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Bell,
  UserRound,
  LogOut,
  Search,
  Sun,
  Moon,
} from "lucide-react";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

const searchItems = [
  { name: "Home", path: "/" },
  { name: "Properties", path: "/properties" },
  { name: "Add Property", path: "/add-property" },
  { name: "My Listings", path: "/my-listings" },
  { name: "Facilities", path: "/facilities" },
  { name: "Compound Map", path: "/map" },
  { name: "Neighbors Directory", path: "/directory" },
  { name: "Payments", path: "/payments" },
  { name: "Payment History", path: "/payment-history" },
  { name: "Rent Payment", path: "/rent-payment" },
  { name: "Reservations", path: "/reservations" },
  { name: "Complaints", path: "/complaints" },
  { name: "Complaint Tracker", path: "/complaint-tracker" },
  { name: "QR Access", path: "/qr-access" },
  { name: "Golf Cart", path: "/golf-cart" },
  { name: "Parking", path: "/parking" },
  { name: "Resident Portal", path: "/resident-portal" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Profile", path: "/profile" },
  { name: "Notifications", path: "/notifications" },
];

export default function Navbar() {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [resident, setResident] = useState(() => {
    try {
      const savedResident =
        JSON.parse(localStorage.getItem("resident"));

      return (
        savedResident || {
          name: "Resident",
          unit: "Residence 12",
        }
      );
    } catch {
      return {
        name: "Resident",
        unit: "Residence 12",
      };
    }
  });

  /* =========================================
     INITIAL THEME
  ========================================= */

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  /* =========================================
     UPDATE RESIDENT DATA
  ========================================= */

  useEffect(() => {
    const checkResident = () => {
      const loggedIn =
        localStorage.getItem("isLoggedIn") === "true";

      setIsLoggedIn(loggedIn);

      try {
        const savedResident =
          JSON.parse(localStorage.getItem("resident"));

        if (savedResident) {
          setResident(savedResident);
        }
      } catch {
        // Ignore invalid localStorage data
      }
    };

    // Check immediately
    checkResident();

    // Listen for changes from another browser tab
    window.addEventListener(
      "storage",
      checkResident
    );

    // Listen for changes inside the same tab
    window.addEventListener(
      "residentUpdated",
      checkResident
    );

    return () => {
      window.removeEventListener(
        "storage",
        checkResident
      );

      window.removeEventListener(
        "residentUpdated",
        checkResident
      );
    };
  }, []);

  /* =========================================
     NAVIGATION LINKS
  ========================================= */

  const links = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: "Facilities", path: "/facilities" },
    { name: "Map", path: "/map" },
    { name: "Directory", path: "/directory" },
  ];

  /* =========================================
     SEARCH
  ========================================= */

  const filteredResults = searchItems.filter((item) =>
    item.name
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  );

  const goToSearchResult = (path) => {
    navigate(path);

    setSearchOpen(false);
    setSearchValue("");
    setMobileOpen(false);
  };

  /* =========================================
     LOGOUT
  ========================================= */

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("resident");

    setIsLoggedIn(false);
    setProfileOpen(false);
    setMobileOpen(false);

    setResident({
      name: "Resident",
      unit: "Residence 12",
    });

    navigate("/");
  };

  /* =========================================
     DARK MODE
  ========================================= */

  const toggleDarkMode = () => {
    const nextMode = !darkMode;

    setDarkMode(nextMode);

    localStorage.setItem(
      "theme",
      nextMode ? "dark" : "light"
    );

    if (nextMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  /* =========================================
     PROFILE IMAGE
  ========================================= */

  const profileImage =
    resident?.profileImage ||
    resident?.avatar ||
    null;

  return (
    <header
      className="
        sticky top-0 z-40
        border-b border-[#e8dfd3]
        bg-[#f8f5ef]/95
        backdrop-blur-xl
        transition-colors duration-300

        dark:border-[#302a25]
        dark:bg-[#171411]/95
      "
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* =========================================
            LOGO
        ========================================= */}

        <Link
          to="/"
          className="group flex items-center gap-3"
          onClick={() => {
            setMobileOpen(false);
            setProfileOpen(false);
          }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6d5945] text-white shadow-md transition group-hover:rotate-6">
            <span className="serif text-lg">
              M
            </span>
          </div>

          <div className="hidden sm:block">
            <p className="serif text-xl leading-none text-[#44372c] dark:text-[#f4ede3]">
              Maison Verde
            </p>

            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#9b8060]">
              Residential Community
            </p>
          </div>
        </Link>

        {/* =========================================
            DESKTOP NAV
        ========================================= */}

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#6d5945] dark:text-[#d2b996]"
                    : "text-[#75695e] hover:text-[#6d5945] dark:text-[#c8bcae] dark:hover:text-[#f4ede3]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}

                  {isActive && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[#b69b79]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* =========================================
            DESKTOP ACTIONS
        ========================================= */}

        <div className="hidden items-center gap-2 md:flex">

          {/* SEARCH */}

          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setSearchOpen(!searchOpen)
              }
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full
                border border-[#ded4c7]
                bg-white
                text-[#6d5945]
                transition

                hover:-translate-y-0.5
                hover:bg-[#eee7dc]

                dark:border-[#40382f]
                dark:bg-[#211c18]
                dark:text-[#d8cbbb]
                dark:hover:bg-[#302a25]
              "
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {searchOpen && (
              <div
                className="
                  absolute right-0 top-14
                  w-80 overflow-hidden
                  rounded-2xl
                  border border-[#e8dfd3]
                  bg-white
                  p-3
                  shadow-2xl

                  dark:border-[#40382f]
                  dark:bg-[#211c18]
                "
              >
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8b7c]"
                  />

                  <input
                    autoFocus
                    value={searchValue}
                    onChange={(e) =>
                      setSearchValue(e.target.value)
                    }
                    placeholder="Search community..."
                    className="
                      w-full rounded-xl
                      border border-[#ded4c7]
                      bg-[#fdfbf8]
                      py-3 pl-9 pr-3
                      text-sm
                      outline-none

                      focus:border-[#a48664]
                      focus:ring-2
                      focus:ring-[#a48664]/10

                      dark:border-[#40382f]
                      dark:bg-[#171411]
                      dark:text-white
                    "
                  />
                </div>

                <div className="mt-2 max-h-72 overflow-y-auto">
                  {searchValue &&
                    filteredResults.length === 0 && (
                      <p className="px-3 py-4 text-center text-xs text-[#9a8b7c]">
                        No results found.
                      </p>
                    )}

                  {filteredResults.map((item) => (
                    <button
                      key={item.path}
                      type="button"
                      onClick={() =>
                        goToSearchResult(item.path)
                      }
                      className="
                        flex w-full items-center gap-3
                        rounded-xl px-3 py-3
                        text-left text-sm
                        text-[#594936]
                        transition
                        hover:bg-[#f4efe7]

                        dark:text-[#ded4c7]
                        dark:hover:bg-[#302a25]
                      "
                    >
                      <Search size={15} />
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* DARK MODE */}

          <button
            type="button"
            onClick={toggleDarkMode}
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-full
              border border-[#ded4c7]
              bg-white
              text-[#6d5945]
              transition

              hover:-translate-y-0.5
              hover:bg-[#eee7dc]

              dark:border-[#40382f]
              dark:bg-[#211c18]
              dark:text-[#d8cbbb]
              dark:hover:bg-[#302a25]
            "
            aria-label={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            {darkMode ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>

          {/* AUTH STATE */}

          {isLoggedIn ? (
            <>
              {/* NOTIFICATIONS */}

              <Link
                to="/notifications"
                className="
                  relative flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  border border-[#ded4c7]
                  bg-white
                  text-[#6d5945]
                  transition

                  hover:-translate-y-0.5
                  hover:bg-[#eee7dc]

                  dark:border-[#40382f]
                  dark:bg-[#211c18]
                  dark:text-[#d8cbbb]
                  dark:hover:bg-[#302a25]
                "
                aria-label="Notifications"
              >
                <Bell size={18} />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#9c6b4c]" />
              </Link>

              {/* PROFILE */}

              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setProfileOpen(!profileOpen)
                  }
                  className="
                    flex items-center gap-3
                    rounded-full
                    border border-[#ded4c7]
                    bg-white
                    px-3 py-2
                    transition
                    hover:bg-[#eee7dc]

                    dark:border-[#40382f]
                    dark:bg-[#211c18]
                    dark:hover:bg-[#302a25]
                  "
                >
                  {/* AVATAR */}

                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={resident.name || "Resident"}
                      className="h-8 w-8 rounded-full object-cover ring-2 ring-[#d8cbbb]"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6d5945] text-white">
                      <UserRound size={16} />
                    </div>
                  )}

                  <div className="hidden text-left xl:block">
                    <p className="max-w-[120px] truncate text-xs font-semibold text-[#44372c] dark:text-[#f4ede3]">
                      {resident.name || "Resident"}
                    </p>

                    <p className="text-[10px] text-[#8a7c6d] dark:text-[#a99d90]">
                      {resident.unit || "Resident"}
                    </p>
                  </div>
                </button>

                {/* PROFILE DROPDOWN */}

                {profileOpen && (
                  <div
                    className="
                      absolute right-0 top-14
                      w-60 overflow-hidden
                      rounded-2xl
                      border border-[#e8dfd3]
                      bg-white
                      p-2
                      shadow-xl

                      dark:border-[#40382f]
                      dark:bg-[#211c18]
                    "
                  >
                    <Link
                      to="/profile"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                      className="
                        flex items-center gap-3
                        rounded-xl px-3 py-3
                        text-sm
                        text-[#594936]
                        transition
                        hover:bg-[#f4efe7]

                        dark:text-[#ded4c7]
                        dark:hover:bg-[#302a25]
                      "
                    >
                      <UserRound size={17} />
                      My Profile
                    </Link>

                    <Link
                      to="/add-property"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                      className="
                        flex items-center gap-3
                        rounded-xl px-3 py-3
                        text-sm
                        text-[#594936]
                        transition
                        hover:bg-[#f4efe7]

                        dark:text-[#ded4c7]
                        dark:hover:bg-[#302a25]
                      "
                    >
                      <span className="text-lg">
                        +
                      </span>
                      Add Property
                    </Link>

                    <Link
                      to="/my-listings"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                      className="
                        flex items-center gap-3
                        rounded-xl px-3 py-3
                        text-sm
                        text-[#594936]
                        transition
                        hover:bg-[#f4efe7]

                        dark:text-[#ded4c7]
                        dark:hover:bg-[#302a25]
                      "
                    >
                      <span className="text-lg">
                        🏠
                      </span>
                      My Listings
                    </Link>

                    <Link
                      to="/resident-portal"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                      className="
                        flex items-center gap-3
                        rounded-xl px-3 py-3
                        text-sm
                        text-[#594936]
                        transition
                        hover:bg-[#f4efe7]

                        dark:text-[#ded4c7]
                        dark:hover:bg-[#302a25]
                      "
                    >
                      <UserRound size={17} />
                      Resident Portal
                    </Link>

                    <Link
                      to="/dashboard"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                      className="
                        flex items-center gap-3
                        rounded-xl px-3 py-3
                        text-sm
                        text-[#594936]
                        transition
                        hover:bg-[#f4efe7]

                        dark:text-[#ded4c7]
                        dark:hover:bg-[#302a25]
                      "
                    >
                      <Bell size={17} />
                      Dashboard
                    </Link>

                    <div className="my-1 border-t border-[#eee7dc] dark:border-[#40382f]" />

                    <button
                      type="button"
                      onClick={logout}
                      className="
                        flex w-full items-center gap-3
                        rounded-xl px-3 py-3
                        text-left text-sm
                        text-red-700
                        transition
                        hover:bg-red-50
                        dark:text-red-400
                        dark:hover:bg-red-950/30
                      "
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* SIGN IN */}

              <Link
                to="/login"
                className="
                  rounded-full
                  px-5 py-2.5
                  text-sm font-semibold
                  text-[#6d5945]
                  transition
                  hover:bg-[#eee7dc]

                  dark:text-[#d8cbbb]
                  dark:hover:bg-[#302a25]
                "
              >
                Sign In
              </Link>

              {/* CREATE ACCOUNT */}

              <Link
                to="/signup"
                className="
                  rounded-full
                  bg-[#6d5945]
                  px-5 py-2.5
                  text-sm font-semibold
                  text-white
                  shadow-md
                  transition

                  hover:-translate-y-0.5
                  hover:bg-[#594936]
                  hover:shadow-lg
                "
              >
                Create Account
              </Link>
            </>
          )}
        </div>

        {/* MOBILE BUTTON */}

        <button
          type="button"
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
          className="
            flex h-10 w-10
            items-center justify-center
            rounded-full
            border border-[#ded4c7]
            bg-white
            text-[#594936]

            md:hidden

            dark:border-[#40382f]
            dark:bg-[#211c18]
            dark:text-[#ded4c7]
          "
          aria-label="Open menu"
        >
          {mobileOpen ? (
            <X size={20} />
          ) : (
            <Menu size={20} />
          )}
        </button>
      </div>

      {/* =========================================
          MOBILE MENU
      ========================================= */}

      {mobileOpen && (
        <div
          className="
            border-t border-[#e8dfd3]
            bg-[#f8f5ef]
            px-5 py-5
            md:hidden

            dark:border-[#302a25]
            dark:bg-[#171411]
          "
        >
          {/* SEARCH */}

          <div className="relative mb-4">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a8b7c]"
            />

            <input
              value={searchValue}
              onChange={(e) =>
                setSearchValue(e.target.value)
              }
              placeholder="Search community..."
              className="
                w-full rounded-xl
                border border-[#ded4c7]
                bg-white
                py-3 pl-11 pr-4
                text-sm
                outline-none

                dark:border-[#40382f]
                dark:bg-[#211c18]
                dark:text-white
              "
            />

            {searchValue && (
              <div className="mt-2 rounded-xl bg-white p-2 shadow-lg dark:bg-[#211c18]">
                {filteredResults.length > 0 ? (
                  filteredResults.map((item) => (
                    <button
                      key={item.path}
                      type="button"
                      onClick={() =>
                        goToSearchResult(item.path)
                      }
                      className="
                        block w-full
                        rounded-lg px-3 py-2
                        text-left text-sm
                        text-[#594936]
                        hover:bg-[#f4efe7]

                        dark:text-[#ded4c7]
                        dark:hover:bg-[#302a25]
                      "
                    >
                      {item.name}
                    </button>
                  ))
                ) : (
                  <p className="px-3 py-3 text-center text-xs text-[#9a8b7c]">
                    No results found.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* LINKS */}

          <nav className="space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() =>
                  setMobileOpen(false)
                }
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-sm font-medium ${
                    isActive
                      ? "bg-[#eee7dc] text-[#6d5945] dark:bg-[#302a25] dark:text-[#d2b996]"
                      : "text-[#75695e] dark:text-[#c8bcae]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="mt-4 border-t border-[#e8dfd3] pt-4 dark:border-[#302a25]">

            {/* MOBILE AUTH */}

            {!isLoggedIn ? (
              <div className="grid grid-cols-2 gap-3">

                <Link
                  to="/login"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="
                    rounded-xl
                    border border-[#d8cbbb]
                    bg-white
                    px-4 py-3
                    text-center
                    text-sm font-semibold
                    text-[#6d5945]

                    dark:border-[#40382f]
                    dark:bg-[#211c18]
                    dark:text-[#d8cbbb]
                  "
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="
                    rounded-xl
                    bg-[#6d5945]
                    px-4 py-3
                    text-center
                    text-sm font-semibold
                    text-white
                  "
                >
                  Create Account
                </Link>

              </div>
            ) : (
              <>
                <Link
                  to="/profile"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="
                    flex items-center gap-3
                    rounded-xl px-4 py-3
                    text-sm font-medium
                    text-[#594936]

                    dark:text-[#ded4c7]
                  "
                >
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={resident.name || "Resident"}
                      className="h-7 w-7 rounded-full object-cover"
                    />
                  ) : (
                    <UserRound size={18} />
                  )}

                  My Profile
                </Link>

                <Link
                  to="/add-property"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="
                    flex items-center gap-3
                    rounded-xl px-4 py-3
                    text-sm font-medium
                    text-[#594936]

                    dark:text-[#ded4c7]
                  "
                >
                  <span className="text-lg">
                    +
                  </span>
                  Add Property
                </Link>

                <Link
                  to="/my-listings"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="
                    flex items-center gap-3
                    rounded-xl px-4 py-3
                    text-sm font-medium
                    text-[#594936]

                    dark:text-[#ded4c7]
                  "
                >
                  <span className="text-lg">
                    🏠
                  </span>
                  My Listings
                </Link>

                <Link
                  to="/notifications"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="
                    flex items-center gap-3
                    rounded-xl px-4 py-3
                    text-sm font-medium
                    text-[#594936]

                    dark:text-[#ded4c7]
                  "
                >
                  <Bell size={18} />
                  Notifications
                </Link>

                <button
                  type="button"
                  onClick={toggleDarkMode}
                  className="
                    flex w-full items-center gap-3
                    rounded-xl px-4 py-3
                    text-sm font-medium
                    text-[#594936]

                    dark:text-[#ded4c7]
                  "
                >
                  {darkMode ? (
                    <Sun size={18} />
                  ) : (
                    <Moon size={18} />
                  )}

                  {darkMode
                    ? "Light Mode"
                    : "Dark Mode"}
                </button>

                <button
                  type="button"
                  onClick={logout}
                  className="
                    flex w-full items-center gap-3
                    rounded-xl px-4 py-3
                    text-sm font-medium
                    text-red-700
                    dark:text-red-400
                  "
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

