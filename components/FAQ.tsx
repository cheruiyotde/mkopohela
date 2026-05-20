"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "How fast are loan approvals?",
    answer:
      "Most applications are reviewed and approved within minutes using our automated lending system.",
  },
  {
    question: "What documents are required?",
    answer:
      "You only need basic identification and a few financial details to complete your application.",
  },
  {
    question: "How do repayments work?",
    answer:
      "Repayments can be made through mobile money, bank transfer, or automatic scheduled payments.",
  },
  {
    question: "Is my information secure?",
    answer:
      "Yes. We use enterprise-grade encryption and security systems to protect all user data and transactions.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="relative bg-white py-14 md:py-20">
      <div className="mx-auto max-w-3xl px-4 md:px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >

          <div className="mb-3 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs md:text-sm text-blue-600">
            FAQ
          </div>

          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
            Everything you need to know about MkopoHela
          </p>

        </motion.div>

        {/* FAQ ITEMS */}
        <div className="space-y-4">

          {faqs.map((faq, index) => {
            const isOpen = active === index;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >

                <button
                  onClick={() => setActive(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left md:px-5"
                >

                  <span className="pr-2 text-sm font-semibold leading-relaxed text-slate-900 sm:text-base">
                    {faq.question}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className="shrink-0"
                  >
                    <Plus className="text-blue-600" size={18} />
                  </motion.div>

                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >

                      <div className="px-4 pb-4 text-sm leading-relaxed text-slate-600 md:px-5 md:text-[15px]">
                        {faq.answer}
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}