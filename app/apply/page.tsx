"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ApplyPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [transactionMessage, setTransactionMessage] = useState("");

  // ✅ FIX: PHONE STATE ADDED
  const [phone, setPhone] = useState("");

  // ---------------- FORM ----------------
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const name = form.get("name")?.toString().trim();
    const email = form.get("email")?.toString().trim();
    const amount = form.get("amount")?.toString().trim();

    if (!name || !phone || !email || !amount) {
      alert("Please fill in all required fields.");
      return;
    }

    setFormData({
      name,
      phone,
      email,
      amount,
      employment: form.get("employment"),
      income: form.get("income"),
    });

    setShowModal(true);
  };

  // ---------------- VERIFY PAYMENT ----------------
  const handleVerifyPayment = async () => {
    if (loading) return;

    if (!transactionMessage.trim()) {
      alert("Please paste M-Pesa confirmation message");
      return;
    }

    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      // 🧠 EXTRACT MPESA CODE (FIRST WORD)
      const cleanCode = transactionMessage
        .trim()
        .split(" ")[0]
        .toUpperCase();

      if (!cleanCode) {
        alert("Invalid M-Pesa message");
        return;
      }

      // 🔥 CHECK DUPLICATE
      const { data: existing } = await supabase
        .from("loans")
        .select("id")
        .eq("transaction_code", cleanCode)
        .maybeSingle();

      if (existing) {
        alert("This transaction code already exists");
        return;
      }

      // 🔥 INSERT LOAN
      const { error } = await supabase.from("loans").insert([
        {
          user_id: user.id,
          name: formData.name,
          phone: phone, // ✅ CLEAN PHONE SAVED
          email: formData.email,
          amount: formData.amount,
          employment: formData.employment,
          income: formData.income,
          transaction_code: cleanCode,
          status: "PAID",
        },
      ]);

      if (error) {
        console.log(error);
        alert(error.message);
        return;
      }

      alert("Application submitted successfully 🎉");

      setShowModal(false);
      setTransactionMessage("");

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-20">

      <div className="mx-auto max-w-5xl px-6">

        {/* HEADER */}
        <motion.div className="text-center mb-12">
          <h1 className="text-5xl font-black text-blue-600">
            Loan Application
          </h1>
          <p className="mt-4 text-slate-600">
            Fill in your details to get instant approval review
          </p>
        </motion.div>

        {/* FORM (UNCHANGED UI) */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-3xl p-10 space-y-10"
        >

          <div>
            <h2 className="text-lg font-bold mb-5">👤 Personal Information</h2>

            <div className="grid md:grid-cols-2 gap-6">

              <input
                name="name"
                placeholder="Full Name"
                className="input"
              />

              {/* ✅ FIXED PHONE INPUT */}
              <input
                name="phone"
                placeholder="07XXXXXXXX"
                className="input"
                type="text"
                inputMode="numeric"
                value={phone}
                onChange={(e) => {
                  let value = e.target.value.replace(/[^0-9]/g, "");
                  if (value.length > 10) value = value.slice(0, 10);
                  setPhone(value);
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  const pasted = e.clipboardData.getData("text");
                  const cleaned = pasted.replace(/[^0-9]/g, "").slice(0, 10);
                  setPhone(cleaned);
                }}
              />

              <input
                name="email"
                placeholder="Email Address"
                className="input md:col-span-2"
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-5">💰 Loan Details</h2>

            <div className="grid md:grid-cols-2 gap-6">

              <input
                name="amount"
                placeholder="Loan Amount (KES)"
                className="input"
              />

              <select name="employment" className="input">
                <option value="">Employment Status</option>
                <option>Employed</option>
                <option>Self Employed</option>
                <option>Business Owner</option>
                <option>Freelancer</option>
              </select>

            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-5">📊 Financial Info</h2>

            <input
              name="income"
              placeholder="Monthly Income (KES)"
              className="input w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg shadow-lg hover:scale-[1.01] transition"
          >
            Submit Application
          </button>

        </motion.form>
      </div>

      {/* MODAL (UNCHANGED UI) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">

          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

            <h2 className="text-2xl font-bold mb-3">
              Almost Done 🎉
            </h2>

            <p className="mb-6 text-slate-600">
              Complete payment to continue your application.
            </p>

            <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">

              <div className="flex justify-between mb-3">
                <span className="text-slate-500">Processing Fee</span>
                <span className="font-bold">KES 150</span>
              </div>

              <div className="flex justify-between mb-3">
                <span className="text-slate-500">Till Number</span>
                <span className="font-bold text-blue-600">4987508</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Business</span>
                <span className="font-semibold">Waylinks Ventures</span>
              </div>

            </div>

            <textarea
              value={transactionMessage}
              onChange={(e) => setTransactionMessage(e.target.value)}
              placeholder="Paste full M-Pesa message here..."
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 mb-6 h-32"
            />

            <div className="flex gap-3">

              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border rounded-xl py-3"
              >
                Cancel
              </button>

              <button
                onClick={handleVerifyPayment}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white rounded-xl py-3"
              >
                {loading ? "Verifying..." : "Submit"}
              </button>

            </div>

          </div>
        </div>
      )}

      {/* STYLES (UNCHANGED) */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 14px;
          border: 1px solid #e2e8f0;
          background: white;
          outline: none;
        }

        .input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
        }
      `}</style>

    </section>
  );
}