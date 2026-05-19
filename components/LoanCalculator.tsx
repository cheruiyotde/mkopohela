"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoanCalculator() {
  const [amount, setAmount] = useState(50000);
  const [months, setMonths] = useState(6);

  const interestRate = 0.12;

  const totalRepayment =
    amount + amount * interestRate;

  const monthlyPayment =
    totalRepayment / months;

  return (
    <section id="loans" className="relative py-14">
      <div className="mx-auto max-w-7xl px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-600">
            Loan Calculator
          </div>

          <h2 className="text-4xl font-black text-slate-900 md:text-5xl">
            Estimate Your Loan
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Calculate your estimated repayments instantly with our smart loan calculator.
          </p>
        </motion.div>

        {/* CALCULATOR */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="glass mx-auto grid max-w-5xl gap-10 rounded-3xl border border-slate-200 bg-white/70 p-10 shadow-xl backdrop-blur-xl lg:grid-cols-2"
        >

          {/* LEFT */}
          <div className="space-y-8">

            {/* Amount */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="font-semibold text-slate-700">
                  Loan Amount
                </label>

                <span className="font-bold text-blue-600">
                  KES {amount.toLocaleString()}
                </span>
              </div>

              <input
                type="range"
                min="5000"
                max="500000"
                step="5000"
                value={amount}
                onChange={(e) =>
                  setAmount(Number(e.target.value))
                }
                className="w-full accent-blue-600"
              />
            </div>

            {/* Months */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="font-semibold text-slate-700">
                  Repayment Period
                </label>

                <span className="font-bold text-blue-600">
                  {months} Months
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="24"
                value={months}
                onChange={(e) =>
                  setMonths(Number(e.target.value))
                }
                className="w-full accent-teal-500"
              />
            </div>

          </div>

          {/* RIGHT */}
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-teal-500 p-8 text-white shadow-2xl">

            <div className="mb-8">
              <p className="text-white/70">
                Estimated Monthly Payment
              </p>

              <h3 className="mt-2 text-5xl font-black">
                KES {monthlyPayment.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </h3>
            </div>

            <div className="space-y-5">

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-white/70">
                  Loan Amount
                </span>

                <span className="font-semibold">
                  KES {amount.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-white/70">
                  Interest Rate
                </span>

                <span className="font-semibold">
                  12%
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-white/70">
                  Repayment Period
                </span>

                <span className="font-semibold">
                  {months} Months
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-lg font-semibold">
                  Total Repayment
                </span>

                <span className="text-2xl font-black">
                  KES {totalRepayment.toLocaleString()}
                </span>
              </div>

            </div>

         
        <Link
  href="/apply"
  className="mt-4 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition"
>
  Apply for this loan
</Link>

          </div>

        </motion.div>
      </div>
    </section>
  );
}