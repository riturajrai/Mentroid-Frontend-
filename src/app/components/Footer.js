// src/components/Footer.jsx
"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { name: "Features", href: "/#features" },
      { name: "How It Works", href: "/#how-it-works" },
      { name: "Pricing", href: "/pricing" },
      { name: "For Schools", href: "/schools" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Refund Policy", href: "/refund" },
    ],
  };

  return (
    <footer className="bg-[var(--color-primary)] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* BRAND */}
          <div className="space-y-5">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-white">Mentoroid</span>AI
            </h2>

            <p className="text-white/90 text-sm leading-relaxed max-w-xs">
              India&apos;s first bilingual AI mentor that adapts to your child —
              learn in English or Hindi with personalised micro-learning.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Social Link"
                >
                  <Icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* PRODUCT LINKS */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              {links.product.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/90 hover:text-white flex items-center gap-1 group transition"
                  >
                    {item.name}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all text-white" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY LINKS */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {links.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/90 hover:text-white flex items-center gap-1 group transition"
                  >
                    {item.name}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all text-white" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT + LEGAL */}
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-white text-lg mb-4">Get in Touch</h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-white" />
                  <span className="text-white/90">support@mentoroidai.com</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-white" />
                  <span className="text-white/90">+91-9876543210</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-white" />
                  <span className="text-white/90">Bengaluru, India</span>
                </div>
              </div>
            </div>

            {/* LEGAL */}
            <div>
              <h4 className="font-medium text-white text-sm mb-3">Legal</h4>
              <div className="flex flex-wrap gap-4 text-xs text-white/80">
                {links.legal.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="hover:text-white transition"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/70">
          <p>&copy; {currentYear} MentoroidAI. All rights reserved.</p>

          <p className="mt-4 md:mt-0">
            Made with <span className="text-red-400">❤</span> for Indian Students
          </p>
        </div>
      </div>
    </footer>
  );
}
