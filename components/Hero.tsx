"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function Hero() {
  const [loading, setLoading] = useState(false);

  const handleApplyAndPay = async () => {
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

      const data = await res.json();
      console.log("STK RESPONSE:", data);

      alert("Check your phone to complete payment");
    } catch (error) {
      console.error(error);
      alert("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-4 md:pt-0"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 md:px-6 lg:grid-cols-2">

        {/* LEFT */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-6 md:space-y-8"
        >

          <motion.div
            variants={fadeUp}
            className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs md:text-sm text-blue-600"
          >
            🚀 Trusted Digital Lending Platform
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl font-black leading-tight text-slate-900 sm:text-5xl md:text-7xl"
          >
            Fast &
            <span className="gradient-text block">
              Secure Loans
            </span>
            For Everyone
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-base md:text-lg text-slate-600"
          >
            Apply online within minutes and receive instant digital loan approvals with flexible repayment plans.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-4 sm:flex-row sm:flex-wrap"
          >

            <Link
              href="/apply"
              className="w-full sm:w-auto text-center rounded-full bg-blue-600 px-8 py-4 font-semibold text-white shadow-md hover:bg-blue-700 transition"
            >
              Apply Now
            </Link>

            <a
              href="#loans"
              className="w-full sm:w-auto text-center glass rounded-full px-8 py-4 font-semibold text-slate-700 hover:bg-white transition"
            >
              Loan Calculator
            </a>

          </motion.div>

          {/* STATS (FIXED ONLY HERE) */}
          <motion.div
            variants={fadeUp}
            className="flex flex-row justify-between gap-4 pt-4 sm:grid sm:grid-cols-3 sm:gap-10"
          >

            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                50K+
              </h3>
              <p className="text-slate-500">Customers</p>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                KES 500M+
              </h3>
              <p className="text-slate-500">Loans Issued</p>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                24/7
              </h3>
              <p className="text-slate-500">Support</p>
            </div>

          </motion.div>

        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative mt-6 lg:mt-0"
        >

          <div className="glass relative rounded-3xl p-5 md:p-8 shadow-xl">

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-slate-500 text-sm md:text-base">
                  Available Balance
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 break-words">
                  KES 250,000
                </h2>
              </div>

              <div className="w-fit rounded-full bg-green-100 px-4 py-2 text-green-600">
                Approved
              </div>

            </div>

            <div className="space-y-4">

              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">

                <div className="mb-2 flex justify-between text-sm md:text-base text-slate-700">
                  <span>Personal Loan</span>
                  <span>KES 80,000</span>
                </div>

                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 w-[75%] rounded-full bg-blue-500"></div>
                </div>

              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">

                <div className="mb-2 flex justify-between text-sm md:text-base text-slate-700">
                  <span>Business Loan</span>
                  <span>KES 120,000</span>
                </div>

                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 w-[55%] rounded-full bg-cyan-400"></div>
                </div>

              </div>

            </div>

          </div>

          <div className="absolute -right-10 -top-10 h-48 w-48 md:h-72 md:w-72 rounded-full bg-blue-200/40 blur-3xl"></div>

        </motion.div>

      </div>
    </section>
  );
}