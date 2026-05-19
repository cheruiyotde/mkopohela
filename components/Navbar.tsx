"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

        {/* LINKS */}
        <div className="hidden items-center gap-8 md:flex text-slate-700 font-medium">

          <Link href="#home" className="hover:text-blue-600 transition">Home</Link>
          <Link href="#loans" className="hover:text-blue-600 transition">Loans</Link>
          <Link href="#about" className="hover:text-blue-600 transition">About</Link>
          <Link href="#contact" className="hover:text-blue-600 transition">Contact</Link>

        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">

          {/* LOGIN (future auth) */}
          <Link
            href="/login"
            className="hidden md:block rounded-full border border-slate-200 px-5 py-2 text-slate-700 hover:bg-slate-50 transition"
          >
            Login
          </Link>

          {/* APPLY (NOW CONNECTED TO MPESA) */}
          <Link
  href="/apply"
  className="rounded-full bg-blue-600 px-5 py-2 font-medium text-white shadow-md hover:bg-blue-700 transition"
>
  Apply Now
</Link>

        </div>

      </div>
    </motion.nav>
  );
}