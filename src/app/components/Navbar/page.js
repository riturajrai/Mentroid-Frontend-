"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../providers/AuthProvider";
import { LogOut, User, Settings, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import api from "@/app/lib/api";
import logo from "../../../../public/mentoroid.png";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/user/auth/logout", {});
      setUser(null);
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav
      className="
    bg-gradient-to-r
    from-[color:var(--color-primary)]
    via-[#335F52]
    to-[#0F4D2A]
    border-b border-gray-200 shadow-sm sticky top-0 z-50
  ">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href={user ? "/dashboard" : "/"}
            className="flex items-center gap-3"
          >
            <Image
              src={logo}
              alt="Mentoroid Logo"
              width={60}
              height={10}
              className="object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {!user && (
              <>
                <Link href="/features" className="text-white font-medium hover:text-white">Features</Link>
                <Link href="/solutions" className="text-white font-medium hover:text-white">Solutions</Link>
                <Link href="/pricing" className="text-white font-medium hover:text-white">Pricing</Link>
                <Link href="/about" className="text-white font-medium hover:text-white">About</Link>
              </>
            )}

            {/* Desktop Auth */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100 transition"
                >
                  <div className="w-10 h-10 bg-[color:var(--color-primary)] rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>

                  <span className="font-medium text-gray-700">
                    {user.name || user.email}
                  </span>

                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${dropdownOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0"
                      onClick={() => setDropdownOpen(false)}
                    />

                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50">
                      <div className="p-4 border-b border-gray-100">
                        <p className="text-sm text-gray-500">Signed in as</p>
                        <p className="font-semibold text-gray-900 truncate">
                          {user.email}
                        </p>
                      </div>

                      <div className="py-2">
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                        >
                          <User className="w-5 h-5 text-gray-600" />
                          <span>My Profile</span>
                        </Link>

                        <Link
                          href="/settings"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                        >
                          <Settings className="w-5 h-5 text-gray-600" />
                          <span>Settings</span>
                        </Link>

                        <hr className="my-2 border-gray-200" />

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 transition"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2.5 text-white font-medium hover:bg-white/20 rounded-xl transition"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="
                    px-6 py-2.5
                    bg-[color:var(--green-home-color)]
                    text-white font-bold rounded-xl shadow-lg
                    transition transform hover:scale-105
                  "
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {mobileMenu ? (
              <X className="w-7 h-7 text-white" />
            ) : (
              <Menu className="w-7 h-7 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md p-5 space-y-4 animate-slideDown">
          {!user && (
            <>
              <Link href="/features" onClick={() => setMobileMenu(false)} className="block text-gray-700 font-medium py-2">Features</Link>
              <Link href="/solutions" onClick={() => setMobileMenu(false)} className="block text-gray-700 font-medium py-2">Solutions</Link>
              <Link href="/pricing" onClick={() => setMobileMenu(false)} className="block text-gray-700 font-medium py-2">Pricing</Link>
              <Link href="/about" onClick={() => setMobileMenu(false)} className="block text-gray-700 font-medium py-2">About</Link>
            </>
          )}

          {user ? (
            <>
              <Link href="/profile" onClick={() => setMobileMenu(false)} className="flex items-center gap-3 py-2">
                <User className="w-5 h-5 text-gray-600" /> My Profile
              </Link>

              <Link href="/settings" onClick={() => setMobileMenu(false)} className="flex items-center gap-3 py-2">
                <Settings className="w-5 h-5 text-gray-600" /> Settings
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 py-2 w-full text-red-600"
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setMobileMenu(false)} className="block py-2 font-medium text-gray-700">
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setMobileMenu(false)}
                className="block py-2 font-bold text-white bg-[color:var(--color-primary)] text-center rounded-lg"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
