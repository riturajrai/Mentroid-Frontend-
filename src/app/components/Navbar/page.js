"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../providers/AuthProvider";
import { LogOut, User, Settings, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import api from "@/app/lib/api";
import { Button } from "@/components/ui/button"; // <-- Use UI Button
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
    <nav className="bg-[var(--color-primary)] border-b border-gray-200 shadow-md sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-2xl shadow-lg flex items-center justify-center">
              <Image src={logo} alt="Mentoroid Logo" width={30} height={30} className="object-contain" />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {!user && (
              <>
                <Link href="/features" className="text-white font-medium hover:text-white/80">Features</Link>
                <Link href="/solutions" className="text-white font-medium hover:text-white/80">Solutions</Link>
                <Link href="/pricing" className="text-white font-medium hover:text-white/80">Pricing</Link>
                <Link href="/about" className="text-white font-medium hover:text-white/80">About</Link>
              </>
            )}

            {/* Desktop Auth */}
            {user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 px-4 py-2 rounded-xl"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className="w-10 h-10 bg-white text-[var(--color-primary)] rounded-full flex items-center justify-center font-semibold shadow-md">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="font-medium text-white">{user.name || user.email}</span>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </Button>

                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0" onClick={() => setDropdownOpen(false)} />

                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50">
                      <div className="p-4 border-b border-gray-100">
                        <p className="text-sm text-gray-500">Signed in as</p>
                        <p className="font-semibold text-gray-900 truncate">{user.email}</p>
                      </div>

                      <div className="py-2 flex flex-col">
                        <Link href="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition">
                          <User className="w-5 h-5 text-gray-600" /> My Profile
                        </Link>

                        <Link href="/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition">
                          <Settings className="w-5 h-5 text-gray-600" /> Settings
                        </Link>

                        <hr className="my-2 border-gray-200" />

                        <Button
                          variant="outline"
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
                          onClick={handleLogout}
                        >
                          <LogOut className="w-5 h-5" /> Logout
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-white px-5 py-2.5">Login</Button>
                </Link>

                <Link href="/register">
                  <Button className="bg-[var(--green-home-color)] text-white font-bold px-6 py-2.5 rounded-xl shadow-lg hover:scale-105 transition-transform">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden p-2 rounded-lg hover:bg-white/20 transition"
          >
            {mobileMenu ? <X className="w-7 h-7 text-white" /> : <Menu className="w-7 h-7 text-white" />}
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

              <Button variant="outline" className="flex items-center gap-3 w-full text-red-600" onClick={handleLogout}>
                <LogOut className="w-5 h-5" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setMobileMenu(false)}>
                <Button variant="ghost" className="w-full text-gray-700">Login</Button>
              </Link>

              <Link href="/register" onClick={() => setMobileMenu(false)}>
                <Button className="w-full bg-[var(--color-primary)] text-white font-bold">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
