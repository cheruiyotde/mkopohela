"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ApplyPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [transactionMessage, setTransactionMessage] = useState("");

  // PHONE
  const [phone, setPhone] = useState("");

  // LOAN PURPOSE
  const [purpose, setPurpose] = useState("personal");

  // REPAYMENT PERIOD
  const [repaymentPeriod, setRepaymentPeriod] = useState(12);

  // LOAN AMOUNT
  const [loanAmount, setLoanAmount] = useState(0);

  // ---------------- CALCULATIONS ----------------
  const calculated = useMemo(() => {
  const amount = Number(loanAmount || 0);
  const months = Number(repaymentPeriod || 1);

  const rate = 12;

  const interestRaw = (amount * rate * (months / 12)) / 100;
  const totalRaw = amount + interestRaw;
  const monthlyRaw = months > 0 ? totalRaw / months : 0;

  return {
    rate,
    interest: Number(interestRaw.toFixed(2)),
    total: Number(totalRaw.toFixed(2)),
    monthly: Number(monthlyRaw.toFixed(2)),
  };
}, [loanAmount, repaymentPeriod]);

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
      purpose,
      repaymentPeriod,
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

    // ---------------- NORMALIZE MESSAGE ----------------
    const normalized = transactionMessage.toUpperCase().trim();

    // ---------------- 1. VERIFY BUSINESS NAME ----------------
    if (!normalized.includes("WAYLINKS VENTURES")) {
      alert("Payment Verification Failed");
      return;
    }

    // ---------------- 2. VERIFY "PAID TO" ----------------
    const paidToMatch = normalized.match(/PAID TO[:\s]+([A-Z0-9 &]+)/i);
    const paidTo = paidToMatch ? paidToMatch[1].trim() : "";

    if (!paidTo.includes("WAYLINKS VENTURES")) {
      alert("Invalid payment");
      return;
    }

    // ---------------- 3. VERIFY AMOUNT (>= 120) ----------------
    const amountMatch = normalized.match(/KSH\s*([\d,]+(\.\d+)?)/i);

    const paidAmount = amountMatch
      ? Number(amountMatch[1].replace(/,/g, ""))
      : 0;

    if (paidAmount < 120) {
      alert("Minimum processing fee is Ksh 120.");
      return;
    }

    // ---------------- 4. EXTRACT MPESA CODE SAFELY ----------------
    const codeMatch = normalized.match(/[A-Z0-9]{10}/);
    const cleanCode = codeMatch ? codeMatch[0] : null;

    if (!cleanCode) {
      alert("Invalid M-Pesa transaction code.");
      return;
    }

    // ---------------- 5. CHECK DUPLICATE ----------------
    const { data: existing } = await supabase
      .from("loans")
      .select("id")
      .eq("transaction_code", cleanCode)
      .maybeSingle();

    if (existing) {
      alert("Transaction code already exists.");
      return;
    }

    // ---------------- 6. INSERT LOAN ----------------
    const { error } = await supabase.from("loans").insert([
      {
        user_id: user.id,
        name: formData.name,
        phone: phone,
        email: formData.email,
        amount: formData.amount,
        employment: formData.employment,
        income: formData.income,

        purpose: formData.purpose,
        repayment_period: formData.repaymentPeriod,

        interest_rate: calculated.rate,
        interest_amount: calculated.interest,
        total_repayment: calculated.total,
        monthly_payment: calculated.monthly,

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
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-8 md:py-12">
      <div className="mx-auto max-w-5xl px-6">

        {/* HEADER */}
        <motion.div className="text-center mb-12">

          <h1 className="text-5xl font-black text-blue-600">
  Apply For A Loan
</h1>

<p className="mt-4 text-slate-600 max-w-2xl mx-auto">
  Complete your application online and receive feedback after review.
</p>

          <div className="mt-8 mb-10 grid gap-5 md:grid-cols-3 max-w-4xl mx-auto">

  <div className="group rounded-3xl bg-white p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
      📝
    </div>

    <div className="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
      Step 1
    </div>

    <h3 className="text-lg font-bold text-slate-900 mb-2">
      Apply Online
    </h3>

    <p className="text-sm text-slate-600 leading-relaxed">
      Fill in your details and choose the loan amount that suits your needs.
    </p>

  </div>

  <div className="group rounded-3xl bg-white p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
      🔍
    </div>

    <div className="mb-3 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
      Step 2
    </div>

    <h3 className="text-lg font-bold text-slate-900 mb-2">
      Application Review
    </h3>

    <p className="text-sm text-slate-600 leading-relaxed">
      We verify your application and assess eligibility for financing.
    </p>

  </div>

  <div className="group rounded-3xl bg-white p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-2xl">
      📞
    </div>

    <div className="mb-3 inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
      Step 3
    </div>

    <h3 className="text-lg font-bold text-slate-900 mb-2">
      Receive Feedback
    </h3>

    <p className="text-sm text-slate-600 leading-relaxed">
      You'll be contacted once the review process has been completed.
    </p>

  </div>
  


      </div>

        </motion.div>

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-3xl p-10 space-y-10"
        >

          {/* PERSONAL INFORMATION */}
          <div>

            <h2 className="text-lg font-bold mb-5">
              👤 Personal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <input
                name="name"
                placeholder="Full Name"
                className="input"
              />

              <input
                name="phone"
                placeholder="07XXXXXXXX"
                className="input"
                type="text"
                inputMode="numeric"
                value={phone}
                onChange={(e) => {
                  let value = e.target.value.replace(/[^0-9]/g, "");

                  if (value.length > 10) {
                    value = value.slice(0, 10);
                  }

                  setPhone(value);
                }}
                onPaste={(e) => {
                  e.preventDefault();

                  const pasted = e.clipboardData.getData("text");

                  const cleaned = pasted
                    .replace(/[^0-9]/g, "")
                    .slice(0, 10);

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

          {/* LOAN DETAILS */}
          <div>

            <h2 className="text-lg font-bold mb-5">
              💰 Loan Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {/* PURPOSE */}
              <select
                className="input"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              >
                <option value="personal">
                  Personal Loan
                </option>

                <option value="business">
                  Business Loan
                </option>

                <option value="education">
                  Education Fee
                </option>
              </select>

              {/* AMOUNT */}
              <input
                name="amount"
                placeholder="Loan Amount (KES)"
                className="input"
                type="number"
                onChange={(e) =>
                  setLoanAmount(Number(e.target.value))
                }
              />

              {/* REPAYMENT PERIOD */}
              <input
                type="number"
                name="repaymentPeriod"
                placeholder="Repayment Period (Months)"
                className="input md:col-span-2"
                value={repaymentPeriod}
                onChange={(e) =>
                  setRepaymentPeriod(Number(e.target.value))
                }
              />

            </div>

            {/* EMPLOYMENT */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">

              <select
                name="employment"
                className="input"
              >
                <option value="">
                  Employment Status
                </option>

                <option>
                  Employed
                </option>

                <option>
                  Self Employed
                </option>

                <option>
                  Business Owner
                </option>

                <option>
                  Freelancer
                </option>
                
              </select>

            </div>

          </div>

          {/* FINANCIAL INFO */}
          <div>

            <h2 className="text-lg font-bold mb-5">
              📊 Financial Info
            </h2>

            <input
              name="income"
              placeholder="Monthly Income (KES)"
              className="input w-full"
            />

          </div>

          {/* LOAN SUMMARY CARD */}
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm">

            <div className="flex items-center justify-between mb-6">

              <h3 className="text-lg font-bold text-slate-800">
                📋 Loan Summary
              </h3>

              <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                12% Interest
              </span>

            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm">

              <div className="bg-white rounded-2xl border p-4">

                <p className="text-slate-500 mb-1">
                  Loan Purpose
                </p>

                <p className="font-bold text-slate-800 capitalize">
                  {purpose === "education"
                    ? "Education Fee"
                    : purpose === "business"
                    ? "Business Loan"
                    : "Personal Loan"}
                </p>

              </div>

              <div className="bg-white rounded-2xl border p-4">

                <p className="text-slate-500 mb-1">
                  Loan Amount
                </p>

                <p className="font-bold text-slate-800">
                  Ksh {loanAmount.toLocaleString()}
                </p>

              </div>

              <div className="bg-white rounded-2xl border p-4">

                <p className="text-slate-500 mb-1">
                  Repayment Period
                </p>

                <p className="font-bold text-slate-800">
                  {repaymentPeriod} months
                </p>

              </div>

              <div className="bg-white rounded-2xl border p-4">

                <p className="text-slate-500 mb-1">
                  Interest Amount
                </p>

                <p className="font-bold text-slate-800">
                  Ksh {calculated.interest.toFixed(2)}
                </p>

              </div>

              <div className="bg-white rounded-2xl border p-4">

                <p className="text-slate-500 mb-1">
                  Monthly Payment
                </p>

                <p className="font-bold text-slate-800">
                  Ksh {calculated.monthly.toFixed(2)}
                </p>

              </div>

              <div className="bg-blue-600 rounded-2xl p-4 text-white">

                <p className="text-blue-100 mb-1">
                  Total Repayment
                </p>

                <p className="text-2xl font-black">
                  Ksh {calculated.total.toFixed(2)}
                </p>

              </div>

            </div>

          </div>

          {/* TRUST CARD */}
<div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">

  <div className="flex items-start gap-3">

    <div className="text-2xl">🛡️</div>

    <div>

      <h4 className="font-bold text-blue-800">
        Secure & Confidential
      </h4>

      <p className="text-sm text-blue-700 mt-1">
        Your information is encrypted and handled confidentially throughout the application process.
      </p>

    </div>

  </div>


</div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg shadow-lg hover:scale-[1.01] transition"
          >
            Submit for Review
          </button>

        </motion.form>

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">

          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

            <h2 className="text-2xl font-bold mb-3">
              Application Review Fee 
            </h2>

            <p className="mb-3 text-slate-600">
  A processing fee of Ksh 120 is required before your application can be submitted for review.
</p>

<p className="mb-4 text-xs text-slate-500">
  The Ksh 120 processing fee covers application review and verification.
 Approval is subject to review.
</p>

            {/* PAYMENT SECTION */}
            <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">

              <div className="flex justify-between mb-3">

                <span className="text-slate-500">
                  Processing Fee
                </span>

                <span className="font-bold">
                  Ksh 120
                </span>

              </div>

              <div className="flex justify-between mb-3">

                <span className="text-slate-500">
                  Till Number
                </span>

                <span className="font-bold text-blue-600">
                  4987508
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-500">
                  Business
                </span>

                <span className="font-semibold">
                  Waylinks Ventures
                </span>

              </div>

            </div>

            {/* MPESA MESSAGE */}
            <textarea
              value={transactionMessage}
              onChange={(e) =>
                setTransactionMessage(e.target.value)
              }
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

      {/* STYLES */}
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