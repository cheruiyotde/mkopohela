"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Clock3,
  Wallet,
  BadgeCheck,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Transactions",
    description:
      "Your personal and financial data is protected with enterprise-grade security.",
  },
  {
    icon: Clock3,
    title: "Instant Approval",
    description:
      "Get loan approvals within minutes with our smart automated system.",
  },
  {
    icon: Wallet,
    title: "Flexible Repayment",
    description:
      "Choose repayment plans that fit your financial lifestyle and goals.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Platform",
    description:
      "Thousands of customers rely on MkopoHela for quick digital loans.",
  },
];

export default function Features() {
  return (
    <section className="relative bg-white py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >

          <div className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs md:text-sm text-blue-600">
            Why Choose Us
          </div>

          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl">
            Smarter Digital Lending
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
            Experience a modern loan platform designed for speed,
            security, and convenience.
          </p>

        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 items-stretch">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white/70 px-5 py-6 shadow-sm backdrop-blur-xl transition hover:-translate-y-2 hover:shadow-xl md:px-6"
              >

                {/* ICON */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 text-white shadow-md">
                  <Icon size={24} />
                </div>

                {/* CONTENT */}
                <h3 className="mb-2 text-lg font-bold text-slate-900 md:text-xl">
                  {feature.title}
                </h3>

                <p className="text-sm leading-relaxed text-slate-600 md:text-[15px]">
                  {feature.description}
                </p>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}