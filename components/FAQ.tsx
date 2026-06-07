"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "How much can I borrow?",
    answer:
      "Loan amounts vary depending on your application details and assessment. Eligible applicants may qualify for higher loan limits over time.",
  },
  {
    question: "How long does the application process take?",
    answer:
      "Applications are reviewed as quickly as possible. You will be notified once your application has been assessed.",
  },
  {
    question: "Why is there a Ksh 150 processing fee?",
    answer:
      "The processing fee helps cover application review, verification, and administrative costs associated with processing loan requests.",
  },
  {
    question: "How do I repay my loan?",
    answer:
      "Repayment details are provided upon approval. Multiple repayment options may be available depending on your loan arrangement.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Yes. We use modern security measures and data protection practices to safeguard your information.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-slate-50 py-16 md:py-8">
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
            Questions? We've Got Answers
          </div>

          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl">
            Everything you need to know about MkopoHela.
          </h2>

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