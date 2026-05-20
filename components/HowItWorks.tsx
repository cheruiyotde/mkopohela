"use client";

import { motion } from "framer-motion";
import {
  FileText,
  BadgeCheck,
  WalletCards,
} from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Apply Online",
    description:
      "Complete your loan application in just a few minutes using our secure platform.",
  },
  {
    icon: BadgeCheck,
    title: "Get Approved",
    description:
      "Our system instantly reviews and verifies your application.",
  },
  {
    icon: WalletCards,
    title: "Receive Funds",
    description:
      "Get funds directly to your mobile wallet or bank account quickly.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="about"
      className="relative bg-white py-4 md:py-6"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >

          <div className="mb-3 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs md:text-sm text-blue-600">
            Simple Process
          </div>

          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl">
            How MkopoHela Works
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
            Apply for a loan in minutes with a seamless digital process.
          </p>

        </motion.div>

        {/* STEPS */}
        <div className="relative grid gap-6 lg:grid-cols-3">

          {/* LINE */}
          <div className="absolute left-1/2 top-16 hidden h-1 w-[65%] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 lg:block"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="relative h-full rounded-2xl border border-slate-200 bg-white px-5 py-6 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-md md:px-6"
              >

                {/* STEP NUMBER */}
                <div className="absolute -top-4 left-5 md:left-6 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-teal-500 text-sm font-bold text-white shadow-md">
                  {index + 1}
                </div>

                {/* ICON */}
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 text-white shadow-md">
                  <Icon size={24} />
                </div>

                {/* CONTENT */}
                <h3 className="mb-2 text-lg md:text-xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="text-sm leading-relaxed text-slate-600 md:text-[15px]">
                  {step.description}
                </p>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}