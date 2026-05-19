"use client";

import Link from "next/link";
import { Star } from "lucide-react";

export default function Footer() {
  return (
    <footer  id="contact" className="relative border-t border-slate-200 bg-white/70 backdrop-blur-xl">

      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div>
            <h2 className="gradient-text text-3xl font-black">
              MkopoHela
            </h2>

            <p className="mt-6 leading-relaxed text-slate-600">
              Modern digital lending platform providing fast,
              secure, and flexible loan solutions.
            </p>

            {/* SOCIALS */}
            <div className="mt-8 flex gap-4">

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <Star size={20} />
              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <Star size={20} />
              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:-translate-y-1 hover:shadow-lg"
              >
               <Star size={20} />
              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <Star size={20} />
              </a>

            </div>
          </div>

          {/* COMPANY */}
<div>
  <h3 className="text-lg font-bold text-slate-900">
    Company
  </h3>

  <div className="mt-6 space-y-4 text-slate-600">

    <Link href="#about" className="block hover:text-blue-600">
      About Us
    </Link>

    <Link href="#" className="block hover:text-blue-600">
      Careers
    </Link>

    <Link href="#" className="block hover:text-blue-600">
      Blog
    </Link>

 


              {/* CONTACT US */}
<div>
  <h3 className="text-lg font-bold text-slate-900">
    Contact Us
  </h3>

  {/* CONTACT DETAILS */}
  <div className="mt-6 space-y-3 text-slate-600">

    <div className="flex items-center gap-2">
      <span>📍</span>
      <div className="flex flex-col">
  <span>Ayden Plaza, 3rd Floor, Wing B</span>
  <span>Nairobi, Kenya</span>
</div>
    </div>

    <div className="flex items-center gap-2">
      <span>📞</span>
      <span>+254 716594310</span>
    </div>

    <div className="flex items-center gap-2">
      <span>✉️</span>
      <span>support@mkopohela.co.ke</span>
    </div>

    <div className="flex items-center gap-2">
      <span>🕒</span>
      <span>24/7 Customer Support</span>
    </div>

  </div>

  {/* ACTION BUTTONS */}
  <div className="mt-6 flex flex-col gap-3">

    <a
      href="https://wa.me/254700000000"
      className="rounded-2xl bg-green-500 px-4 py-3 text-center font-semibold text-white transition hover:bg-green-600"
    >
      WhatsApp Us
    </a>

    <a
      href="tel:+254700000000"
      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-50"
    >
      Call Support
    </a>

  </div>
</div>

            </div>
          </div>

          {/* SERVICES */}
<div>
  <h3 className="text-lg font-bold text-slate-900">
    Services
  </h3>

  <div className="mt-6 space-y-4 text-slate-600">

    <Link href="#loans" className="block hover:text-blue-600">
      Personal Loans
    </Link>

    <Link href="#loans" className="block hover:text-blue-600">
      Business Loans
    </Link>

    <Link href="#loans" className="block hover:text-blue-600">
      Loan Calculator
    </Link>

    <Link href="#app" className="block hover:text-blue-600">
      Mobile App
    </Link>

  </div>
</div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Stay Updated
            </h3>

            <p className="mt-6 text-slate-600">
              Subscribe to receive updates and financial tips.
            </p>

            <div className="mt-6 flex overflow-hidden rounded-2xl border border-slate-200 bg-white">

              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-4 outline-none"
              />

              <button className="bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700">
                Join
              </button>

            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-8 flex flex-col items-center justify-between gap-6 border-t border-slate-200 pt-8 text-sm text-slate-500 md:flex-row">

          <p>
            © 2026 MkopoHela. All rights reserved.
          </p>

          <div className="flex gap-6">

            <Link href="/privacy-policy" className="hover:text-blue-600">
                    Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-blue-600">
            Terms of Service
            </Link>

          </div>

        </div>
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="rounded-full bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
        Back to Top
    </button>
    </footer>

  );
}