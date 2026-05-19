"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.replace("/login");
          return;
        }

        const { data: loan, error } = await supabase
          .from("loans")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          console.log("Loan fetch error:", error);
        }

        if (mounted) {
          setData(loan);
        }
      } catch (err) {
        console.log("Dashboard error:", err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []); // ✅ FIX ONLY (NO router dependency)

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-slate-600 font-medium"
        >
          Loading your dashboard...
        </motion.div>
      </div>
    );
  }

  // ---------------- EMPTY STATE ----------------
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl text-center bg-white/70 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-2xl p-10"
        >

          <div className="text-5xl mb-4">🏦</div>

          <h2 className="text-3xl font-black text-slate-900">
            Welcome to Mkopo Dashboard
          </h2>

          <p className="text-slate-600 mt-3 leading-relaxed">
            You don’t have any loan application yet.
            Start your application to get instant approval review,
            tracking, and payment status updates in real time.
          </p>

          <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5 text-left">
            <h3 className="font-bold text-slate-900 mb-2">
              What you’ll get:
            </h3>

            <ul className="text-slate-600 text-sm space-y-2">
              <li>• Instant loan application tracking</li>
              <li>• Payment verification status</li>
              <li>• Approval progress updates</li>
              <li>• Secure personal dashboard</li>
            </ul>
          </div>

          <button
            onClick={() => router.push("/apply")}
            className="mt-8 w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-2xl shadow-lg hover:scale-[1.02] transition"
          >
            Start Loan Application
          </button>

          <button
            onClick={handleLogout}
            className="mt-4 text-sm text-slate-500 hover:text-slate-700"
          >
            Logout
          </button>

          <p className="text-xs text-slate-400 mt-6">
            Secure digital lending powered by MkopoHela
          </p>

        </motion.div>

      </div>
    );
  }

  // ---------------- DASHBOARD UI ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-10">

      <div className="mx-auto max-w-5xl space-y-10">

        {/* HEADER */}
        <motion.div className="flex items-start justify-between">
          <div>
            <h1 className="text-5xl font-black text-blue-600">
              My Dashboard
            </h1>

            <p className="mt-2 text-slate-600">
              Welcome back{" "}
              <span className="font-semibold text-slate-900">
                {data.name}
              </span>
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-xl border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
          >
            Logout
          </button>
        </motion.div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="rounded-3xl bg-white/70 backdrop-blur-xl p-6 shadow-lg">
            <p className="text-sm text-slate-500">Loan Amount</p>
            <h2 className="text-3xl font-bold">KES {data.amount}</h2>
          </div>

          <div className="rounded-3xl bg-white/70 backdrop-blur-xl p-6 shadow-lg">
            <p className="text-sm text-slate-500">Status</p>
            <div className={`mt-3 inline-flex px-4 py-2 rounded-full text-sm font-bold
              ${data.status === "PAID"
                ? "bg-green-100 text-green-700"
                : data.status === "APPROVED"
                ? "bg-blue-100 text-blue-700"
                : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {data.status}
            </div>
          </div>

          <div className="rounded-3xl bg-white/70 backdrop-blur-xl p-6 shadow-lg">
            <p className="text-sm text-slate-500">Transaction</p>
            <h2 className="text-blue-600 font-bold">
              {data.transaction_code}
            </h2>
          </div>

        </div>

        {/* DETAILS */}
        <div className="rounded-3xl bg-white/70 backdrop-blur-xl p-8 shadow-xl">

          <h3 className="text-2xl font-bold mb-6 text-slate-900">
            Application Details
          </h3>

          <div className="grid md:grid-cols-2 gap-6 text-slate-700">

            <div>
              <p className="text-sm text-slate-500">Full Name</p>
              <p className="font-semibold">{data.name}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Phone</p>
              <p className="font-semibold">{data.phone}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="font-semibold">{data.email}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Employment</p>
              <p className="font-semibold">{data.employment}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Income</p>
              <p className="font-semibold">KES {data.income}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Loan Status</p>
              <p className="font-semibold text-blue-600">
                Under Review
              </p>
            </div>

          </div>
        </div>

        {/* FOOTER BANNER */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6 shadow-xl">

          <h4 className="text-lg font-bold">
            Application Submitted Successfully 🎉
          </h4>

          <p className="text-sm opacity-90 mt-1">
            Your loan is currently being reviewed. You will be notified once approved.
          </p>

        </div>

      </div>
    </div>
  );
}