
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import { ToastProvider } from "./components/Toast";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import AddProperty from "./pages/AddProperty";
import MyListings from "./pages/MyListings";

import Payments from "./pages/Payments";
import RentPayment from "./pages/RentPayment";
import PaymentHistory from "./pages/PaymentHistory";

import Facilities from "./pages/Facilities";
import Reservations from "./pages/Reservations";

import Complaints from "./pages/Complaints";
import ComplaintTracker from "./pages/ComplaintTracker";

import Directory from "./pages/Directory";
import CompoundMap from "./pages/CompoundMap";

import QRAccess from "./pages/QRAccess";
import GolfCart from "./pages/GolfCart";
import Parking from "./pages/Parking";

import ResidentPortal from "./pages/ResidentPortal";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function AppContent() {
  const location = useLocation();

  const authPages = ["/login", "/signup"];

  const isAuthPage = authPages.includes(location.pathname);

  return (
    <>
      <LoadingScreen />

      {!isAuthPage && <Navbar />}

      <main className="page-enter">
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          {/* RESIDENT */}
          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/resident-portal"
            element={<ResidentPortal />}
          />

          <Route
            path="/notifications"
            element={<Notifications />}
          />

          <Route path="/profile" element={<Profile />} />

          {/* PROPERTIES */}
          <Route
            path="/properties"
            element={<Properties />}
          />

          <Route
            path="/properties/:id"
            element={<PropertyDetails />}
          />

          <Route
            path="/add-property"
            element={<AddProperty />}
          />

          <Route
            path="/my-listings"
            element={<MyListings />}
          />

          {/* PAYMENTS */}
          <Route
            path="/payments"
            element={<Payments />}
          />

          <Route
            path="/payment-history"
            element={<PaymentHistory />}
          />

          <Route
            path="/rent-payment"
            element={<RentPayment />}
          />

          {/* FACILITIES */}
          <Route
            path="/facilities"
            element={<Facilities />}
          />

          <Route
            path="/reservations"
            element={<Reservations />}
          />

          {/* COMPLAINTS */}
          <Route
            path="/complaints"
            element={<Complaints />}
          />

          <Route
            path="/complaint-tracker"
            element={<ComplaintTracker />}
          />

          {/* COMMUNITY */}
          <Route
            path="/directory"
            element={<Directory />}
          />

          <Route
            path="/map"
            element={<CompoundMap />}
          />

          {/* SERVICES */}
          <Route
            path="/qr-access"
            element={<QRAccess />}
          />

          <Route
            path="/golf-cart"
            element={<GolfCart />}
          />

          <Route
            path="/parking"
            element={<Parking />}
          />

          {/* 404 */}
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#f8f5ef] text-[#302a25]">
        <AppContent />
      </div>
    </ToastProvider>
  );
}

export default App;


