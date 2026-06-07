"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // ✅ ADDED: mobile menu state
  const [menuOpen, setMenuOpen] = useState(false);

  const handleApply = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/mpesa/stk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: "254700000000",
          amount: 150,
        }),
      });

      await res.json();

      alert("Check your phone to complete payment");
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 mx-auto w-[92%] rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-xl shadow-lg"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* LOGO */}
        <Link href="/" className="text-2xl font-black">
          <span className="gradient-text">MkopoHela</span>
        </Link>

        {/* DESKTOP LINKS (UNCHANGED) */}
        <div className="hidden items-center gap-8 md:flex text-slate-700 font-medium">
          <Link href="#home" className="hover:text-blue-600 transition">Home</Link>
          <Link href="#loans" className="hover:text-blue-600 transition">Loans</Link>
          <Link href="#about" className="hover:text-blue-600 transition">About</Link>
          <Link href="#contact" className="hover:text-blue-600 transition">Contact</Link>
          <Link href="#faq" className="hover:text-blue-600 transition">FAQs</Link>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">

          {/* LOGIN */}
          <Link
            href="/login"
            className="hidden md:block rounded-full border border-slate-200 px-5 py-2 text-slate-700 hover:bg-slate-50 transition"
          >
            Login
          </Link>

          {/* MOBILE MENU BUTTON (ADDED) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-slate-700"
          >
            ☰
          </button>

          {/* APPLY BUTTON (UNCHANGED) */}
          <Link
            href="/apply"
            className="rounded-full bg-blue-600 px-5 py-2 font-medium text-white shadow-md hover:bg-blue-700 transition"
          >
            Apply Now
          </Link>
        </div>
      </div>

      {/* MOBILE MENU (ADDED ONLY — NO STRUCTURE REMOVED) */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-6 pt-4 border-t border-slate-200 bg-white/90">

          <Link href="#home" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="#loans" onClick={() => setMenuOpen(false)}>Loans</Link>
          <Link href="#about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="#contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link href="#faq" onClick={() => setMenuOpen(false)}>FAQs</Link>


          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-full border border-slate-200 px-5 py-2 text-center"
          >
            Login
          </Link>

          <Link
            href="/apply"
            onClick={() => setMenuOpen(false)}
            className="rounded-full bg-blue-600 px-5 py-2 text-white text-center"
          >
            Apply Now
          </Link>

        </div>
      )}
    </motion.nav>
  );
}