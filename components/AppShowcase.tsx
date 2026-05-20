"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Wallet,
  Bell,
  ShieldCheck,
} from "lucide-react";

export default function AppShowcase() {
  return (
    <section
      id="app"
      className="relative overflow-hidden py-14 md:py-20"
    >

      {/* BACKGROUND GLOW */}
      <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/40 blur-3xl md:h-[500px] md:w-[500px]"></div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >

          <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs md:text-sm text-blue-600">
            Mobile Experience
          </div>

          <h2 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
            Manage Your Loans
            <span className="gradient-text block">
              Anytime, Anywhere
            </span>
          </h2>

          <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
            Access loans, track repayments, receive instant notifications,
            and manage your finances directly from your smartphone.
          </p>

          {/* FEATURES */}
          <div className="space-y-5">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <Wallet size={24} />
              </div>

              <div>
                <h4 className="font-bold text-slate-900">
                  Smart Loan Tracking
                </h4>

                <p className="text-sm text-slate-600 md:text-base">
                  Monitor balances and repayment schedules in real time.
                </p>
              </div>

            </div>

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-100 text-teal-600">
                <Bell size={24} />
              </div>

              <div>
                <h4 className="font-bold text-slate-900">
                  Instant Notifications
                </h4>

                <p className="text-sm text-slate-600 md:text-base">
                  Receive repayment reminders and approval alerts instantly.
                </p>
              </div>

            </div>

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600">
                <ShieldCheck size={24} />
              </div>

              <div>
                <h4 className="font-bold text-slate-900">
                  Secure Digital Banking
                </h4>

                <p className="text-sm text-slate-600 md:text-base">
                  Enterprise-grade protection for all your transactions.
                </p>
              </div>

            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:flex-wrap">

            <a
              href="https://play.google.com/store"
              target="_blank"
              className="flex items-center justify-center rounded-xl bg-black px-6 py-3 text-center font-semibold text-white transition hover:bg-slate-800"
            >
              Download App
            </a>

            <a
              href="#about"
              className="flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 text-center font-semibold text-slate-700 transition hover:bg-white"
            >
              Learn More
            </a>

          </div>

        </motion.div>

        {/* RIGHT PHONE MOCKUP */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative flex justify-center"
        >

          {/* PHONE */}
          <div className="relative h-[560px] w-[280px] rounded-[3rem] border-[10px] border-slate-900 bg-white shadow-2xl sm:h-[620px] sm:w-[310px] md:h-[650px] md:w-[320px]">

            {/* TOP BAR */}
            <div className="absolute left-1/2 top-3 h-6 w-32 -translate-x-1/2 rounded-full bg-slate-900"></div>

            {/* SCREEN */}
            <div className="flex h-full flex-col rounded-[2.5rem] bg-gradient-to-b from-blue-50 to-white p-5 md:p-6">

              {/* HEADER */}
              <div className="mt-10 flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Welcome Back
                  </p>

                  <h3 className="text-xl font-bold text-slate-900 md:text-2xl">
                    David
                  </h3>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-teal-500 font-bold text-white md:h-12 md:w-12">
                  D
                </div>

              </div>

              {/* BALANCE CARD */}
              <div className="mt-8 rounded-3xl bg-gradient-to-br from-blue-600 to-teal-500 p-5 text-white shadow-xl md:p-6">

                <p className="text-sm text-white/70">
                  Available Balance
                </p>

                <h2 className="mt-3 text-3xl font-black md:text-4xl">
                  KES 250K
                </h2>

                <div className="mt-6 flex items-center justify-between gap-3">

                  <span className="rounded-full bg-white/20 px-3 py-2 text-xs md:px-4 md:text-sm">
                    Approved
                  </span>

                  <span className="text-sm font-semibold md:text-base">
                    Active Loan
                  </span>

                </div>

              </div>

              {/* MINI CARDS */}
              <div className="mt-8 space-y-4">

                <div className="rounded-2xl bg-white p-4 shadow-sm md:p-5">

                  <div className="mb-2 flex items-center justify-between gap-3">

                    <span className="text-sm text-slate-500">
                      Monthly Repayment
                    </span>

                    <span className="text-sm font-bold text-slate-900 md:text-base">
                      KES 12,000
                    </span>

                  </div>

                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-[70%] rounded-full bg-blue-500"></div>
                  </div>

                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm md:p-5">

                  <div className="flex items-center justify-between gap-4">

                    <div>
                      <p className="text-sm text-slate-500">
                        Next Payment
                      </p>

                      <h4 className="mt-1 text-sm font-bold text-slate-900 md:text-base">
                        24 May 2026
                      </h4>
                    </div>

                    <div className="rounded-full bg-green-100 px-3 py-2 text-xs text-green-600 md:px-4 md:text-sm">
                      Paid
                    </div>

                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* FLOATING CARD */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute -left-2 top-10 rounded-2xl bg-white p-4 shadow-xl sm:-left-6 md:-left-10 md:top-20 md:p-5"
          >

            <p className="text-xs text-slate-500 md:text-sm">
              Loan Approved
            </p>

            <h4 className="mt-2 text-xl font-black text-slate-900 md:text-2xl">
              KES 80K
            </h4>

          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}