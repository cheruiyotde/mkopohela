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
    <section className="relative py-12 bg-white">
      <div className="mx-auto max-w-3xl px-6">

        {/* HEADER (TIGHTENED) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <div className="mb-3 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs text-blue-600">
            FAQ
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-slate-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-base text-slate-600">
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
                className="rounded-2xl border border-slate-200 bg-white shadow-sm"
              >

                <button
                  onClick={() => setActive(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >

                  <span className="text-base font-semibold text-slate-900">
                    {faq.question}
                  </span>

                  <motion.div animate={{ rotate: isOpen ? 45 : 0 }}>
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
                      <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">
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