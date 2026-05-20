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
    <section id="loans" className="relative py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 md:mb-16 max-w-3xl text-center"
        >

          <div className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs md:text-sm text-blue-600">
            Loan Calculator
          </div>

          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl">
            Estimate Your Loan
          </h2>

          <p className="mt-4 md:mt-6 text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
            Calculate your estimated repayments instantly with our smart loan calculator.
          </p>

        </motion.div>

        {/* CALCULATOR */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="glass mx-auto grid max-w-5xl gap-8 md:gap-10 rounded-3xl border border-slate-200 bg-white/70 p-5 md:p-10 shadow-xl backdrop-blur-xl lg:grid-cols-2"
        >

          {/* LEFT */}
          <div className="space-y-8">

            {/* Amount */}
            <div>

              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                <label className="font-semibold text-slate-700">
                  Loan Amount
                </label>

                <span className="font-bold text-blue-600 break-words">
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

              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

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
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-teal-500 p-5 md:p-8 text-white shadow-2xl">

            <div className="mb-8">

              <p className="text-sm md:text-base text-white/70">
                Estimated Monthly Payment
              </p>

              <h3 className="mt-2 break-words text-3xl font-black sm:text-4xl md:text-5xl">
                KES {monthlyPayment.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </h3>

            </div>

            <div className="space-y-5">

              <div className="flex items-center justify-between border-b border-white/10 pb-4 gap-4">
                <span className="text-sm md:text-base text-white/70">
                  Loan Amount
                </span>

                <span className="text-right font-semibold break-words">
                  KES {amount.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-4 gap-4">
                <span className="text-sm md:text-base text-white/70">
                  Interest Rate
                </span>

                <span className="font-semibold">
                  12%
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-4 gap-4">
                <span className="text-sm md:text-base text-white/70">
                  Repayment Period
                </span>

                <span className="font-semibold">
                  {months} Months
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">

                <span className="text-base md:text-lg font-semibold">
                  Total Repayment
                </span>

                <span className="text-right text-xl md:text-2xl font-black break-words">
                  KES {totalRepayment.toLocaleString()}
                </span>

              </div>

            </div>

            <Link
              href="/apply"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-slate-100 md:w-auto"
            >
              Apply for this loan
            </Link>

          </div>

        </motion.div>
      </div>
    </section>
  );
}