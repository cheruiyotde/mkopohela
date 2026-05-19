"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  const router = useRouter();

  // FETCH LOANS
  const fetchLoans = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("loans")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setLoans(data);
    }

    setLoading(false);
  };

  // CHECK ADMIN ACCESS
  useEffect(() => {
    const checkAdmin = async () => {
      setChecking(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const adminEmails = ["youradmin@gmail.com"]; // change this

      if (!adminEmails.includes(user.email || "")) {
        router.push("/dashboard");
        return;
      }

      await fetchLoans();

      setChecking(false);
    };

    checkAdmin();
  }, []);

  // UPDATE STATUS
  const updateStatus = async (id: number, status: string) => {
    const { error } = await supabase
      .from("loans")
      .update({ status })
      .eq("id", id);

    if (!error) {
      fetchLoans();
    }
  };

  // ✅ CHECKING SCREEN (FIXED)
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Checking admin access...</p>
      </div>
    );
  }

  // LOADING SCREEN
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading admin dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-5xl font-black text-blue-600">
            Admin Dashboard
          </h1>

          <p className="text-slate-600 mt-2">
            Manage all loan applications
          </p>
        </motion.div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <p className="text-slate-500">Total Applications</p>
            <h2 className="text-3xl font-black mt-2">
              {loans.length}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <p className="text-slate-500">Approved Loans</p>
            <h2 className="text-3xl font-black mt-2 text-green-600">
              {loans.filter(l => l.status === "APPROVED").length}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <p className="text-slate-500">Pending Review</p>
            <h2 className="text-3xl font-black mt-2 text-yellow-600">
              {loans.filter(l => l.status === "PAID").length}
            </h2>
          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-100">
              <tr>
                <th className="text-left p-5">Name</th>
                <th className="text-left p-5">Phone</th>
                <th className="text-left p-5">Amount</th>
                <th className="text-left p-5">Employment</th>
                <th className="text-left p-5">Status</th>
                <th className="text-left p-5">Actions</th>
              </tr>
            </thead>

            <tbody>

              {loans.map((loan) => (
                <tr key={loan.id} className="border-t border-slate-100">

                  <td className="p-5 font-semibold">{loan.name}</td>
                  <td className="p-5">{loan.phone}</td>
                  <td className="p-5">KES {loan.amount}</td>
                  <td className="p-5">{loan.employment}</td>

                  <td className="p-5">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold
                      ${
                        loan.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : loan.status === "REJECTED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>

                  <td className="p-5">
                    <div className="flex gap-2">

                      <button
                        onClick={() => updateStatus(loan.id, "APPROVED")}
                        className="px-4 py-2 rounded-xl bg-green-600 text-white text-sm"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => updateStatus(loan.id, "REJECTED")}
                        className="px-4 py-2 rounded-xl bg-red-600 text-white text-sm"
                      >
                        Reject
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}