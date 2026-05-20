"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Brian Mwangi",
    role: "Small Business Owner",
    review:
      "MkopoHela helped me access quick financing for my business expansion. The process was smooth and very fast.",
  },
  {
    name: "Faith Achieng",
    role: "Freelancer",
    review:
      "I received my loan approval within minutes. The platform feels modern, secure, and easy to use.",
  },
  {
    name: "Kevin Otieno",
    role: "Entrepreneur",
    review:
      "The repayment options are flexible and transparent. MkopoHela has become my trusted lending platform.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative bg-slate-50 py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >

          <div className="mb-3 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs md:text-sm text-blue-600">
            Testimonials
          </div>

          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl">
            Trusted by Thousands
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
            Real feedback from people using MkopoHela daily
          </p>

        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white px-5 py-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:px-6"
            >

              {/* STARS */}
              <div className="mb-4 flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              {/* REVIEW */}
              <p className="mb-6 text-sm leading-relaxed text-slate-600 md:text-[15px]">
                "{t.review}"
              </p>

              {/* USER */}
              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-teal-500 text-sm font-bold text-white">
                  {t.name.charAt(0)}
                </div>

                <div className="min-w-0">
                  <h4 className="truncate text-sm font-bold text-slate-900">
                    {t.name}
                  </h4>

                  <p className="text-xs text-slate-500">
                    {t.role}
                  </p>
                </div>

              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}