"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../providers/AuthProvider";
import Navbar from "../components/Navbar/page";
import Sidebar from "../components/Sidebar";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import PopUp from "./PopUp/page";
import Footer from "./Footer";  // ← Import correct hai

export default function LayoutContent({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const publicRoutes = ["/login", "/register", "/verify-otp"];
  const hideDashboardUIRoutes = ["/ask/chat"];

  const hideNavbar =
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/verify-otp/") ||
    hideDashboardUIRoutes.includes(pathname);

  const hideSidebar = hideDashboardUIRoutes.includes(pathname);

  useEffect(() => {
    if (loading) return;

    if (user && (publicRoutes.includes(pathname) || pathname === "/")) {
      router.replace("/dashboard");
      return;
    }

    if (user && !user.profileCompleted) {
      setShowProfilePopup(true);
    } else {
      setShowProfilePopup(false);
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-medium text-gray-700">Loading...</div>
      </div>
    );
  }

  // NOT LOGGED IN
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
        {!hideNavbar && <Navbar />}

        <main className={`flex-1 bg-gray-50 ${!hideNavbar ? "pt-16" : ""}`}>
          {children}
        </main>

        <Footer />  {/* ← Public pages pe dikhega */}
      </div>
    );
  }

  // LOGGED IN (Dashboard Layout)
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

      {/* Navbar */}
      {!hideNavbar && (
        <Navbar onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
      )}

      <div className="flex flex-1">
        {/* Sidebar */}
        {!hideSidebar && (
          <aside
            className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar />
          </aside>
        )}

        {/* Mobile Overlay */}
        {!hideSidebar && sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <main
            className={`flex-1 bg-gray-50 ${!hideNavbar ? "pt-16" : "pt-2"} p-4 lg:p-6`}
          >
            {children}
          </main>

          {/* FOOTER - AB HAMESHA DIKHEGA */}
          <Footer />
        </div>
      </div>

      {/* Profile Popup */}
      {showProfilePopup && (
        <PopUp onClose={() => setShowProfilePopup(false)} />
      )}
    </div>
  );
}