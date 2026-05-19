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
          phone: "254700000000", // later replace with input field
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
    <section id="home" className="relative overflow-hidden pt-0">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-8 lg:grid-cols-2">

        {/* LEFT */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-600"
          >
            🚀 Trusted Digital Lending Platform
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl font-black leading-tight md:text-7xl text-slate-900"
          >
            Fast &
            <span className="gradient-text block">
              Secure Loans
            </span>
            For Everyone
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-lg text-slate-600"
          >
            Apply online within minutes and receive instant digital loan approvals with flexible repayment plans.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-4"
          >
          
            <Link
  href="/apply"
  className="rounded-full bg-blue-600 px-8 py-4 font-semibold text-white shadow-md hover:bg-blue-700 transition"
>
  Apply Now
</Link>

            <a
              href="#loans"
              className="glass rounded-full px-8 py-4 font-semibold text-slate-700 hover:bg-white transition"
            >
              Loan Calculator
            </a>
          </motion.div>

          {/* STATS */}
          <motion.div
            variants={fadeUp}
            className="flex gap-10 pt-6"
          >
            <div>
              <h3 className="text-3xl font-bold text-slate-900">50K+</h3>
              <p className="text-slate-500">Customers</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-slate-900">KES 500M+</h3>
              <p className="text-slate-500">Loans Issued</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-slate-900">24/7</h3>
              <p className="text-slate-500">Support</p>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="glass relative rounded-3xl p-8 shadow-xl">

            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-slate-500">Available Balance</p>
                <h2 className="text-4xl font-bold text-slate-900">
                  KES 250,000
                </h2>
              </div>

              <div className="rounded-full bg-green-100 px-4 py-2 text-green-600">
                Approved
              </div>
            </div>

            <div className="space-y-4">

              <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
                <div className="mb-2 flex justify-between text-slate-700">
                  <span>Personal Loan</span>
                  <span>KES 80,000</span>
                </div>

                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 w-[75%] rounded-full bg-blue-500"></div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
                <div className="mb-2 flex justify-between text-slate-700">
                  <span>Business Loan</span>
                  <span>KES 120,000</span>
                </div>

                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 w-[55%] rounded-full bg-cyan-400"></div>
                </div>
              </div>

            </div>
          </div>

          <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl"></div>
        </motion.div>

      </div>
    </section>
  );
}